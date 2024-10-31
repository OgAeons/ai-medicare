from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np
import pandas as pd
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['AiM'] 
symptoms_collection = db['symptoms']
diseases_collection = db['diseases']
patients_collection = db['patients']
doctors_collection = db['doctors']

# Global dictionary to store user data during registration
user_data = {}

# =====================================
# User Registration Endpoint
# =====================================
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print(f"Received data: {data}")  # Log incoming data

    user_id = data.get('user_id')  # Unique identifier for the registration session
    question = data.get('question')  # Current question to ask
    answer = data.get('answer')  # User's answer to the current question
    role = data.get('role')  # Role can be either 'patient' or 'doctor'

    global user_data  # Use the global variable

    if user_id not in user_data:
        user_data[user_id] = {"role": role, "answers": {}}

    # Store the answer for the current question
    if question:
        user_data[user_id]['answers'][question] = answer

    questions = {
        "patient": ["name", "email", "password", "additional_info"],
        "doctor": [
            "name", "email", "password", "specialization", "yearsOfExperience",
            "clinicAddress", "contactNumber", "licenseNumber", "consultationFees",
            "availableTimings", "qualification", "languagesSpoken", "bio"
        ]
    }

    print(f"User ID: {user_id}, Role: {role}, Answers: {user_data[user_id]['answers']}")  # Log user data

    if all(q in user_data[user_id]['answers'] for q in questions[role]):
        print("All questions answered, finalizing registration...")
        return finalize_registration(user_data[user_id], role, user_id)
    else:
        print("Not all questions answered:", user_data[user_id]['answers'])


    next_question = next((q for q in questions[role] if q not in user_data[user_id]['answers']), None)
    return jsonify({"next_question": next_question}), 200

def finalize_registration(user_data, role, user_id):
    # Retrieve all answers
    answers = user_data['answers']
    name = answers.get('name')
    email = answers.get('email')
    password = answers.get('password')

    # Default to empty additional_info dictionary
    additional_info = {k: answers[k] for k in answers if k not in ['name', 'email', 'password']}

    # Validation
    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    try:
        existing_patient = patients_collection.find_one({"email": email})
        existing_doctor = doctors_collection.find_one({"email": email})

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        if role == "patient":
            if existing_patient:
                return jsonify({"error": "A user with this email already exists as a patient."}), 409
            if existing_doctor:
                return jsonify({"error": "A user with this email already exists as a doctor."}), 409
            
            # Log the data before insertion
            print(f"Inserting patient data: Name: {name}, Email: {email}, Additional Info: {additional_info}")

            # Attempt to insert patient data
            result = patients_collection.insert_one({
                "name": name,
                "email": email,
                "password": hashed_password,
                **additional_info
            })

            print(f"Inserted patient with ID: {result.inserted_id}")  # Log the inserted ID

        elif role == "doctor":
            if existing_doctor:
                return jsonify({"error": "A user with this email already exists as a doctor."}), 409
            if existing_patient:
                return jsonify({"error": "A user with this email already exists as a patient."}), 409
            
            # Log the data before insertion
            print(f"Inserting doctor data: Name: {name}, Email: {email}, Additional Info: {additional_info}")

            result = doctors_collection.insert_one({
                "name": name,
                "email": email,
                "password": hashed_password,
                **additional_info
            })

            print(f"Inserted doctor with ID: {result.inserted_id}")  # Log the inserted ID

        del user_data[user_id]  # Clean up user data after registration
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        print(f"Error during registration: {str(e)}")  # Log the error
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
    
    user = None
    if role == "patient":
        user = patients_collection.find_one({"email": email})
    elif role == "doctor":
        user = doctors_collection.find_one({"email": email})

    if user and check_password_hash(user['password'], password): 
        return jsonify({
            "success": True,
            "message": f"Welcome, {user['name']}!",
            "user": {
                "name": user['name'],
                "email": user['email'],
                "role": role  # Return role if needed
            }
        }), 200 
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401


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


if __name__ == '__main__':
    app.run(debug=True)
