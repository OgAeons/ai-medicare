import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: '',
        role: 'patient', 
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            navigate('/')
        }
    }, [navigate])

    async function loginUser(e) {
        e.preventDefault()
        setLoading(true)
        setErrorMessage('')

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })

            const data = await response.json()
            setLoading(false)

            if (response.ok) {
                if (data.success) {
                    console.log(data.message)
                    const userLoggedIn = {
                        name: data.user.name,
                        role: data.user.role,
                    }
                    localStorage.setItem("user", JSON.stringify(userLoggedIn))
                    navigate('/')
                } else {
                    setErrorMessage(data.message)
                }
            } else {
                setErrorMessage(data.message || 'Invalid email or password.')
            }
        } catch (error) {
            setLoading(false)
            setErrorMessage('Error logging in. Please check your connection.')
        }
    }

    return (
        <div className="bg-white w-[40%] h-[100vh]">
            <div className="w-[70%] h-[70%] mt-[17%] mx-auto mb-0 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold">Welcome Back!</h2>
                <p className="mb-[2rem]">Enter your details to log in</p>
                
                {errorMessage && <p className="text-red-600">{errorMessage}</p>} 
                
                <div className="w-full mt-[1.5rem]">
                    <label htmlFor='role' className="mr-auto mb-[0.4rem]">Role</label>
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
                    <label htmlFor='email' className="mr-auto mb-[0.4rem]">Email Address</label>
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
                    <label htmlFor='password' className="mr-auto mb-[0.4rem]">Password</label>
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
                <button onClick={loginUser} className="login-button" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="create-account">Don't have an account? <Link to={`/register`}>Sign Up for Free</Link></p>
            </div>
        </div>
    );
}

export default Login;
