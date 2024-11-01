import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PatientRegistrationForm from "../components/PatientRegistrationForm";
import DoctorRegistrationForm from "../components/DoctorRegistrationForm";

function Register() {
    const navigate = useNavigate();
    const [user, setUserState] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient',
        user_id: Date.now().toString(),
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [nextQuestion, setNextQuestion] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            const data = await response.json();

            setLoading(false);

            if (response.ok) {
                // Proceed to the next step for additional information form
                setIsFormSubmitted(true);
            } else {
                setErrorMessage(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            setErrorMessage('Error registering. Please check your connection.');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserState((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ width: '40%', height: '100vh', backgroundColor: 'white' }}>
            <div className="signup-container">
                {isFormSubmitted ? (
                    // Render the additional form based on user role
                    user.role === 'patient' ? (
                        <PatientRegistrationForm registrationData={user} />
                    ) : (
                        <DoctorRegistrationForm registrationData={user} />
                    )
                ) : (
                    <>
                        <h2>Create an Account</h2>
                        <p className="description-signup">Fill in the details to create an account</p>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {loading && <p style={{ color: 'blue' }}>Registering...</p>}

                        <div className="input-container">
                            <label htmlFor='role' className="input-label">Role</label>
                            <select
                                className="role-select"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label htmlFor='name' className="input-label">Name</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor='email' className="input-label">Email Address</label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor='password' className="input-label">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button onClick={handleRegister} className="login-button" type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                        <p className="create-account">Already have an account? <Link to="/login">Login here</Link></p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Register;
