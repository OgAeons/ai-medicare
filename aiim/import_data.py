from flask import Flask
from app import db, Doctor

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///doctors.db'  # Make sure to configure the database URI

# Create an application context
app.app_context().push()

# Your data import code here
sample_data = [
    {'name': 'Mukesh', 'latitude': 18.643078, 'longitude': 73.766607},
    {'name': 'Ramesh', 'latitude': 18.648934, 'longitude': 73.762850},
    {'name': 'Ram', 'latitude': 18.651172, 'longitude': 73.758569},
    # Add more data as needed
]

for data in sample_data:
    doctor = Doctor(**data)
    db.session.add(doctor)

db.session.commit()
