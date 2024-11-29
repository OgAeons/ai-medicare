import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaMapMarkerAlt, FaCalendarAlt, FaFlask, FaBabyCarriage, FaUserMd, FaLightbulb } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import LabsList from '../components/LabsList';
import { useLocation } from '../services/LocationContext';
import UserLocation from '../services/UserLocation';
import TestConfirmation from '../components/TestConfirmation';

function LabTests() {
  const { location } = useLocation();
  const [activeTest, setActiveTest] = useState('All Tests');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [appointmentGender, setAppointmentGender] = useState('Adult Male');
  const [showAppointmentGender, setShowAppointmentGender] = useState(false);
  const [showLabsList, setShowLabsList] = useState(false);
  const [showLocationFetch, setShowLocationFetch] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    labName: '',
    date: '',
    appointmentType: '',
    tests: '',
    labAddress: '',
    labPhone: '',
    labFees: '',
  });
  const [showAppointmentConfirmation, setShowAppointmentConfirmation] = useState(false);

  const tests = [
    'All Tests',
    'Full Body Check-up',
    'Diabetes',
    'Heart',
    'Cancer',
    'Vitamin',
    'Women Health',
    'Skin Care',
    'Liver',
    'Stress',
  ];

  function handleTestsChange(test) {
    setActiveTest(test);
  }

  function handleDateChange(newDate) {
    setDate(newDate);
    setShowCalendar(false);
  }

  function toggleCalendar() {
    setShowCalendar(!showCalendar);
  }

  function handleAppointmentGenderChange(newGender) {
    setAppointmentGender(newGender);
    setShowAppointmentGender(false);
  }

  function toggleAppointmentGender() {
    setShowAppointmentGender(!showAppointmentGender);
  }

  async function handleSearch() {
    setShowLabsList(true);
  }

  function handleAppointmentBooking(labName, labTests, labAddress, labPhone, testFees) {
    setAppointmentDetails({
        labName,
        labTests,
        date: date.toDateString(),
        appointmentType: appointmentGender,
        labAddress,
        labPhone,
        testFees,
    });

    setShowAppointmentConfirmation(true);
  }

  function toggleLocationDetails() {
    setShowLocationFetch(!showLocationFetch);
  }

  return (
    <div className='no-select h-auto mx-[3rem] my-[1rem]'>
      <Navbar />

      <div className='relative text-gray-800 w-full h-[57vh] mt-6 rounded-2xl flex flex-col items-center justify-start shadow-md'>
        <div className='bg-emerald-600 p-8 w-full h-[43vh] flex items-start justify-center rounded-2xl shadow-md'>
          <div className='flex items-center'>
            <span className='text-white text-4xl font-medium w-2/5 mx-4 leading-relaxed'>
              Easy Steps To Get Yourself Examined
            </span>
            <span className='text-white text-lg font-thin w-2/5 text-center pr-16'>
              Easily book your appointment with our expert test labs for your family in the same day or next day
            </span>
            <a href='/symptoms' className='bg-white text-emerald-600 mx-8 py-4 text-md w-1/5 text-center rounded-2xl shadow-lg'>
              Test Recommendations
            </a>
          </div>
        </div>

        <div className='absolute top-48 w-[90vw] right-5 flex items-center justify-center'>
            <div className='bg-white w-1/4 h-[30vh] mx-4 py-8 px-6 flex flex-col items-center rounded-2xl shadow-md'>
                <div className='bg-emerald-300 p-4 mb-4 w-fit rounded-xl'>
                    <FaFlask size={24} color='white' />
                </div>
                <span className='text-lg font-semibold'>Symptom Analyzer</span>
                <span className='font-thin text-center'>Before booking an appointment, use our symptom analyzer so that you get the knowledge of what tests you should take</span>
            </div>
            <div className='bg-white w-1/4 h-[30vh] mx-4 py-8 px-6 flex flex-col items-center rounded-2xl shadow-md'>
                <div className='bg-emerald-300 p-4 mb-4 w-fit rounded-xl'>
                    <FaMapMarkerAlt size={24} color='white' />
                </div>
                <span className='text-lg font-semibold'>Choose Your Location</span>
                <span className='font-thin text-center'>Then enter your location, and we will help find the test appointment nearby</span>
            </div>
            <div className='bg-white w-1/4 h-[30vh] mx-4 py-8 px-6 flex flex-col items-center rounded-2xl shadow-md'>
                <div className='bg-emerald-300 p-4 mb-4 w-fit rounded-xl'>
                    <FaCalendarAlt size={24} color='white' />
                </div>
                <span className='text-lg font-semibold'>Schedule Appointment</span>
                <span className='font-thin text-center'>Then select the appointnment date, and you your appointment on the same day or the next day</span>
            </div>
            <div className='bg-white w-1/4 h-[30vh] mx-4 py-8 px-6 flex flex-col items-center rounded-2xl shadow-md'>
                <div className='bg-emerald-300 p-4 mb-4 w-fit rounded-xl'>
                    <FaLightbulb size={24} color='white' />
                </div>
                <span className='text-lg font-semibold'>Get Examined, Stay Safe</span>
                <span className='font-thin text-center'>We will help you find and provide solutions for your health</span>
            </div>
        </div>
      </div>

      <div id='make-appointment' className='bg-gray-100 h-auto py-[1.5rem] px-[2rem] rounded-t-2xl'>
        <div className='bg-white text-gray-800 w-full py-4 mb-4 rounded-2xl flex flex-col items-center justify-center shadow-md'>
          <div className='py-2 mt-2 w-[90%] flex items-center'>
            <span className='text-2xl w-2/6'>Search Health Tests</span>
            <ul className='no-scrollbar text-xl w-4/6 px-4 flex overflow-x-auto'>
              {tests.map((test) => (
                <li
                  key={test}
                  className={`text-gray-500 px-4 py-2 flex items-center border-b-4 ${
                    activeTest === test ? 'bg-emerald-100 text-emerald-700 border-emerald-600 rounded-t-md shadow-md' : 'border-transparent'
                  } whitespace-nowrap cursor-pointer`}
                  onClick={() => handleTestsChange(test)}
                >
                  {test}
                </li>
              ))}
            </ul>
          </div>

          <div className='py-2 my-2 w-[90%] flex items-center justify-between'>
            <div className='relative w-1/4 py-2 px-6 mr-6 flex items-center border rounded-2xl shadow-md'>
              <div className='bg-emerald-600 rounded-3xl w-10 h-10 flex items-center justify-center' onClick={toggleLocationDetails}>
                <FaMapMarkerAlt size={24} color='white' />
              </div>
              <div className='ml-4 flex flex-col' onClick={toggleLocationDetails}>
                <span className='text-gray-400 text-sm'>Location</span>
                <div className='text-md overflow-x-auto'>
                  {location ? <p>{location.area}</p> : <p>Loading location...</p>}
                </div>
              </div>
              {showLocationFetch && (
                <div className='absolute top-full mt-2 left-0 z-50 bg-white shadow-lg rounded-lg p-4'>
                  <UserLocation />
                </div>
              )}
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
                  className='absolute top-full mt-2 left-0 z-50 bg-white shadow-lg rounded-lg p-4'
                  style={{ width: '300px' }}
                >
                  <Calendar onChange={handleDateChange} value={date} minDate={new Date()} />
                </div>
              )}
            </div>
            <div className='relative w-1/4 py-2 px-6 mr-6 flex items-center border rounded-2xl shadow-md cursor-pointer'>
              <div className='rounded-3xl w-10 h-10 flex items-center justify-center border border-emerald-600' onClick={toggleAppointmentGender}>
                {appointmentGender === 'Kids' ? <FaBabyCarriage size={24} color='#569c72' /> : <FaUserMd size={24} color='#569c72' />}
              </div>
              <div className='ml-4 flex flex-col' onClick={toggleAppointmentGender}>
                <span className='text-gray-400 text-sm'>Age Group</span>
                <span className='text-md'>{appointmentGender}</span>
              </div>
              {showAppointmentGender && (
                <div className='absolute top-full mt-2 left-0 z-50 bg-white shadow-lg rounded-lg p-4'>
                  {['Adult Male', 'Adult Female', 'Kids'].map((option) => (
                    <div key={option} className='px-4 py-2 hover:bg-emerald-100 cursor-pointer' onClick={() => handleAppointmentGenderChange(option)}>
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='bg-emerald-600 text-white w-1/4 py-4 px-6 mr-6 flex items-center justify-center border rounded-2xl shadow-md cursor-pointer' onClick={handleSearch}>
              <BiSearch size={24} />
              <span className='ml-4 text-lg font-semibold'>Search</span>
            </div>
          </div>
        </div>

        <LabsList
            activeTest={activeTest}
            showLabsList={showLabsList}
            onAppointmentBooked={(labName, labTests, labAddress, labPhone, testFees) =>
                handleAppointmentBooking(labName, labTests, labAddress, labPhone, testFees)
            }
        />
        <TestConfirmation
            show={showAppointmentConfirmation}
            onClose={() => setShowAppointmentConfirmation(false)}
            appointmentDetails={appointmentDetails}
        />
      </div>
    </div>
  );
}

export default LabTests;
