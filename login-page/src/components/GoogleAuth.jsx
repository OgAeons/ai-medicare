import React, { useEffect } from 'react'
import { account } from '../lib/appwriteConfig'

function GoogleAuth() {
  async function handleAuth(e) {
    e.preventDefault()
    try {
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