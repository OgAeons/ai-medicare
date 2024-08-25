import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { account } from "../lib/appwriteConfig"
import GoogleAuth from "../components/GoogleAuth"

function Register(props) {
    const [user, setUser] = useState({
        name: '',
        email: '', 
        password: ''
    })

    const navigate = useNavigate()

    async function registerUser(e) {
        e.preventDefault()
        try {
            const userId = Math.random().toString(36).substring(2, 9)
            const newUser = await account.create(userId, user.email, user.password, user.name)
            console.log('User created:', newUser)
            await account.createEmailPasswordSession(user.email, user.password)
            console.log('Session created')
            navigate('/home')
        } catch (error) {
            console.error('Error during registration:', error.message)
        }
    }

    return (
        <div className="container-right">
            <div className="signup-container">
                <h2>Welcome!</h2>
                <p className="description-signup">Continue to Google or enter your details</p>
                <GoogleAuth />
                <Input 
                    name="name"
                    placeholder="Username"
                    type="text"
                    user={user}
                    setUser={setUser}
                />
                <Input 
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    user={user}
                    setUser={setUser}
                />
                <Input 
                    name="password"
                    placeholder="Password"
                    type="password"
                    user={user}
                    setUser={setUser}
                />
                <a href="" className="forgot">Forgot pasword?</a>
                <div className="login_div">
                    <button onClick={(e) => { registerUser(e) }} className="submit_doctor" type="submit">Register as doctor</button>
                    <button onClick={(e) => { registerUser(e) }} className="submit_patient" type="submit">Register as patient</button>
                </div>
                <p className="create-account">Already have an account? <Link to={`/`}>Sign In</Link></p>
            </div>
        </div>
    )
}

export default Register