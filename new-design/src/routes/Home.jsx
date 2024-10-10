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
        <div className='bottom-container'>
          <div className='card-container'>
            <Card 
              title="Virtual Nurse"
              info="Connect within 60 secs"
              img="/images/virtual-nurse.png"
              bgColor="#e3e37c"
              link="/doctor"
            />
            <Card 
              title="Find Doctors"
              info="Confirm Appointments"
              img="/images/find-doctors.png"
              bgColor="#c9d1cb"
              link="/doctor"
            />
            <Card 
              title="24/7 Medicines"
              info="Essentials at your doorstep"
              img="/images/medicines.png"
              bgColor="#e88e8e"
              link="/doctor"
            />
            <Card 
              title="Lab Tests"
              info="Nearest labs in your area"
              img="/images/lab-tests.png"
              bgColor="#a5c8f7"
              link="/lab-tests"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home