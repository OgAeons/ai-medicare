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


# =====================================
# User Registration Endpoint
# =====================================
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not name or not email or not password or not role:
        return jsonify({"error": "All fields are required"}), 400

    if role not in ["patient", "doctor"]:
        return jsonify({"error": "Invalid role specified"}), 400

    # Check if the user already exists in either collection
    try:
        existing_patient = patients_collection.find_one({"email": email})
        existing_doctor = doctors_collection.find_one({"email": email})

        if role == "patient":
            if existing_patient:
                return jsonify({"error": "Patient already exists"}), 400
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
            patients_collection.insert_one({"name": name, "email": email, "password": hashed_password})
            print(f"Registered {name} as a patient")

        elif role == "doctor":
            if existing_doctor:
                return jsonify({"error": "Doctor already exists"}), 400
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
            doctors_collection.insert_one({"name": name, "email": email, "password": hashed_password})
            print(f"Registered {name} as a doctor")

        return jsonify({"message": "User registered successfully"}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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
        return jsonify(success=True, message=f"Welcome, {user['name']}!")  
    else:
        return jsonify(success=False, message="Invalid credentials"), 401


# =====================================
# disease prediction based on symptoms               
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
        return jsonify({'error': 'Feature vector length does not match the model input shape.'}), 400

    # Perform prediction using the model
    prediction = model.predict([features])
    print(f"Prediction output: {prediction[0]}")  # Log the prediction
    return jsonify({'disease': prediction[0]})


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


@app.route('/<path:path>', methods=['OPTIONS', 'POST', 'GET'])
def catch_all(path):
    return jsonify({"error": "Path not found", "path": path}), 404


if __name__ == '__main__':
    app.run(debug=True)