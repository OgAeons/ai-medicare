import React, { useEffect } from 'react'
import { account } from '../lib/appwriteConfig'
import { useNavigate } from 'react-router-dom'

function AuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        async function checkUser() {
            try {
                const userPrefs = await account.getPrefs() 
                if (userPrefs && Object.keys(userPrefs).length > 0) {
                    return true // Existing user
                } else {
                    return false // New user
                }
            } catch (error) {
                console.error("User does not exist or not authenticated:", error)
                return false; // User does not exist
            }
        }
        
        async function handleUserCheck() {
            const userExists = await checkUser(); 
            if (userExists) {
                navigate('/home')
            } else {
                navigate('/info')
            }
        }
        handleUserCheck()
    }, [navigate])

    return <div>Loading...</div> 
}

export default AuthCallback