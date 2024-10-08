import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Card from '../components/Card'

function Home() {
  return (
    <div>
      <div className='notice'>The health and well-being of our users and their healthcare team will be our first priority.</div>
      <div className='home-container'>
        <Navbar />
        <Banner />
        <div className='card-container'>
          <Card 
            title="Virtual Nurse"
            info="Connect within 60 secs"
            img="/images/virtual-nurse.png"
            bgColor="#e3e37c"
          />
          <Card 
            title="Find Doctors"
            info="Confirm Appointments"
            img="/images/find-doctors.png"
            bgColor="#c9d1cb"
          />
          <Card 
            title="24/7 Medicines"
            info="Essentials at your doorstep"
            img="/images/medicines.png"
            bgColor="#e88e8e"
          />
          <Card 
            title="Lab Tests"
            info="Nearest labs in your area"
            img="/images/lab-tests.png"
            bgColor="#a5c8f7"
          />
        </div>
      </div>
    </div>
  )
}

export default Home