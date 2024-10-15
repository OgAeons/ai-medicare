import json
from flask import Flask, render_template, request, session, flash, redirect, url_for,jsonify
from Models import DecisionTreeModel, RandomForestModel, NaiveBayesModel
from Models import l1
from my_location import your_location
from medicine import get_medicine_details
from flask_pymongo import PyMongo
from flask_login import LoginManager, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from Distance import find_nearest_doctor, haversine
from Lang_long import get_lat_long

# App and DB configuration
app = Flask(__name__)
app.secret_key = '#123456789'
app.config["MONGO_URI"] = "mongodb://localhost:27017/AiM"
mongo = PyMongo(app)

# ========================
# User Authentication
# ========================

# Define User class for login handling
class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

# Configure login manager
login_manager = LoginManager(app)
login_manager.login_view = 'login'

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

# Doctor registration
@app.route('/register_as_doctor', methods=['GET', 'POST'])
def register_doctor():
    if request.method == 'POST':
        name = request.form.get('name')
        department = request.form.get('department')
        speciality = request.form.get('speciality')
        gender = request.form.get('gender')
        contact_info = request.form.get('contact_info')
        address = request.form.get('address')
        email = request.form.get('email')
        password = request.form.get('password')

        latitude, longitude = get_lat_long(address)
        if latitude is None or longitude is None:
            flash("Address could not be geocoded.", "danger")
            return render_template("Doctor Register.html")

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
            'password': generate_password_hash(password)
        }

        try:
            mongo.db.Doctor.insert_one(doctor)
            flash("Doctor registered successfully!", "success")
        except Exception as e:
            flash("Error registering doctor", "danger")

    return render_template("Doctor Register.html")

# ========================
# Disease Prediction
# ========================

# Disease prediction page
@app.route('/Disease_Prediction')
def disease_prediction():
    symptoms = l1
    return render_template('disease.html', symptoms=symptoms)

# Predict the disease using ML models
@app.route('/predict', methods=['POST'])
def predict():
    symptoms = [
        request.form['Symptom1'],
        request.form['Symptom2'],
        request.form['Symptom3'],
        request.form['Symptom4'],
        request.form['Symptom5']
    ]

    dt_prediction = DecisionTreeModel(symptoms)
    rf_prediction = RandomForestModel(symptoms)
    nb_prediction = NaiveBayesModel(symptoms)

    return render_template('disease_predicted.html', symptoms=symptoms, dt_prediction=dt_prediction, rf_prediction=rf_prediction, nb_prediction=nb_prediction)

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

# ========================
# Doctor Locator
# ========================

# Find the nearest doctors based on user's location
@app.route('/doctor')
def doctor():
    user_latitude, user_longitude = your_location()

    doctors_cursor = mongo.db.Doctor.find()
    all_doctors_list = [
        {
            'name': doctor['name'],
            'latitude': doctor.get('latitude'),
            'longitude': doctor.get('longitude'),
            'department': doctor.get('department')
        }
        for doctor in doctors_cursor
        if doctor.get('latitude') is not None and doctor.get('longitude') is not None
    ]

    if not all_doctors_list:
        all_doctors_list = []

    return render_template('nearest_doctor.html', latitude=user_latitude, longitude=user_longitude, doctors=all_doctors_list)

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

