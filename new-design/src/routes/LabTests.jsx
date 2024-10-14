import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import LabBanner from '../components/LabBanner'
import Items from '../components/Items'
import DoctorCard from '../components/DoctorCard'
import MapComponent from '../components/MapComponent'

function LabTests() {
    const [selectedItem, setSelectedItem] = useState([
        { name: 'Full Body Checkups', img: '/images/Full-Body-Check-Up.jpg', price: 'Rs. 999' },
        { name: 'Comprehensive Full Body Checkups', img: '/images/Full-Body-Check-Up.jpg', price: 'Rs. 800' },
        { name: 'Diabetes Checkups', img: '/images/Diabetes.jpg', price: 'Rs. 999' },
        { name: 'Diabetes Screening', img: '/images/Diabetes.jpg', price: 'Rs. 800' },
        { name: 'Heart Checkup', img: '/images/heart-checkups.jpg', price: 'Rs. 1099' },
        { name: 'Cancer Checkups', img: '/images/cancer.jpg', price: 'Rs. 999' },
        { name: 'Cancer Treatment', img: '/images/cancer.jpg', price: 'Rs. 1099' },
        { name: 'Vitamin D Checkups', img: '/images/vitamin.jpg', price: 'Rs. 199' },
        { name: 'Vitmain B Screening', img: '/images/vitamin.jpg', price: 'Rs. 299' },
        { name: 'Regular Checkups', img: '/images/women.jpg', price: 'Rs. 199' },
        { name: 'Genital Care', img: '/images/women.jpg', price: 'Rs. 299' },
        { name: 'Skin Checkups', img: '/images/doctor5.png', price: 'Rs. 399' },
        { name: 'Skin Treatment', img: '/images/doctor5.png', price: 'Rs. 799' },
        { name: 'Liver Checkups', img: '/images/doctor5.png', price: 'Rs. 299' },
        { name: 'Liver treatment', img: '/images/doctor5.png', price: 'Rs. 399' },
    ])
    const [isSelected, setIsSelected] = useState('All Tests')

    const checkups = [
        'All Tests', 
        'Full Body Check-up',
        'Diabetes', 
        'Heart',
        'Cancer',
        'Vitamin',
        'Women Health',
        'Skin Care',
        'Liver',
        'Stress'
    ]

    const testsByCheckups = {
        'All Tests': [
            { name: 'Full Body Checkups', img: '/images/Full-Body-Check-Up.jpg', price: 'Rs. 999' },
            { name: 'Comprehensive Full Body Checkups', img: '/images/Full-Body-Check-Up.jpg', price: 'Rs. 800' },
            { name: 'Diabetes Checkups', img: '/images/Diabetes.jpg', price: 'Rs. 999' },
            { name: 'Diabetes Screening', img: '/images/Diabetes.jpg', price: 'Rs. 800' },
            { name: 'Heart Checkup', img: '/images/heart-checkups.jpg', price: 'Rs. 1099' },
            { name: 'Cancer Checkups', img: '/images/cancer.jpg', price: 'Rs. 999' },
            { name: 'Cancer Treatment', img: '/images/cancer.jpg', price: 'Rs. 1099' },
            { name: 'Vitamin D Checkups', img: '/images/vitamin.jpg', price: 'Rs. 199' },
            { name: 'Vitmain B Screening', img: '/images/vitamin.jpg', price: 'Rs. 299' },
            { name: 'Regular Checkups', img: '/images/women.jpg', price: 'Rs. 199' },
            { name: 'Genital Care', img: '/images/women.jpg', price: 'Rs. 299' },
            { name: 'Skin Checkups', img: '/images/doctor5.png', price: 'Rs. 399' },
            { name: 'Skin Treatment', img: '/images/doctor5.png', price: 'Rs. 799' },
            { name: 'Liver Checkups', img: '/images/doctor5.png', price: 'Rs. 299' },
            { name: 'Liver treatment', img: '/images/doctor5.png', price: 'Rs. 399' },
        ], 
        'Full Body Check-up': [
            { name: 'Full Body Checkups', img: '/images/Full-Body-Check-Up.jpg', price: 'Rs. 999' },
            { name: 'Comprehensive Full Body Checkups', img: '/images/Full-Body-Check-Up.jpg', price: 'Rs. 800' },
        ],
        'Diabetes': [
            { name: 'Diabetes Checkups', img: '/images/Diabetes.jpg', price: 'Rs. 999' },
            { name: 'Diabetes Screening', img: '/images/Diabetes.jpg', price: 'Rs. 800' },
        ], 
        'Heart': [
            { name: 'Heart Checkup', img: '/images/heart-checkups.jpg', price: 'Rs. 1099' },
        ],
        'Cancer': [
            { name: 'Cancer Checkups', img: '/images/cancer.jpg', price: 'Rs. 999' },
            { name: 'Cancer Treatment', img: '/images/cancer.jpg', price: 'Rs. 1099' },
        ],
        'Vitamin': [
            { name: 'Vitamin D Checkups', img: '/images/vitamin.jpg', price: 'Rs. 199' },
            { name: 'Vitmain B Screening', img: '/images/vitamin.jpg', price: 'Rs. 299' },
        ],
        'Women Health': [
            { name: 'Regular Checkups', img: '/images/women.jpg', price: 'Rs. 199' },
            { name: 'Genital Care', img: '/images/women.jpg', price: 'Rs. 299' },
        ],
        'Skin Care': [
            { name: 'Skin Checkups', img: '/images/doctor5.png', price: 'Rs. 399' },
            { name: 'Skin Treatment', img: '/images/doctor5.png', price: 'Rs. 799' },
        ],
        'Liver': [
            { name: 'Liver Checkups', img: '/images/doctor5.png', price: 'Rs. 299' },
            { name: 'Liver treatment', img: '/images/doctor5.png', price: 'Rs. 399' },
        ],
        'Stress': [
            { name: 'Stress Checkups', img: '/images/doctor5.png', price: 'Rs. 299' },
        ]
    }

    function handleItemClick(test) {
        setSelectedItem(testsByCheckups[test] || [])
        setIsSelected(test)
    }

  return (
    <div className='home-container'>
        <Navbar />
        <div className='tests-banner'>
            <LabBanner />
        </div>
        <div className='bottom-container'>
            <div className='specialist'>
                <div className='section-title'>Health Check-up Packages:</div>
                <div className='item-container'>
                    { checkups.map((test, index) => (
                        <Items
                            key={index}
                            name={test}
                            onClick={ () => handleItemClick(test)}
                            isSelected={isSelected === test}
                        />
                    ))}
                </div>
                <div className='doctor-card-container'>
                    { selectedItem.length > 0 ? (
                        selectedItem.map((checkup, index) => (
                            <DoctorCard 
                                key={index}
                                name={checkup.name}
                                img={checkup.img}
                                price={checkup.price}
                            />
                        ))
                    ) : (
                        <div>Please select a specialist to view doctors.</div>
                    )}
                </div>
            </div>
            <div className='section-title'>Test Labs:</div>
            <MapComponent />
        </div>
    </div>
  )
}

export default LabTests