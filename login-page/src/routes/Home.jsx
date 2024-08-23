import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from "../lib/appwriteConfig"

function Home() {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await account.get()
                setUser(data)
            } catch (error) {
                console.log('Error fetching user data:', error.message)
                navigate('/')
            }
        }
        fetchUserData()
    }, [])

    async function handleLogout(e) {
        e.preventDefault()
        try {
            await account.deleteSession('current')
            navigate('/')
        } catch (error) {
            console.log('Error logging out:', error.message);
        }
    }

    async function handleDelete(e) {
        e.preventDefault()
        try {
            await account.deleteIdentity(user.$id)
            navigate('/register')
        } catch (error){
            console.log('Error deleting user:', error.message);
        }
    }

    if(user) {
        return (
            <div>
                <h1 className="home-title"> Home Page </h1>
                <div className="user-section">
                    <h3>Welcome, {user?.name}</h3>
                    <button onClick={(e) => handleLogout(e)} className='home-btn' style={{backgroundColor: "red"}}>Logout</button>
                    <button className='home-btn' style={{backgroundColor: "blue"}}>Change Password</button>
                </div>
                <hr />
                <div className='user-details'>
                    <h6>UID : {user?.$id || "N/A"}</h6>
                    <h6>Name : {user?.name || "N/A"}</h6>
                    <h6>Email : {user?.email || "N/A"}</h6>
                    <h6>Email Verified : {user.emailVerification ? 'Verified' : 'Not Verified'}</h6>
                    <h6>Registered on : {new Date(user.registration).toDateString()} </h6>
                </div>
                <hr />
                <div>
                    <button className="delete-btn" onClick={(e) => handleDelete(e)}>Delete Account</button>
                </div>
            </div>
        )
    } else {
        return <div>Please login first to view homepage</div>
    }
}

export default Home