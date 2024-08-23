import React from 'react'
import { account } from '../lib/appwriteConfig'

function GoogleAuth() {
    function handleAuth(e) {
        e.preventDefault()
        account.createOAuth2Session("google", "http://localhost:5173/home", "http://localhost:5173")
    }
  return (
    <div className="Auth">
        <button onClick={(e) =>handleAuth(e)} type="submit"><img src="/google.webp" alt="goole-logo" height={"25vh"}/>Sign in with Google</button>
    </div>
  )
}

export default GoogleAuth