import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
        role: 'patient' 
    });

    async function loginUser(e) {
        e.preventDefault()
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user), // Send user data directly
            });
            const data = await response.json();
    
            if (response.ok) { // Check if the response is successful
                if (data.success) { // Further check if the login was successful
                    console.log(data.message); // Log success message
                    navigate('/'); // Navigate to home on successful login
                } else {
                    console.error('Login failed:', data.message); // Show error message if login fails
                }
            } else {
                console.error('Server error:', response.status); // Log server errors
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    }
    

    return (
        <div style={{ width: '40%', height: '100vh', backgroundColor: 'white' }}>
            <div className="signup-container">
                <h2>Welcome Back!</h2>
                <p className="description-signup">Enter your details to log in</p>
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
                <a href="#" className="forgot">Forgot password?</a>
                <button onClick={loginUser} className="login-button" type="submit">Login</button>
                <p className="create-account">Don't have an account? <Link to={`/register`}>Sign Up for Free</Link></p>
            </div>
        </div>
    );
}

export default Login;
