import { useState, useEffect } from 'react'
import axios from 'axios'

function DoctorsList({ activeSpecialization, showDoctorsList }) {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    if (activeSpecialization) {
        setDoctors([])
        axios
            .get(`http://127.0.0.1:5000/api/doctors?speciality=${activeSpecialization}`)
            .then((response) => {
                console.log("API Response:", response)
                if (Array.isArray(response.data)) {
                    const fetchedDoctors = response.data.map((doctor) => ({
                        ...doctor,
                        working_hours: doctor.working_hours || getRandomWorkingHours(),
                    }))
                    setDoctors(fetchedDoctors);
                } else if (Array.isArray(response.data.data)) {
                    const fetchedDoctors = response.data.data.map((doctor) => ({
                        ...doctor,
                        working_hours: doctor.working_hours || getRandomWorkingHours(),
                    }))
                    setDoctors(fetchedDoctors)
                } else {
                    console.error("Unexpected response structure:", response.data)
                }
            })
            .catch((error) => {
                console.error("Error fetching doctors:", error)
            })
        }
    }, [activeSpecialization])

    function getRandomWorkingHours() {
        const startHour = Math.floor(Math.random() * (10 - 8 + 1)) + 8
        const endHour = startHour + Math.floor(Math.random() * (5 - 4 + 1)) + 4
        return `${startHour}:00 AM - ${endHour}:00 PM`
    }

    function handleBookAppointment(doctorName) {
        alert(`Appointment booked with Dr. ${doctorName}`)
    }

    return (
        <div className="mt-4">
            <h2 className="text-emerald-600 text-3xl font-semibold mb-4 mt-8">Doctors Available</h2>
            {showDoctorsList === false ? (
                <p>Please select the speciality, appointment date and appointment type.</p> 
            ) : (
                <ul className="space-y-4 h-[50vh] overflow-y-auto">
                    {doctors.map((doctor) => (
                    <li
                        key={doctor.id}
                        className="p-4 border rounded-lg shadow-md flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-bold">{doctor.name}</h3>
                            <p>Speciality: {doctor.speciality || "Unknown"}</p>
                            <p>Working Hours: {doctor.working_hours}</p>
                        </div>
                        <button
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => handleBookAppointment(doctor.name)}
                        >
                            Book Appointment
                        </button>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DoctorsList
