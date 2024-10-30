import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient'
    });

    async function registerUser(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (response.ok) { // Check for successful response
                console.log('Registration successful:', data.message);
                navigate('/'); // Navigate to home on successful registration
            } else {
                console.error('Registration failed:', data.message);
            }
        } catch (error) {
            console.error('Error registering:', error.message);
        }
    }

    return (
        <div style={{ width: '40%', height: '100vh', backgroundColor: 'white' }}>
            <div className="signup-container">
                <h2>Create an Account</h2>
                <p className="description-signup">Fill in the details to create an account</p>
                <div className="input-container">
                    <label htmlFor='role' className="input-label">Role</label>
                    <select
                        className="role-select"
                        name="role"
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
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
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                </div>
                <button onClick={registerUser} className="login-button" type="submit">Register</button>
                <p className="create-account">Already have an account? <Link to={`/login`}>Login here</Link></p>
            </div>
        </div>
    );
}

export default Register;
