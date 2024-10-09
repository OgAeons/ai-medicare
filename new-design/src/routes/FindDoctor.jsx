import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Items from '../components/Items'
import DoctorCard from '../components/DoctorCard'

function FindDoctor() {
    const [selectedBanner, setSelectedBanner] = useState()
    const [selectedItem, setSelectedItem] = useState([])
    const [isSelected, setIsSelected] = useState()

    const doctorsBySpecialist = {
        'Orthopedists': [
            { name: 'Dr. Sanjana Mehta1', img: '/images/doctor5.png', speciality: 'Orthopedists' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Orthopedists' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Orthopedists' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Orthopedists' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Orthopedists' }
        ],
        'Obesity': [
            { name: 'Dr. Sanjana Mehta2', img: '/images/doctor5.png', speciality: 'Obesity' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Obesity' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Obesity' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Obesity' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Obesity' }
        ],
        'Neck Pain': [
            { name: 'Dr. Sanjana Mehta3', img: '/images/doctor5.png', speciality: 'Neck Pain' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Neck Pain' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Neck Pain' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Neck Pain' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Neck Pain' }
        ],
        'Back Pain': [
            { name: 'Dr. Sanjana Mehta4', img: '/images/doctor5.png', speciality: 'Back Pain' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Back Pain' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Back Pain' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Back Pain' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Back Pain' }
        ],
        'Neurology': [
            { name: 'Dr. Sanjana Mehta5', img: '/images/doctor5.png', speciality: 'Neurology' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Neurology' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Neurology' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Neurology' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Neurology' }
        ],
        'Headache': [
            { name: 'Dr. Sanjana Mehta6', img: '/images/doctor5.png', speciality: 'Headache' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Headache' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Headache' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Headache' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Headache' }
        ],
        'Eye Care': [
            { name: 'Dr. Sanjana Mehta7', img: '/images/doctor5.png', speciality: 'Eye Care' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Eye Care' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Eye Care' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Eye Care' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Eye Care' }
        ],
        'Dermatologist': [
            { name: 'Dr. Sanjana Mehta8', img: '/images/doctor5.png', speciality: 'Dermatologist' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Dermatologist' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Dermatologist' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Dermatologist' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Dermatologist' }
        ],
        'Allergists': [
            { name: 'Dr. Sanjana Mehta9', img: '/images/doctor5.png', speciality: 'Allergists' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Allergists' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Allergists' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Allergists' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Allergists' }
        ],
        'Cardiologists': [
            { name: 'Dr. Sanjana Mehta10', img: '/images/doctor5.png', speciality: 'Cardiologists' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Cardiologists' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Cardiologists' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Cardiologists' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Cardiologists' }
        ],
        'Physicians': [
            { name: 'Dr. Sanjana Mehta11', img: '/images/doctor5.png', speciality: 'Physicians' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Physicians' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Physicians' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Physicians' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Physicians' }
        ],
        'Gastroenterologists': [
            { name: 'Dr. Sanjana Mehta12', img: '/images/doctor5.png', speciality: 'Gastroenterologists' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Gastroenterologists' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Gastroenterologists' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Gastroenterologists' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Gastroenterologists' }
        ],
        'Gynecologists': [
            { name: 'Dr. Sanjana Mehta13', img: '/images/doctor5.png', speciality: 'Gynecologists' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Gynecologists' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Gynecologists' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Gynecologists' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Gynecologists' }
        ],
        'Pediatricians': [
            { name: 'Dr. Sanjana Mehta14', img: '/images/doctor5.png', speciality: 'Pediatricians' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Pediatricians' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Pediatricians' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Pediatricians' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Pediatricians' }
        ],
        'Plastic Surgeons': [
            { name: 'Dr. Sanjana Mehta15', img: '/images/doctor5.png', speciality: 'Plastic Surgeons' },
            { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Plastic Surgeons' },
            { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Plastic Surgeons' },
            { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Plastic Surgeons' },
            { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Plastic Surgeons' }
        ]
    }

    function handleItemClick(specialist) {
        setSelectedItem(doctorsBySpecialist[specialist] || [])
        setIsSelected(specialist)
    }

    function handleBannerClick(banner) {
        setSelectedBanner(banner)
    }

    return (
        <div className='home-container'>
            <Navbar />
            <div className='doctor-banner-container'>
                <div  className={`doctor-banner ${selectedBanner === 'clinic' ? 'selected-banner' : ''}`} onClick={() => handleBannerClick('clinic')}>Book an Appoinment for In-Clinic consultation.</div>
                <div className={`doctor-banner ${selectedBanner === 'doorstep' ? 'selected-banner' : ''}`} onClick={() => handleBannerClick('doorstep')}>Book an Appointment for Doorstep Checkup.</div>
            </div>
            <div className='bottom-container'>
                <div className='specialist'>
                    <div className='specialist-title'>Specialists:</div>
                    <div className='item-container'>
                        { Object.keys(doctorsBySpecialist).map((specialist, index) => (
                            <Items
                                key={index}
                                name={specialist}
                                onClick={ () => handleItemClick(specialist)}
                                isSelected={isSelected === specialist}
                            />
                        ))}
                    </div>
                    <div className='doctor-card-container'>
                        { selectedItem.length > 0 ? (
                            selectedItem.map((doctor, index) => (
                                <DoctorCard 
                                    key={index}
                                    name={doctor.name}
                                    img={doctor.img}
                                    speciality={doctor.speciality}
                                />
                            ))
                        ) : (
                            <div>Please select a specialist to view doctors.</div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindDoctor