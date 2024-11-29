// components/Appointments.js
import React from "react";

const Appointments = () => {
    const appointments = [
        { type: "Dentist", doctor: "Dr. Gorex Mathew", time: "9 AM" },
        { type: "Cardiologist", doctor: "Dr. Craig Gemx", time: "12 AM" },
        { type: "Orthopedist", doctor: "Dr. Bruce Williams", time: "3 PM" },
        { type: "Physician", doctor: "Dr. Kiera Knight", time: "4 PM" },
        { type: "Endocrinologist", doctor: "Dr. Anni Roy", time: "6 PM" },
    ];

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-md text-black w-[35rem] h-[20rem] ml-[250px]">
            <h4 className="text-lg font-bold mb-4 text-white">Doctor Appointments</h4>
            <ul className="space-y-4">
                {appointments.map((appointment, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                        <div>
                            <span className="block font-bold text-blue-600">{appointment.type}</span>
                            <p className="text-sm text-gray-600">{appointment.doctor}</p>
                        </div>
                        <time className="text-sm text-gray-500">{appointment.time}</time>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;
