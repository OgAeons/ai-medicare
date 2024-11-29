// components/Sidebar.js
import React from "react";

const Sidebar = () => {
    return (
        <div className="w-[250px] p-[1rem] h-screen bg-gradient-to-b from-[#0f172a] to-[#1f51a3] text-white fixed top-0 left-0">
            <div>
                <h2 className=' text-5xl mb-[2rem] hover:font-bold cursor-pointer hover:text-slate-500 font-mono'>Aim</h2>
                <ul className="space-y-4">
                    <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'>Overview</li>
                    <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'>Doctors</li>
                    <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'>History</li>
                    <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'>Analyzes</li>
                    <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'>Messages</li>
                    <li className='flex text-white mb-2 rounded-xl hover:bg-gray-700 cursor-pointer pl-4 pb-2 pt-2 hover:font-semibold'>Departments</li>
                </ul>
            </div>
            <div className=' bg-red-500 rounded-lg mt-2'>
                <button className='flex text-white mb-2 rounded-xl hover:bg-red-600 cursor-pointer pl-4 pb-2 pt-2 pr-[8.9rem] hover:font-semibold mt-[7rem]'>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
