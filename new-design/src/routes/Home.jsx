import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div>
      <div className='notice'>The health and well-being of our users and their healthcare team will be our first priority.</div>
      <div className='home-container'>
        <Navbar /> 
      </div>
    </div>
  )
}

export default Home