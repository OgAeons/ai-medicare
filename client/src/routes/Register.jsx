import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../services/User';
import PatientRegistrationForm from "../components/PatientRegistrationForm";
import DoctorRegistrationForm from "../components/DoctorRegistrationForm";

function Register() {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [user, setUserState] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient',
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function registerUser(e) {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();

            setLoading(false); // Reset loading state

            if (response.ok) {
                console.log('Registration successful:', data.message);
                setUser({ name: user.name, role: user.role });

                if (user.role === 'patient') {
                    setIsFormSubmitted(true);
                } else {
                    navigate('/'); // Redirect to homepage for doctors
                }
            } else {
                setErrorMessage(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setLoading(false); // Reset loading state
            setErrorMessage('Error registering. Please check your connection.');
        }
    }

    return (
        <div style={{ width: '40%', height: '100vh', backgroundColor: 'white' }}>
            <div className="signup-container">
                {isFormSubmitted ? (
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
                        {loading && <p style={{ color: 'blue' }}>Registering...</p>} {/* Loading message */}
                        
                        <div className="input-container">
                            <label htmlFor='role' className="input-label">Role</label>
                            <select
                                className="role-select"
                                name="role"
                                value={user.role}
                                onChange={(e) => setUserState({ ...user, role: e.target.value })}
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
                                onChange={(e) => setUserState({ ...user, name: e.target.value })}
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
                                onChange={(e) => setUserState({ ...user, email: e.target.value })}
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
                                onChange={(e) => setUserState({ ...user, password: e.target.value })}
                                required
                            />
                        </div>
                        <button onClick={registerUser} className="login-button" type="submit" disabled={loading}>
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
