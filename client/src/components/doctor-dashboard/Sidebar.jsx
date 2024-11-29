import React from 'react';
import { FaCalendarAlt, FaUserMd, FaUser, FaFileAlt, FaEnvelope, FaPrescriptionBottle, FaSignInAlt, FaTachometerAlt, FaQuestionCircle } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <aside className="w-[250px] p-[1rem] h-screen bg-gradient-to-b from-[#0f172a] to-[#1f51a3] text-white fixed top-0 left-0">
            <div className=' text-5xl mb-[2rem] hover:font-bold cursor-pointer hover:text-slate-500 font-mono'>Aim</div>
            <ul style={styles.navLinks} className='flex-grow'>
                <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'><FaTachometerAlt className='mr-3 mt-1' />Overview</li>
                <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'><FaCalendarAlt className='mr-3 mt-1' />  Appointments</li>
                <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'><FaUserMd className='mr-3 mt-1' /> Doctors</li>
                <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'><FaUser className='mr-3 mt-1' /> Patients</li>
                <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'><FaFileAlt className='mr-3 mt-1' /> Reports</li>
                <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'><FaEnvelope className='mr-3 mt-1' /> Messages</li>
                <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'><FaPrescriptionBottle className='mr-3 mt-1' /> Prescriptions</li>
                <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold' onClick={() => {
                    alert("Are you sure you want to log out?")
                }}><FaSignInAlt className='mr-3 mt-1' /> Log out</li>
                <div className='bg-slate-600 rounded-lg'>
                    <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold mt-[7rem]'><FaQuestionCircle className='mr-3 mt-1' /> Help Center</li>
                </div>
            </ul>
        </aside>
    );
};

const styles = {

    // logo: {
    //     fontSize: '24px',
    //     fontWeight: 'bold',
    //     marginBottom: '2rem',
    // },
    navLinks: {
        listStyle: 'none',
        padding: 0,
    },
    link: {
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        cursor: 'pointer',
    },
};

export default Sidebar;
