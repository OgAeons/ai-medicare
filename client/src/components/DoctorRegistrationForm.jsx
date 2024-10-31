import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function DoctorRegistrationForm({ registrationData }) {
    const navigate = useNavigate(); // Create navigate instance
    const initialDoctorDetails = {
        specialization: '',
        yearsOfExperience: '',
        clinicAddress: '',
        contactNumber: '',
        licenseNumber: '',
        consultationFees: '',
        availableTimings: '',
        qualification: '',
        languagesSpoken: '',
        bio: '',
    };

    const [doctorDetails, setDoctorDetails] = useState(initialDoctorDetails);
    const [submitMessage, setSubmitMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentStep, setCurrentStep] = useState(0);

    const fields = [
        { name: 'specialization', label: 'Specialization', type: 'text', required: true },
        { name: 'yearsOfExperience', label: 'Years of Experience', type: 'number', required: true },
        { name: 'clinicAddress', label: 'Clinic/Hospital Address', type: 'text', required: true },
        { name: 'contactNumber', label: 'Contact Number', type: 'tel', required: true },
        { name: 'licenseNumber', label: 'License Number', type: 'text', required: true },
        { name: 'consultationFees', label: 'Consultation Fees', type: 'number', required: true },
        { name: 'availableTimings', label: 'Available Timings', type: 'text', required: true },
        { name: 'qualification', label: 'Qualification', type: 'text', required: true },
        { name: 'languagesSpoken', label: 'Languages Spoken', type: 'text', required: true },
        { name: 'bio', label: 'Bio', type: 'textarea', required: true }
    ];

    const handleChange = (e, field) => {
        setDoctorDetails({ ...doctorDetails, [field.name]: e.target.value });
    };

    const handleNext = () => {
        if (currentStep < fields.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            submitDoctorDetails();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    async function submitDoctorDetails() {
        const completeDoctorData = { ...registrationData, ...doctorDetails };

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(completeDoctorData),
            });
            if (response.ok) {
                console.log("Doctor details submitted successfully!");
                setSubmitMessage("Doctor details submitted successfully!");
                setErrorMessage('');
                setDoctorDetails(initialDoctorDetails); // Clear form
                setCurrentStep(0); // Reset to the first step
                navigate("/"); // Navigate to home on successful registration
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to submit doctor details.');
                setSubmitMessage('');
            }
        } catch (error) {
            console.error("Error submitting doctor details", error);
            setErrorMessage('Error submitting doctor details. Please try again.');
            setSubmitMessage('');
        }
    }

    return (
        <form>
            <h2>Complete Doctor Registration</h2>
            <div>
                <label htmlFor={fields[currentStep].name}>{fields[currentStep].label}:</label>
                {fields[currentStep].type === 'textarea' ? (
                    <textarea
                        id={fields[currentStep].name}
                        value={doctorDetails[fields[currentStep].name]}
                        onChange={(e) => handleChange(e, fields[currentStep])}
                        required={fields[currentStep].required}
                    />
                ) : (
                    <input
                        id={fields[currentStep].name}
                        type={fields[currentStep].type}
                        value={doctorDetails[fields[currentStep].name]}
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

export default DoctorRegistrationForm;
