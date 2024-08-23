import json
from flask import Flask, render_template, request,session,flash,redirect,url_for
from Models import DecisionTreeModel, RandomForestModel, NaiveBayesModel
from Models import l1
from my_location import your_location
from medicine import get_medicine_details
from flask_pymongo import PyMongo
from flask_login import LoginManager, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from Distance import find_nearest_doctor,haversine
from Lang_long import get_lat_long

app = Flask(__name__)

app.secret_key = '#123456789'  # Set the secret key

app.config["MONGO_URI"] = "mongodb://localhost:27017/AiM"
mongo = PyMongo(app)

# Define user class
class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

# Configure login manager
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Define user_loader callback function
@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

@app.route('/') # This is the landing page for the users i.e the Index Page
def index():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user_type = request.form.get('user_type')

        if user_type == 'patient':
            user = mongo.db.Patient.find_one({'email': email})
        elif user_type == 'doctor':
            user = mongo.db.Doctor.find_one({'email': email})
        else:
            flash("Invalid user type", "danger")
            return redirect(url_for('login'))

        if user and check_password_hash(user['password'], password):
            if user_type == 'patient':
                session['user_id'] = str(user['_id'])  # Set session variable for patient
                flash("Logged in successfully!", "success")
                return redirect(url_for('patient_dashboard'))
            elif user_type == 'doctor':
                session['doctor_id'] = str(user['_id'])  # Set session variable for doctor
                flash("Logged in successfully!", "success")
                return redirect(url_for('doctor_dashboard'))
        else:
            flash("Invalid email or password", "danger")

    return render_template('login.html')

@app.route('/patient_dashboard')
def patient_dashboard():
    if 'user_id' in session:
        patient_id = ObjectId(session['user_id'])
        patient = mongo.db.Patient.find_one({'_id': patient_id})
        if patient:
            user_name = patient.get('name')  # To reflect the name of the patient in the dashboard
            return render_template('Patient_Dashboard.html', patient=patient, user_name=user_name)
    flash("You need to login first!", "warning")
    return redirect(url_for('login'))

@app.route('/doctor_dashboard')
def doctor_dashboard():
    if 'doctor_id' in session:
        doctor_id = ObjectId(session['doctor_id'])
        doctor = mongo.db.Doctor.find_one({'_id': doctor_id})
        if doctor:
            user_name = doctor.get('name')  # To reflect the name of the patient in the dashboard
            return render_template('Doctor_Dashboard.html', doctor=doctor,user_name=user_name)
    flash("You need to login first!", "warning")
    return redirect(url_for('login'))

@app.route('/register_as_doctor', methods=['GET', 'POST'])
def register_Doctor():
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
            'password': generate_password_hash(password)  # Hash the password before storing
        }
        try:
            result = mongo.db.Doctor.insert_one(doctor)
            print("Insertion result:", result)
            flash("Doctor registered successfully!", "success")
        except Exception as e:
            print("Error inserting doctor:", e)
            flash("Error registering doctor", "danger")

    return render_template("Doctor Register.html")

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
            'password': generate_password_hash(password)  # Hash the password before storing
        }

        try:
            result = mongo.db.Patient.insert_one(patient)
            print("Insertion result:", result)
            flash("Patient registered successfully!", "success")
        except Exception as e:
            print("Error inserting patient:", e)
            flash("Error registering patient", "danger")

    return render_template("Patient Register.html")




@app.route('/logout')
def logout():
    session.pop('doctor_id', None)
    session.pop('user_id', None)
    flash("Logged out successfully!", "info")
    return redirect(url_for('login'))

@app.route('/Disease_Prediction')
def disease_prediction():
    symptoms = l1
    return render_template('disease.html', symptoms=symptoms)

@app.route('/predict', methods=['POST'])
def predict():
    symptoms = [request.form['Symptom1'], request.form['Symptom2'], request.form['Symptom3'], request.form['Symptom4'], request.form['Symptom5']]

    # Machine learning model functions here
    dt_prediction = DecisionTreeModel(symptoms)
    rf_prediction = RandomForestModel(symptoms)
    nb_prediction = NaiveBayesModel(symptoms)

    return render_template('disease_predicted.html', symptoms=l1, dt_prediction=dt_prediction, rf_prediction=rf_prediction, nb_prediction=nb_prediction)



@app.route('/doctor')
def doctor():
    user_latitude, user_longitude = your_location()

    # Retrieve all doctors from the MongoDB database
    doctors_cursor = mongo.db.Doctor.find()

    # Prepare doctors' data for Leaflet
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

    # Ensure that doctors is defined even if there are no doctors
    if not all_doctors_list:
        all_doctors_list = []

    return render_template('nearest_doctor.html', latitude=user_latitude, longitude=user_longitude, doctors=all_doctors_list)



@app.route('/medicine_info', methods=['GET', 'POST'])
def medicine_info():
    if request.method == 'POST':
        partial_name = request.form.get('partial_name', '')
        # print("Partial Name:", partial_name)
        matches = get_medicine_details(partial_name)
        # print("Matches:", matches)
        return render_template('medicine_info.html', matches=matches)

    return render_template('medicine_info.html')

@app.route('/medicine_detail', methods=['POST'])
def medicine_detail():
    selected_medicine = request.form.get('selected_medicine', '')
    # print("Selected Medicine:", selected_medicine)
    details = get_medicine_details(selected_medicine)
    # print("Details:", details)
    return render_template('medicine_detail.html', details=details)


if __name__ == '__main__':
    app.run(debug=True)
