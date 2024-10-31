import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function PatientRegistrationForm({ registrationData }) {
    const navigate = useNavigate(); // Create navigate instance
    const initialPatientDetails = {
        age: '',
        gender: '',
        contact: '',
        address: '',
        allergies: '',
        medications: '',
        chronicConditions: '',
        surgeries: '',
        smoking: false,
        alcohol: false,
        exercise: '',
        diet: '',
        familyHistory: '',
        healthConcern: '',
        recentSymptoms: '',
        emergencyContactName: '',
        emergencyContactRelation: '',
        emergencyContactPhone: '',
    };

    const [patientDetails, setPatientDetails] = useState(initialPatientDetails);
    const [submitMessage, setSubmitMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(0);

    const fields = [
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'gender', label: 'Gender', type: 'text', required: true },
        { name: 'contact', label: 'Contact Number', type: 'tel', required: true },
        { name: 'address', label: 'Address', type: 'text', required: true },
        { name: 'allergies', label: 'Allergies', type: 'text' },
        { name: 'medications', label: 'Medications', type: 'text' },
        { name: 'chronicConditions', label: 'Chronic Conditions', type: 'text' },
        { name: 'surgeries', label: 'Surgeries', type: 'text' },
        { name: 'smoking', label: 'Smoking', type: 'checkbox' },
        { name: 'alcohol', label: 'Alcohol Consumption', type: 'checkbox' },
        { name: 'exercise', label: 'Exercise', type: 'text' },
        { name: 'diet', label: 'Diet', type: 'text' },
        { name: 'familyHistory', label: 'Family Health History', type: 'text' },
        { name: 'healthConcern', label: 'Health Concern', type: 'text' },
        { name: 'recentSymptoms', label: 'Recent Symptoms', type: 'text' },
        { name: 'emergencyContactName', label: 'Emergency Contact Name', type: 'text', required: true },
        { name: 'emergencyContactRelation', label: 'Emergency Contact Relation', type: 'text', required: true },
        { name: 'emergencyContactPhone', label: 'Emergency Contact Phone', type: 'tel', required: true },
    ];

    const handleChange = (e, field) => {
        const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
        setPatientDetails({ ...patientDetails, [field.name]: value });
    };

    const handleNext = () => {
        if (currentStep < fields.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            submitPatientDetails();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    async function submitPatientDetails() {
        const completePatientData = { ...registrationData, ...patientDetails };

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(completePatientData),
            });
            if (response.ok) {
                const responseData = await response.json(); // Get the response data
                alert("Patient successfully registered!"); // Show alert
                setSubmitMessage("Patient details submitted successfully!");
                setErrorMessage('');
                setPatientDetails(initialPatientDetails); // Clear form
                setCurrentStep(0); // Reset to the first step
                navigate("/"); // Use navigate to go to home
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to submit patient details.');
                setSubmitMessage('');
            }
        } catch (error) {
            console.error("Error submitting patient details", error);
            setErrorMessage('Error submitting patient details. Please try again.');
            setSubmitMessage('');
        }
    }

    return (
        <form>
            <h2>Complete Patient Registration</h2>
            <div>
                <label htmlFor={fields[currentStep].name}>{fields[currentStep].label}:</label>
                {fields[currentStep].type === 'checkbox' ? (
                    <label>
                        <input
                            type={fields[currentStep].type}
                            checked={patientDetails[fields[currentStep].name]}
                            onChange={(e) => handleChange(e, fields[currentStep])}
                        />
                        {fields[currentStep].label}
                    </label>
                ) : (
                    <input
                        id={fields[currentStep].name}
                        type={fields[currentStep].type}
                        value={patientDetails[fields[currentStep].name]}
                        onChange={(e) => handleChange(e, fields[currentStep])}
                        required={fields[currentStep].required}
                    />
                )}
            </div>
            <div>
                {currentStep > 0 && (
                    <button type="button" onClick={handleBack}>
                        Back
                    </button>
                )}
                <button type="button" onClick={handleNext}>
                    {currentStep < fields.length - 1 ? "Next" : "Submit"}
                </button>
            </div>
            {submitMessage && <p style={{ color: 'green' }}>{submitMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
}

export default PatientRegistrationForm;
