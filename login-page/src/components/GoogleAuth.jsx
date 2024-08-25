import React, { useEffect } from 'react'
import { account } from '../lib/appwriteConfig'
import { useNavigate } from "react-router-dom"

function GoogleAuth() {
  const navigate = useNavigate()
  
  async function handleAuth(e) {
    e.preventDefault()
    try {
        // Start the OAuth2 session
        account.createOAuth2Session("google", "http://localhost:5173/auth-callback", "http://localhost:5173");
    } catch (error) {
        console.error("Authentication error:", error);
    }
}

  return (
    <div className="Auth">
      <button onClick={(e) =>handleAuth(e)} type="submit"><img src="/google.webp" alt="goole-logo" height={"25vh"}/>Sign in with Google</button>
    </div>
    
  )
}

export default GoogleAuth