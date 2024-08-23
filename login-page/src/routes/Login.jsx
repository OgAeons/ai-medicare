import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import GoogleAuth from "../components/GoogleAuth"
import { account } from "../lib/appwriteConfig"

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    async function loginUser(e) {
        e.preventDefault()
        console.log(user);
        try {
            await account.createEmailPasswordSession(user.email, user.password)
            console.log('Session created')
            navigate('/home')
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container-right">
            <div className="signup-container">
                <h2>Welcome Back!</h2>
                <p className="description-signup">Continue to Google or enter your details</p>
                <GoogleAuth />
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
                    <button onClick={(e) => { loginUser(e) }} className="submit_doctor" type="submit">Login as doctor.</button>
                    <button onClick={(e) => { loginUser(e) }} className="submit_patient" type="submit">Login as patient.</button>
                </div>
                <p className="create-account">Don't have an account? <Link to={`/register`}>Sign Up for Free</Link></p>
            </div>
        </div>
    )
}

export default Login