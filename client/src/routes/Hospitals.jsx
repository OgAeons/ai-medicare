import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MapComponent from '../components/MapComponent'

function Hospitals() {
    const hospitals = [
        {
            id: 1,
            name: 'City Care Hospital',
            area: 'Downtown',
            image: '/images/hospital1.jpg',
            contact: '+1234567890',
        },
        {
            id: 2,
            name: 'Sunshine Clinic',
            area: 'Uptown',
            image: '/images/hospital2.png',
            contact: '+0987654321',
        },
        {
            id: 3,
            name: 'Global Health Center',
            area: 'Midtown',
            image: '/images/hospital3.png',
            contact: '+1122334455',
        },
        {
            id: 4,
            name: 'Jupiter Hospital',
            area: 'Midtown',
            image: '/images/hospital4.png',
            contact: '+1122334455',
        },
        {
            id: 5,
            name: 'Multispeciality Hospital',
            area: 'Midtown',
            image: '/images/hospital5.png',
            contact: '+1122334455',
        },
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

  return (
    <div className='home-container'>
        <Navbar />
        <div className="bottom-container">
            <div className="navigation">
                <Link to='/' style={{color: 'grey', fontWeight: '300'}}> Home </Link>
                <span style={{color: 'grey', margin: '0 3px'}}> &gt; </span>
                <Link to='/hospitals'  style={{color: 'grey', fontWeight: '300'}}> Explore Hospitals </Link>
            </div>
            <div className="section-title">Hospitals & Clinics</div>
            {hospitals.map(hospital => (
                <div className="hospital-container">
                    <div className="hospital-img-container">
                        <img src={hospital.image} alt="hospital-image" />
                    </div>
                    <div className="hospital-details">
                        <div className="hospital-name">{hospital.name}</div>
                        <div className="hospital-area">{hospital.area}</div>
                        <div className="hospital-contact">{hospital.contact}</div>
                        <div className="request-appointment">Request an Appointment</div>
                    </div>
                </div>
            ))}
            <MapComponent />
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
  )
}

export default Hospitals