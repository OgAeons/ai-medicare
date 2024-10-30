import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from '../services/User'

function Login() {
    const navigate = useNavigate()
    const { setUser } = useUser()

    const [user, setUserState] = useState({
        email: '',
        password: '',
        role: 'patient' 
    })

    const [errorMessage, setErrorMessage] = useState('')

    async function loginUser(e) {
        e.preventDefault()
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json()
    
            if (response.ok) {
                if (data.success) { 
                    console.log(data.message)
                    setUser({ name: data.user.name, role: user.role })
                    navigate('/')
                } else {
                    setErrorMessage(data.message)
                }
            } else if (response.status === 401 || response.status === 400) {
                setErrorMessage(data.message || 'Invalid email or password.')
            } else {
                setErrorMessage('Server error. Please try again later.')
            }
        } catch (error) {
            setErrorMessage('Error logging in. Please check your connection.')
        }
    }
    

    return (
        <div style={{ width: '40%', height: '100vh', backgroundColor: 'white' }}>
            <div className="signup-container">
                <h2>Welcome Back!</h2>
                <p className="description-signup">Enter your details to log in</p>
                
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
                
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
                <a href="#" className="forgot">Forgot password?</a>
                <button onClick={loginUser} className="login-button" type="submit">Login</button>
                <p className="create-account">Don't have an account? <Link to={`/register`}>Sign Up for Free</Link></p>
            </div>
        </div>
    )
}

export default Login
