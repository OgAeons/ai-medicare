import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'

function Home() {
  return (
    <div>
      <div className='notice'>The health and well-being of our users and their healthcare team will be our first priority.</div>
      <div className='home-container'>
        <Navbar />
        <Banner />
      </div>
    </div>
  )
}

export default Home