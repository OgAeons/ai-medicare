import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: '',
        role: 'patient'
    })

    async function loginUser(e, role) {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...user, role }),
            });
            const data = await response.json();
            if (data.success) {
                console.log('Login successful');
                navigate('/home');
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    }

    return (
        <div style={{width: '40%',height: '100vh', backgroundColor: 'white'}}>
            <div className="signup-container">
                <h2>Welcome Back!</h2>
                <p className="description-signup">Enter your details to log in</p>
                <div className="input-container">
                    <label htmlFor='role' className="input-label">Role </label>
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
                <a href="#" className="forgot">Forgot pasword?</a>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <button onClick={(e) => loginUser(e, 'doctor')} className="login-button" type="submit">Login as Doctor</button>
                    <button onClick={(e) => loginUser(e, 'patient')} className="login-button" type="submit">Login as Patient</button>
                </div>
                <p className="create-account">Don't have an account? <Link to={`/register`}>Sign Up for Free</Link></p>
            </div>
        </div>
    )
}

export default Login