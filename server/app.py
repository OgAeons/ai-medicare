from flask import Flask, render_template, request, session, flash, redirect, url_for, jsonify, send_from_directory
from pymongo import MongoClient
from flask_cors import CORS
from medicine import get_medicine_details
from Lang_long import get_lat_long
from flask_login import LoginManager, UserMixin
from flask_pymongo import PyMongo
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import numpy as np
import pandas as pd
import os
import re



# App and DB configuration
app = Flask(__name__)
app.secret_key = '#123456789'
app.config["MONGO_URI"] = "mongodb://localhost:27017/AiM"
mongo = PyMongo(app)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'  # Folder to save uploaded photos
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)  # Create the folder if it doesn't exist

# ========================
# Medicine Data
# ========================

app = Flask(__name__)
app.secret_key = '#123456789'
app.config["MONGO_URI"] = "mongodb://localhost:27017/AiM"
app.config['UPLOAD_FOLDER'] = 'uploads'
CORS(app)
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize MongoDB and collections
client = MongoClient('mongodb://localhost:27017/')
db = client['AiM']
symptoms_collection = db['symptoms']
mongo = PyMongo(app)

# Initialize LoginManager
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Global variable to store all symptoms
all_symptoms = []

# Load all symptoms from the database
def load_all_symptoms():
    global all_symptoms
    first_doc = symptoms_collection.find_one()
    if first_doc:
        all_symptoms = [key for key in first_doc.keys() if key not in ['_id', 'prognosis']]

load_all_symptoms()

# Load and train the machine learning model
def load_model():
    df = pd.DataFrame(list(symptoms_collection.find()))
    if 'prognosis' in df.columns:
        X = df.drop(columns=['_id', 'prognosis'])
        y = df['prognosis']
    else:
        raise ValueError("The 'prognosis' column is not found in the dataset.")

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier()
    model.fit(X_train, y_train)
    accuracy = accuracy_score(y_test, model.predict(X_test))
    print(f'Model accuracy: {accuracy:.2f}')
    return model

model = load_model()

# ========================
# User Authentication
# ========================

class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

# ========================
# Routes
# ========================

# Home page
@app.route('/')
def index():
    return render_template('index.html')

# ========================
# Authentication Routes
# ========================

# Register user (Patient or Doctor)
@app.route('/register')
def register():
    return render_template('register.html')

# Login route for both patients and doctors
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user_type = request.form.get('user_type')

        # Patient login
        if user_type == 'patient':
            user = mongo.db.Patient.find_one({'email': email})
        # Doctor login
        elif user_type == 'doctor':
            user = mongo.db.Doctor.find_one({'email': email})
        else:
            flash("Invalid user type", "danger")
            return redirect(url_for('login'))

        # Check password
        if user and check_password_hash(user['password'], password):
            if user_type == 'patient':
                session['user_id'] = str(user['_id'])
                flash("Logged in successfully!", "success")
                return redirect(url_for('patient_dashboard'))
            elif user_type == 'doctor':
                session['doctor_id'] = str(user['_id'])
                flash("Logged in successfully!", "success")
                return redirect(url_for('doctor_dashboard'))
        else:
            flash("Invalid email or password", "danger")

    return render_template('login.html')

# ========================
# Patient Routes
# ========================

# Patient dashboard route
@app.route('/patient_dashboard')
def patient_dashboard():
    if 'user_id' in session:
        patient_id = ObjectId(session['user_id'])
        patient = mongo.db.Patient.find_one({'_id': patient_id})

        if patient:
            # First-time visitor logic
            if patient.get('Info_Filled') == 'no':
                user_name = patient.get('name')
                # Extract the first word of the user's name
                first_name = user_name.split()[0]
                return render_template('Patient_Landing.html', patient=patient, user_name=first_name)
            # Return visitor
            else:
                user_name = patient.get('name')
                return render_template('Patient_Dashboard.html', patient=patient, user_name=user_name)

    flash("You need to login first!", "warning")
    return redirect(url_for('login'))

# Additional patient info
@app.route('/Patient_Additional_Info', methods=['GET', 'POST'])
def patient_additional_info():
    if request.method == 'POST':
        # Get the logged-in patient's ID from the session
        patient_id = ObjectId(session['user_id'])

        # Find the patient in the database
        patient = mongo.db.Patient.find_one({'_id': patient_id})

        if patient:
            # Update patient information from the form submission
            updated_data = {
                'Info_Filled': 'yes',
                'blood_group': request.form.get('blood_group'),
                'height': request.form.get('height'),
                'weight': request.form.get('weight'),
                'allergies': request.form.get('allergies'),
                'medical_history': request.form.get('medical_history')
            }

            # Update the patient record in the database
            mongo.db.Patient.update_one({'_id': patient_id}, {'$set': updated_data})

            # Flash success message and redirect to the patient dashboard
            flash("Additional information added successfully!", "success")
            return redirect(url_for('patient_dashboard'))

    return render_template('Patient_Additional_Info.html')


# Patient registration
@app.route('/register_as_patient', methods=['GET', 'POST'])
def register_patient():
    if request.method == 'POST':
        name = request.form.get('name')
        gender = request.form.get('gender')
        age = request.form.get('age')
        contact_info = request.form.get('contact_info')
        address = request.form.get('address')
        email = request.form.get('email')
        password = request.form.get('password')

        patient = {
            'name': name,
            'gender': gender,
            'age': age,
            'contact_info': contact_info,
            'address': address,
            'email': email,
            'password': generate_password_hash(password),
            'Info_Filled': 'no'
        }

        try:
            mongo.db.Patient.insert_one(patient)
            flash("Patient registered successfully!", "success")
        except Exception as e:
            flash("Error registering patient", "danger")

    return render_template("Patient Register.html")

# ========================
# Doctor Routes
# ========================

def sanitize_filename(name):
    # Replace spaces and special characters with underscores
    return re.sub(r'[^a-zA-Z0-9_-]', '_', name)

# Doctor dashboard
@app.route('/doctor_dashboard')
def doctor_dashboard():
    if 'doctor_id' in session:
        doctor_id = ObjectId(session['doctor_id'])
        doctor = mongo.db.Doctor.find_one({'_id': doctor_id})
        if doctor:
            user_name = doctor.get('name')
            return render_template('Doctor_Dashboard.html', doctor=doctor, user_name=user_name)

    flash("You need to login first!", "warning")
    return redirect(url_for('login'))

@app.route('/register_as_doctor', methods=['POST'])
def register_doctor():
    # Get form data
    name = request.form.get('name')
    department = request.form.get('department')  # Correctly get the department
    speciality = request.form.get('speciality')  # Get the speciality correctly

    # Sanitize the filename
    sanitized_name = sanitize_filename(name)
    sanitized_department = sanitize_filename(department)

    # Create a unique filename using name and department
    filename = f"{sanitized_name}_{sanitized_department}.jpg"  # Assuming jpg format

    # Handle file upload
    photo = request.files.get('photo')
    if photo:
        photo_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        photo.save(photo_path)  # Save the file to the specified path

    # Extract other form data
    gender = request.form.get('gender')
    contact_info = request.form.get('contact')
    address = request.form.get('address')
    email = request.form.get('email')
    password = request.form.get('password')

    latitude, longitude = get_lat_long(address)
    if latitude is None or longitude is None:
        return jsonify({'success': False, 'message': "Address could not be geocoded."})

    doctor = {
        'name': name,
        'department': department,
        'speciality': speciality,
        'gender': gender,
        'contact_info': contact_info,
        'address': address,
        'latitude': latitude,
        'longitude': longitude,
        'email': email,
        'password': generate_password_hash(password)  # Ensure to import this
    }

    try:
        mongo.db.Doctor.insert_one(doctor)
        return jsonify({'success': True, 'message': "Doctor registered successfully!"})
    except Exception as e:
        return jsonify({'success': False, 'message': "Error registering doctor."})

# For File to Upload in the react
from flask import send_from_directory

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Ensure you have the required imports and configurations for MongoDB, Flask, and any other necessary libraries.

# ========================
# Doctor Information
@app.route('/doctors', methods=['GET'])
def get_doctors():
    try:
        doctors = mongo.db.Doctor.find()  # Fetch all doctor documents from MongoDB
        doctors_list = []
        for doctor in doctors:
            doctor['_id'] = str(doctor['_id'])  # Convert ObjectId to string
            doctors_list.append(doctor)

        return jsonify(doctors_list), 200  # Return the list of doctors as JSON
    except Exception as e:
        return jsonify({'success': False, 'message': "Error fetching doctors."}), 500


# ========================
# Disease Prediction
# ========================

# Disease prediction page
@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    return jsonify(all_symptoms)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'symptoms' not in data:
        return jsonify({'error': 'No symptoms provided.'}), 400

    features = np.zeros(len(all_symptoms))
    for symptom in data['symptoms']:
        if symptom in all_symptoms:
            features[all_symptoms.index(symptom)] = 1

    if len(features) != model.n_features_in_:
        return jsonify({'error': 'Feature vector length mismatch.'}), 400

    prediction = model.predict([features])
    return jsonify({'disease': prediction[0]})

# ========================
# Medicine Information
# ========================

# Search for medicine by partial name
@app.route('/medicine_info', methods=['GET', 'POST'])
def medicine_info():
    if request.method == 'POST':
        partial_name = request.form.get('partial_name', '')
        matches = get_medicine_details(partial_name)
        return render_template('medicine_info.html', matches=matches)

    return render_template('medicine_info.html')

# Get detailed info of selected medicine
@app.route('/medicine_detail', methods=['POST'])
def medicine_detail():
    selected_medicine = request.form.get('selected_medicine', '')
    details = get_medicine_details(selected_medicine)
    return render_template('medicine_detail.html', details=details)
# Doctor Locator is done using React itself only
# ========================
# Miscellaneous
# ========================

# Logout route
@app.route('/logout')
def logout():
    session.pop('doctor_id', None)
    session.pop('user_id', None)
    flash("Logged out successfully!", "info")
    return redirect(url_for('login'))

# ========================
# Main App
# ========================

if __name__ == '__main__':
    app.run(debug=True)

