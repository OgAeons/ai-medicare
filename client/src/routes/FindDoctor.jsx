import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Items from '../components/Items'
import DoctorCard from '../components/DoctorCard'
import MapComponent from '../components/MapComponent'
import { FaMapMarkerAlt, FaCalendarAlt, FaHospital, FaHome, FaUserMd, FaLightbulb } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import DoctorsList from '../components/DoctorsList'

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import {Icon} from 'leaflet'

function FindDoctor() {
    const [selectedBanner, setSelectedBanner] = useState()
    const [selectedItem, setSelectedItem] = useState([
        { name: 'Dr. Sanjana Mehta1', img: '/images/doctor5.png', speciality: 'Orthopedists' },
        { name: 'Dr. Raj Sharma', img: '/images/doctor6.png', speciality: 'Orthopedists' },
        { name: 'Dr. Meena Dixit', img: '/images/doctor7.png', speciality: 'Orthopedists' },
        { name: 'Dr. Aditya Rao', img: '/images/doctor8.png', speciality: 'Orthopedists' },
        { name: 'Dr. Shivam Ghorpade', img: '/images/doctor9.png', speciality: 'Orthopedists' }
    ])
    const [isSelected, setIsSelected] = useState('Orthopedists')

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

    const clinicsBySpeciality = {
        'Orthopedists': [
            { name: 'Orthopedics Clinic A', lat: 37.773972, lng: -122.431297  },
            { name: 'Orthopedics Clinic B', lat: 37.773972, lng: -122.431297 }
        ],
        'Obesity': [
            { name: 'Obesity Clinic A', lat: 37.773972, lng: -122.431297  },
            { name: 'Obesity Clinic B', lat: 37.773972, lng: -122.431297 }
        ]
    }

    // const markers = [
    //     {
    //         geocode: [18.619893726057885, 73.74988316737976],
    //         popUp: 'JSPMs Rajarshi Shahu College of Engineering'
    //     },
    //     {
    //         geocode: [18.618938000659224, 73.7479627056685],
    //         popUp: 'Clinic A'
    //     },
    //     {
    //         geocode: [18.618968502616635, 73.75231861323707],
    //         popUp: 'Clinic B'
    //     }
    // ]
    
    // const customIcon = new Icon({
    //     iconUrl: '/icons/pin2.png',
    //     iconSize: [38,38]
    // })

    function handleItemClick(specialist) {
        setSelectedItem(doctorsBySpecialist[specialist] || [])
        setIsSelected(specialist)
    }

    function handleBannerClick(banner) {
        setSelectedBanner(banner)
    }




    const [activeSpecialization, setActiveSpecialization] = useState('Family Physician')
    const [date, setDate] = useState(new Date())
    const [showCalendar, setShowCalendar] = useState(false)
    const [appointmentType, setAppointmentType] = useState('Clinic Appointment')
    const [showAppointmentType, setShowAppointmentType] = useState(false)
    const [showDoctorsList, setShowDoctorsList] = useState(false)

    const specializations = [
        "Family Physician", "Acupuncturist", "Allergist", "Anesthesiologist", "Cardiologist", "Chiropractor", 
        "Dentist", "Dermatologist", "Dietitian", "Audiologist", "Bariatric Surgeon", "Child and Adolescent Psychiatrist",
        "Clinical Neurophysiologist", "Colorectal Surgeon", "Cornea & External Diseases Specialist", "Diagnostic Radiologist",
        "Ear, Nose & Throat Doctor", "Emergency Medicine Physician", "Endocrinologist", "Endodontist",
        "Facial Plastic & Reconstructive Surgeon", "Family Nurse Practitioner", "Family Psychiatric & Mental Health Nurse Practitioner",
        "Foot & Ankle Specialist", "Forensic Psychiatrist", "Gastroenterologist", "Geriatrician", "Glaucoma Specialist",
        "Gynecologist", "Hand & Microsurgery Specialist", "Hand Surgeon", "Head & Neck Surgeon", "Hematologist",
        "Hip and Knee Surgeon", "Infectious Disease Specialist", "Internist", "Interventional Cardiologist", "Laryngologist",
        "Midwife", "Nephrologist", "Neuro-Ophthalmologist", "Neuro-Otologist", "Neurologist", "Neurosurgeon",
        "Nuclear Medicine Specialist", "Nurse Practitioner", "Nutritionist", "OB-GYN", "Occupational Therapist",
        "Oculoplastic Surgeon", "Oncologist", "Ophthalmologist", "Optometrist", "Oral Surgeon", "Orthodontist",
        "Orthopedic Surgeon", "Pain Management Specialist", "Pediatric / Strabismus Eye Doctor", "Pediatric Cardiologist",
        "Pediatric Dentist", "Pediatric Dermatologist", "Pediatric Emergency Medicine Specialist", "Pediatric Nurse Practitioner",
        "Pediatric Orthopedic Surgeon", "Pediatric Otolaryngologist", "Pediatric Sports Medicine Specialist",
        "Pediatrician", "Periodontist", "Physiatrist", "Physical Therapist", "Physician Assistant", "Plastic Surgeon",
        "Podiatrist", "Primary Care Doctor", "Prosthodontist", "Psychiatrist", "Psychologist", "Psychosomatic Medicine Specialist",
        "Psychotherapist", "Pulmonary Diseases and Critical Care Medicine Specialist", "Pulmonologist", "Radiation Oncologist",
        "Radiologist", "Refractive Surgeon", "Reproductive Endocrinologist", "Retina Specialist (Medical)",
        "Rheumatologist", "Shoulder & Elbow Surgeon", "Sinus Surgeon / Rhinologist", "Sleep Medicine Specialist",
        "Spine Specialist", "Sports Medicine Specialist", "Surgeon", "Travel Medicine Specialist", "Urgent Care Specialist",
        "Urological Surgeon", "Urologist", "Vascular Surgeon", "Women's Health Nurse Practitioner", "Addiction Specialist", 
        "Adult Nurse Practitioner", "Adult Psychiatric & Mental Health Nurse Practitioner",
    ]
    
    function handleSpecializationChange(specialization) {
        setActiveSpecialization(specialization)
    }

    function handleDateChange(newDate) {
        setDate(newDate)
        setShowCalendar(false)
    }
    
    function toggleCalendar() {
        setShowCalendar(!showCalendar)
    }

    function handleAppointmentTypeChange(newType) {
        setAppointmentType(newType)
        setShowAppointmentType(false)
        console.log(appointmentType)
    }

    function toggleAppointmentType() {
        setShowAppointmentType(!showAppointmentType)
    }

    function handleDoctorsList() {
        setShowDoctorsList(true)
    }


    return (
        <div className='no-select h-auto mx-[3rem] my-[1rem]'>
            <Navbar />

            <div className='bg-gray-100 text-gray-800 w-full h-[57vh] rounded-2xl flex flex-col items-center justify-start shadow-md'>
                <div className='relative w-full px-8 py-4'>
                    <div className='bg-emerald-600 mt-4 p-8 w-full h-[35vh] flex items-start justify-center rounded-2xl shadow-md'>
                        <div className='flex items-center'>
                            <span className='text-white text-4xl font-medium w-2/5 mx-4 leading-relaxed'>Easy Steps To Get Your Solution</span>
                            <span className='text-white text-lg font-thin w-2/5 text-center px-4'>Easily book your appointment with our expert doctors for your family in the same day or next day</span>
                            <div className='bg-white text-emerald-600 mx-8 py-4 text-md w-1/5 text-center rounded-2xl shadow-lg'>Make an Appointment</div>
                        </div>
                    </div>
                    
                    <div className='absolute top-48 w-[85vw] right-14 flex items-center justify-center'>
                        <div className='bg-white w-1/4 h-[30vh] mx-4 py-8 px-6 flex flex-col items-center rounded-2xl shadow-md'>
                            <div className='bg-emerald-300 p-4 mb-4 w-fit rounded-xl'>
                                <FaUserMd size={24} color='white' />
                            </div>
                            <span className='text-lg font-semibold'>Search Doctor</span>
                            <span className='font-thin text-center'>Before booking an appointment, search doctors based on their specialization, location, and availability</span>
                        </div>
                        <div className='bg-white w-1/4 h-[30vh] mx-4 py-8 px-6 flex flex-col items-center rounded-2xl shadow-md'>
                            <div className='bg-emerald-300 p-4 mb-4 w-fit rounded-xl'>
                                <FaMapMarkerAlt size={24} color='white' />
                            </div>
                            <span className='text-lg font-semibold'>Choose Your Location</span>
                            <span className='font-thin text-center'>Then enter your location, and we will help find the appointment nearby</span>
                        </div>
                        <div className='bg-white w-1/4 h-[30vh] mx-4 py-8 px-6 flex flex-col items-center rounded-2xl shadow-md'>
                            <div className='bg-emerald-300 p-4 mb-4 w-fit rounded-xl'>
                                <FaCalendarAlt size={24} color='white' />
                            </div>
                            <span className='text-lg font-semibold'>Schedule Appointment</span>
                            <span className='font-thin text-center'>Then enter your location, and we will help find the appointment nearby</span>
                        </div>
                        <div className='bg-white w-1/4 h-[30vh] mx-4 py-8 px-6 flex flex-col items-center rounded-2xl shadow-md'>
                            <div className='bg-emerald-300 p-4 mb-4 w-fit rounded-xl'>
                                <FaLightbulb size={24} color='white' />
                            </div>
                            <span className='text-lg font-semibold'>Get Your Solution</span>
                            <span className='font-thin text-center'>We will help you find and provide solutions for your health</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-gray-100 h-auto mt-[1rem] py-[1.5rem] px-[2rem] rounded-t-2xl'>
                <div className='bg-white text-gray-800 w-full py-4 mb-4 rounded-2xl flex flex-col items-center justify-center shadow-md'>
                    <div className='py-2 mt-2 w-[90%] flex items-center'>
                        <span className='text-2xl w-2/6'>Search Doctors and Clinics</span>
                        <ul className='no-scrollbar text-xl w-4/6 px-4 flex overflow-x-auto'>
                            { specializations.map((specialization) => (
                                <li 
                                    key={specialization} 
                                    className={`text-gray-500 px-4 py-2 flex items-center border-b-4 ${activeSpecialization === specialization ? 'bg-emerald-100 text-emerald-700 border-emerald-600 rounded-t-md shadow-md' : 'border-transparent'} whitespace-nowrap cursor-pointer`}
                                    onClick={() => handleSpecializationChange(specialization)}
                                >
                                    {specialization}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='py-2 my-2 w-[90%] flex items-center justify-between'>
                        <div className='w-1/4 py-2 px-6 mr-6 flex items-center border rounded-2xl shadow-md'>
                            <div className='bg-emerald-600 rounded-3xl w-10 h-10 flex items-center justify-center'>
                                <FaMapMarkerAlt size={24} color='white' />
                            </div>
                            <div className='ml-4 flex flex-col'>
                                <span className='text-gray-400 text-sm'>Location</span>
                                <span  className='text-md'>Wakad, Pune</span>
                            </div>
                        </div>
                        <div className='relative w-1/4 py-2 px-4 mr-6 flex items-center border rounded-2xl shadow-md cursor-pointer'>
                            <div className='rounded-3xl w-10 h-10 flex items-center justify-center border border-emerald-600' onClick={toggleCalendar}>
                                    <FaCalendarAlt size={24} color='#569c72' />
                            </div>
                            <div className='ml-4 flex flex-col' onClick={toggleCalendar}>
                                <span className='text-gray-400 text-sm'>Appointment date</span>
                                <span className='text-md'>{date.toDateString()}</span>
                            </div>
                            {showCalendar && (
                                <div
                                    className="absolute top-full mt-2 left-0 z-50 bg-white shadow-lg rounded-lg p-4"
                                    style={{ width: '300px' }}
                                >
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={date}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='relative w-1/4 py-2 px-6 mr-6 flex items-center border rounded-2xl shadow-md cursor-pointer'>
                            <div className='rounded-3xl w-10 h-10 flex items-center justify-center border border-emerald-600' onClick={toggleAppointmentType}>
                                {appointmentType === 'Clinic Appointment' ? <FaHospital size={24} color='#569c72' /> : <FaHome size={24} color='#569c72' /> }
                            </div>
                            <div className='ml-4 flex flex-col' onClick={toggleAppointmentType}>
                                <span className='text-gray-400 text-sm'>Appointment Type</span>
                                <span  className='text-md'>{appointmentType}</span>
                            </div>
                            {showAppointmentType && (
                                <div className="absolute top-full mt-2 left-0 z-50 bg-white shadow-lg rounded-lg p-4">
                                    {['Clinic Appointment', 'Doorstep Appointment'].map((option) => (
                                        <div
                                            key={option}
                                            className="px-4 py-2 hover:bg-emerald-100 cursor-pointer"
                                            onClick={() => handleAppointmentTypeChange(option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='bg-emerald-600 text-white w-1/4 py-4 px-6 mr-6 flex items-center justify-center border rounded-2xl shadow-md cursor-pointer' onClick={handleDoctorsList}>
                            <BiSearch size={24} color='white' />
                            <span className='text-lg ml-2'>Search</span>
                        </div>
                    </div>
                </div>

                <DoctorsList activeSpecialization={activeSpecialization} showDoctorsList={showDoctorsList} /> 







                <div className='specialist'>
                    <div className='section-title'>Specialists:</div>
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
                <div className='section-title'>Clinics:</div>
                <MapComponent />
                <div className='appointment-container'>
                    <div className='section-title'>Appointment Schedule:</div>
                    <form action="">
                        <input type="text" placeholder='Patient Name' />
                        <input type="text" placeholder='Patient Phone Number' />
                        <select id="time" name="time">
                            <option value="morning">9:00am - 10:00am</option>
                            <option value="noon">11:00am - 12:00pm</option>
                            <option value="evening">3:00pm - 5:00pm</option>
                            <option value="night">6:00pm - 8:00pm</option>
                        </select>
                        <button type="submit">Confirm Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FindDoctor