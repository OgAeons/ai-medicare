import { useState, useEffect } from 'react'
import { useLocation } from '../services/LocationContext'
import axios from 'axios'
import MapComponent from './MapComponent'

function DoctorsList({ activeSpecialization, showDoctorsList, onAppointmentBooked }) {
    const { location } = useLocation()
    const [doctors, setDoctors] = useState([])
    const maxDistance = 10    // Maximum distance in kilometers to consider a doctor as "nearby"

    useEffect(() => {
        if (activeSpecialization) {
            setDoctors([])
            axios
                .get(`http://127.0.0.1:5000/doctors?specialization=${activeSpecialization}`)
                .then((response) => {
                    if (response.data.success && Array.isArray(response.data.data)) {
                        const nearbyDoctors = response.data.data.filter((doctor) => {
                            console.log(response.data)
                            const distance = calculateDistance(
                                location.latitude,
                                location.longitude,
                                doctor.latitude,
                                doctor.longitude
                            )
                            return distance <= maxDistance
                        })
                        setDoctors(nearbyDoctors)
                    } else {
                        console.error("Unexpected response:", response.data)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching doctors:", error)
                })
        }
    }, [activeSpecialization, location])

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of Earth in kilometers
        const dLat = degToRad(lat2 - lat1);
        const dLon = degToRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    }

    function degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    function handleBookAppointment(doctorName, doctorSpecialization, doctorAddress, doctorPhone, doctorFees) {
        onAppointmentBooked(doctorName, doctorSpecialization, doctorAddress, doctorPhone, doctorFees)
    }

    const doctorsForMap = doctors.map((doctor) => ({
        name: doctor.name,
        specialization: doctor.specialization,
        latitude: doctor.latitude,
        longitude: doctor.longitude,
        clinicAddress: doctor.clinicAddress, 
        consultationFees: doctor.consultationFees, 
        contactNumber: doctor.contactNumber, 
    }))

    return (
        <div>
            <div className="mt-4 mb-12">
                <h2 className="text-emerald-600 text-3xl font-semibold mb-4 mt-8">Doctors Available</h2>
                {showDoctorsList === false ? (
                    <p className="h-[50vh]">Please select the speciality, appointment date, and appointment type.</p>
                ) : (
                    <ul className="space-y-4 h-[50vh] overflow-y-auto">
                        {doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <li
                                    key={doctor.name} // Using name as a unique key
                                    className="p-4 border rounded-lg shadow-md flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold">{doctor.name}</h3>
                                        <p>Specialization: {doctor.specialization || "Unknown"}</p>
                                        <p>Clinic Address: {doctor.clinicAddress}</p>
                                        <p>Contact Number: {doctor.contactNumber}</p>
                                        <p>Consultation Fees: ₹{doctor.consultationFees}</p>
                                    </div>
                                    <button
                                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => handleBookAppointment(doctor.name, doctor.specialization, doctor.clinicAddress, doctor.contactNumber, doctor.consultationFees)}
                                    >
                                        Book Appointment
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No doctors found nearby for the selected specialization.</p>
                        )}
                    </ul>
                )}
            </div>

            <h2 className="text-emerald-600 text-3xl font-semibold mb-6 mt-8">Nearby Hospitals, Clinics and Labs</h2>
            {showDoctorsList === false ? (
                <p className="h-[50vh]">Please select the speciality, appointment date, and appointment type.</p>
            ) : (
                <MapComponent doctors={doctorsForMap} />
            )}
        </div>
    )
}

export default DoctorsList
