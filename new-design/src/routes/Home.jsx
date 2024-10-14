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
                <Banner 
                    slides= {[
                        { bgColor: '#14114d', color: '#b3aff6', title: 'Healthcare', img: '/images/doctor.png', imgWidth: '43%' },
                        { bgColor: '#2bec72', color: '#2b5e3d', title: 'Pharmacy', img: '/images/doctor2.png', imgWidth: '52%' },
                        { bgColor: '#e12285', color: '#ee87bc', title: 'Virtual Nurse', img: '/images/doctor3.png', imgWidth: '42%' },
                        { bgColor: '#ff0000', color: '#f38c8c', title: 'Lab Tests', img: '/images/doctor4.png', imgWidth: '35%' },
                    ]}
                />
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
                            link="/medicine"
                        />
                        <Card 
                            title="Lab Tests"
                            info="Nearest labs in your area"
                            img="/images/lab-tests.png"
                            bgColor="#a5c8f7"
                            link="/lab-tests"
                        />
                    </div>
                    
                    <div className='hospitals'></div>
                    <div className='map'></div>
                </div>
                <div className='footer'>
                    <div className='footer-left'>
                        <div className='footer-logo'>
                            <img src="/images/Aim-logo-removebg.png" alt="logo" height={'300vh'} />
                            <div className='footer-title'>Artificial Intelligence Medicare</div>
                        </div>
                        <div className='copyright'>©2024 AiM: Artificial Intelligence Medicare</div>
                    </div>
                    <div className='footer-right'>
                        <div className='footer-section'>
                            <div className='footer-section-title'>Healthcare Team</div>
                            <div className='footer-items'>Doctors</div>
                            <div className='footer-items'>Nurses</div>
                            <div className='footer-items'>Consultants</div>
                            <div className='footer-items'>Health Plans</div>
                        </div>
                        <div className='footer-section'>
                            <div className='footer-section-title'>Need Support?</div>
                            <div className='footer-items'>Chat with us</div>
                            <div className='footer-items'>Call Support</div>
                            <div className='footer-items'>Email</div>
                            <div className='footer-items'>Feedback</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home