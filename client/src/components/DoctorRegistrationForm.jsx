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
    const [isLoading, setIsLoading] = useState(false);

    // Define all fields in an array for easy iteration
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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    // Move to the next step if current field is valid
    const handleNext = () => {
        const currentField = fields[currentStep];
        if (currentField.required && !doctorDetails[currentField.name]) {
            setErrorMessage(`Please fill out the ${currentField.label}.`);
            return;
        }
        setErrorMessage(''); // Clear error if validation passes
        setCurrentStep(prevStep => prevStep + 1);
    };

    // Go back to the previous step
    const handleBack = () => {
        setErrorMessage('');
        setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
    };

    // Submit form data
    const submitDoctorDetails = async () => {
        const completeDoctorData = { ...registrationData, ...doctorDetails, role: 'doctor' }; // Include role
    
        setIsLoading(true); // Set loading state
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(completeDoctorData),
            });
    
            if (response.ok) {
                setSubmitMessage("Doctor details submitted successfully!");
                setErrorMessage('');
                setDoctorDetails(initialDoctorDetails); // Reset form
                setCurrentStep(0); // Reset step
                navigate("/"); // Navigate to home on successful registration
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to submit doctor details.');
                setSubmitMessage('');
            }
        } catch (error) {
            console.error("Error submitting doctor details:", error);
            setErrorMessage('Error submitting doctor details. Please try again.');
            setSubmitMessage('');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Complete Doctor Registration</h2>
            <div>
                <label htmlFor={fields[currentStep].name}>{fields[currentStep].label}:</label>
                {fields[currentStep].type === 'textarea' ? (
                    <textarea
                        id={fields[currentStep].name}
                        name={fields[currentStep].name}
                        value={doctorDetails[fields[currentStep].name]}
                        onChange={handleChange}
                        required={fields[currentStep].required}
                    />
                ) : (
                    <input
                        id={fields[currentStep].name}
                        name={fields[currentStep].name}
                        type={fields[currentStep].type}
                        value={doctorDetails[fields[currentStep].name]}
                        onChange={handleChange}
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
                {currentStep < fields.length - 1 ? (
                    <button type="button" onClick={handleNext}>
                        Next
                    </button>
                ) : (
                    <button type="button" onClick={submitDoctorDetails} disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                )}
            </div>
            {submitMessage && <p style={{ color: 'green' }}>{submitMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
}

export default DoctorRegistrationForm;
