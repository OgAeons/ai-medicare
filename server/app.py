from flask import Flask, jsonify, request, session
from pymongo import MongoClient
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_session import Session
import os
from dotenv import load_dotenv
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np
import pandas as pd
import traceback
import random

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'secret-key-AiM'  # Keep secret key for other uses

client = MongoClient('mongodb://localhost:27017/')
db = client['AiM'] 
symptoms_collection = db['symptoms']
diseases_collection = db['diseases']
patients_collection = db['patients']
doctors_collection = db['doctors']
doctors_by_speciality_collection = db['doctors-by-speciality']
appointments_collection = db["appointments"]

# Global dictionary to store user data during registration
user_data = {}

# =====================================
# User Registration Endpoint
# =====================================
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print(f"Received data: {data}") 

    user_id = data.get('user_id')   #unique user id
    role = data.get('role')   #patient or doctor

    global user_data  # Use the global variable

    if user_id not in user_data:
        user_data[user_id] = {"role": role, "answers": {}}

    # Store the answer for the current question
    for key in data:
        if key != "role" and key != "user_id":
            user_data[user_id]['answers'][key] = data[key]

    questions = {
        "patient": ["name", "email", "password", "age", "gender", "contact", "address",
                    "allergies", "medications", "chronicConditions", "surgeries", 
                    "smoking", "alcohol", "exercise", "diet", "familyHistory", 
                    "healthConcern", "recentSymptoms", "emergencyContactName", 
                    "emergencyContactRelation", "emergencyContactPhone"],
        "doctor": [
            "name", "email", "password", "specialization", "address",
            "contactNumber", "clinicAddress", "consultationFees",
        ]
    }

    # Check if all questions are answered
    if all(q in user_data[user_id]['answers'] for q in questions[role]):
        print("All questions answered, finalizing registration...")
        return finalize_registration(user_data[user_id], role, user_id)

    next_question = next((q for q in questions[role] if q not in user_data[user_id]['answers']), None)
    return jsonify({"next_question": next_question}), 200

# finalize the user registration
def finalize_registration(user_data, role, user_id):
    answers = user_data['answers']
    name = answers.get('name')
    email = answers.get('email')
    password = answers.get('password')

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    try:
        # Check if user already exists
        existing_patient = patients_collection.find_one({"email": email})
        existing_doctor = doctors_collection.find_one({"email": email})

        # Hash the password
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        if role == "patient":
            if existing_patient:
                return jsonify({"error": "A user with this email already exists as a patient."}), 409
            if existing_doctor:
                return jsonify({"error": "A user with this email already exists as a doctor."}), 409

            # Prepare patient data
            patient_data = {
                'name': name,
                'email': email,
                'password': hashed_password,
                **{key: answers[key] for key in answers if key != 'name' and key != 'email' and key != 'password'}
            }

            # Insert patient data into MongoDB
            patients_collection.insert_one(patient_data)
            print(f"Inserted patient data: {patient_data}")  # Log the inserted data
            if user_id in user_data:
                del user_data[user_id]   # Clean up user data after registration
                print("Current user_data:", user_data)
            return jsonify({'message': 'Patient registered successfully!'}), 201

        elif role == "doctor":
            if existing_doctor:
                return jsonify({"error": "A user with this email already exists as a doctor."}), 409
            if existing_patient:
                return jsonify({"error": "A user with this email already exists as a patient."}), 409

            # Prepare doctor data
            doctor_data = {
                'name': name,
                'email': email,
                'password': hashed_password,
                **{key: answers[key] for key in answers if key != 'name' and key != 'email' and key != 'password'}
            }

            # Insert doctor data into MongoDB
            doctors_collection.insert_one(doctor_data)
            print(f"Inserted doctor data: {doctor_data}")  # Log the inserted data
            if user_id in user_data:
                del user_data[user_id]   # Clean up user data after registration
                print("Current user_data:", user_data)
            return jsonify({'message': 'Doctor registered successfully!'}), 201

    except Exception as e:
        print(f"Error during registration: {str(e)}")  # Log the error message
        traceback.print_exc()  # This will print the traceback of the error
        return jsonify({"error": "Registration failed due to a server error. Please try again.", "details": str(e)}), 500


# =====================================
# User Login Endpoint
# =====================================
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not email or not password or not role:
        return jsonify({"error": "Email, password, and role are required"}), 400
    
    try: 
        user = None
        if role == "patient":
            user = patients_collection.find_one({"email": email})
        elif role == "doctor":
            user = doctors_collection.find_one({"email": email})

        if user and check_password_hash(user['password'], password): 
            return jsonify({
                "success": True,
                "message": f"Welcome, {user['name']}!",
                "user": {"name": user['name'], "email": user['email'], "role": role}
            }), 200
        else:
            return jsonify({"success": False, "message": "Invalid credentials"}), 401
        
    except Exception as e:
        print(f"Error during login: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": "Login failed due to a server error"}), 500
    

# =====================================
# user logout endpoint              
# =====================================
@app.route('/logout', methods=['POST'])
def logout():
    # Session logic removed as per request
    return jsonify({"message": "Logged out successfully"}), 200


# =====================================
# Check Session Endpoint
# =====================================
@app.route('/session', methods=['GET'])
def get_session():
    # Session logic removed as per request
    return jsonify({"logged_in": False}), 200
    


# =====================================
# Disease prediction based on symptoms               
# =====================================
all_symptoms = []

# Function to populate all_symptoms from the database
def load_all_symptoms():
    global all_symptoms
    # Get the first document to extract symptom keys
    first_doc = symptoms_collection.find_one()
    if first_doc:
        all_symptoms = [key for key in first_doc.keys() if key not in ['_id', 'prognosis']]

load_all_symptoms()  # Load symptoms at startup

# Load your model from the database
def load_model():
    df = pd.DataFrame(list(symptoms_collection.find()))  # Load your dataset here

    # Print the DataFrame to check its structure
    print(df.head())  # Print the first few rows to inspect column names

    if 'prognosis' in df.columns:
        X = df.drop(columns=['_id', 'prognosis'])
        y = df['prognosis']
    else:
        raise ValueError("The 'prognosis' column is not found in the dataset.")

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    print(f'Model accuracy: {accuracy:.2f}')

    return model 

model = load_model() 

# Route to get all symptoms
@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    # Get only the symptom keys from the first document in the symptoms collection
    first_doc = symptoms_collection.find_one()
    if first_doc:
        symptoms = [key for key in first_doc.keys() if key not in ['_id', 'prognosis']]
        return jsonify(symptoms)
    return jsonify([])

# Route for disease prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Debugging: Log the incoming request data
    print(f"Received data: {data}")

    # Validate the input
    if not data or 'symptoms' not in data:
        return jsonify({'error': 'No symptoms provided.'}), 400

    checked_symptoms = data['symptoms']

    # Ensure symptoms is a list
    if not isinstance(checked_symptoms, list):
        return jsonify({'error': 'Symptoms must be a list.'}), 400

    # Create a feature array based on symptoms
    features = np.zeros(len(all_symptoms))  # Initialize a feature vector with zeros
    for symptom in checked_symptoms:
        if symptom in all_symptoms:
            features[all_symptoms.index(symptom)] = 1  # Set the corresponding index to 1
        else:
            print(f"Unknown symptom: {symptom}")  # Log unknown symptoms

    # Ensure features length matches the model input shape
    if len(features) != model.n_features_in_:
        return jsonify({'error': 'Mismatch in number of features.'}), 400

    prediction = model.predict([features])
    return jsonify({'predicted_disease': prediction[0]})


# =====================================
# disease info (Alphabet Info)               
# =====================================
@app.route('/diseases', methods=['GET'])
def get_diseases():
    letter = request.args.get('letter', '').upper()  # Get letter parameter
    search_query = request.args.get('search', '').lower()  # Get search parameter

    # Fetch diseases by first letter or search term
    if search_query:
        diseases = diseases_collection.find({"disease": {"$regex": f"^{search_query}", "$options": "i"}})
    elif letter:
        diseases = diseases_collection.find({"disease": {"$regex": f"^{letter}", "$options": "i"}})
    else:
        diseases = diseases_collection.find()

    # Convert results to list of dictionaries
    disease_list = [
        {
            "name": disease["disease"].capitalize(),
            "info": disease["symptoms"],
            "treatment": disease["cures"],
            "doctor": disease["doctor"],
            "risk level": disease["risk level"]
        }
        for disease in diseases
    ]
    return jsonify(disease_list)


# =====================================
# Doctors by speciality
# =====================================
@app.route('/api/doctors', methods=['GET'])
def get_doctors():
    speciality = request.args.get('speciality', '')
    print(f"Specialty received: {speciality}") 

    doctors = list(doctors_by_speciality_collection.find({'speciality': speciality}, {'_id': 0}))
    # print(f"Doctors found: {doctors}") 

    for doctor in doctors:
        # Add random working hours
        doctor['working_hours'] = f"{random.randint(8, 10)}:00 AM - {random.randint(5, 7)}:00 PM"
        # Add the doctor's name, if available, or use "Unknown" if not
        doctor['name'] = doctor.get("Doctor's Name", "Unknown")

    return jsonify({'data': doctors})


# =====================================
# appointments
# =====================================
@app.route("/confirm-appointment", methods=["POST"])
def confirm_appointment():
    appointment_details = request.json
    try:
        # Save the appointment details into MongoDB
        result = appointments_collection.insert_one(appointment_details)
        return jsonify({"message": "Appointment confirmed", "appointmentId": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
