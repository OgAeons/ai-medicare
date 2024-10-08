import React from 'react'
import Navbar from '../components/Navbar'
import Items from '../components/Items'
import DoctorCard from '../components/DoctorCard'

function FindDoctor() {

    return (
        <div className='home-container'>
            <Navbar />
            <div className='doctor-banner-container'>
                <div className='doctor-banner'>Book an Appoinment for In-Clinic consultation.</div>
                <div className='doctor-banner'>Book an Appointment for Doorstep Checkup.</div>
            </div>
            <div className='bottom-container'>
                <div className='specialist'>
                    <div className='specialist-title'>Specialists:</div>
                    <div className='item-container'>
                        <Items 
                            name='Orthopedists'
                        />
                        <Items 
                            name='Obesity'
                        />
                        <Items 
                            name='Neck Pain'
                        />
                        <Items 
                            name='Back Pain'
                        />
                        <Items 
                            name='Neurology'
                        />
                        <Items 
                            name='Headache'
                        />
                        <Items 
                            name='Eye Care'
                        />
                        <Items 
                            name='Dermatologist'
                        />
                        <Items 
                            name='Allergists'
                        />
                        <Items 
                            name='Cardiologists'
                        />
                        <Items 
                            name='Physicians'
                        />
                        <Items 
                            name='Gastroenterologists'
                        />
                        <Items 
                            name='Gynecologists'
                        />
                        <Items 
                            name='Pediatricians'
                        />
                        <Items 
                            name='Plastic Surgeons'
                        />
                    </div>
                    <div className='doctor-card-container'>
                        <DoctorCard 
                            name='Dr. Sanjana Gupta'
                            img='/images/doctor5.png'
                            speciality='Neurosurgeon'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindDoctor