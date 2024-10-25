from flask import Flask, jsonify, request
from pymongo import MongoClient
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB configuration
client = MongoClient('mongodb://localhost:27017/')
db = client['AiM']  # Replace with your database name
symptoms_collection = db['symptoms']  # Replace with your collection name

# Global variable to store symptoms
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

    # Use 'prognosis' instead of 'disease'
    if 'prognosis' in df.columns:
        X = df.drop(columns=['_id', 'prognosis'])  # Adjust according to your dataset
        y = df['prognosis']
    else:
        raise ValueError("The 'prognosis' column is not found in the dataset.")

    # Split the dataset into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize the model
    model = RandomForestClassifier()

    # Fit the model
    model.fit(X_train, y_train)

    # Evaluate the model
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    print(f'Model accuracy: {accuracy:.2f}')

    return model  # Return the fitted model

model = load_model()  # Load your trained model

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


if __name__ == '__main__':
    app.run(debug=True)
