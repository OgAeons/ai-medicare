import { useState, useEffect } from 'react';
import { useLocation } from '../services/LocationContext';
import axios from 'axios';
import MapComponent from './MapComponent';

function LabsList({ activeTest, showLabsList, onAppointmentBooked }) {
    const { location } = useLocation();
    const [labs, setLabs] = useState([]);
    const maxDistance = 10; // Maximum distance in kilometers to consider a lab as "nearby"

    useEffect(() => {
        if (activeTest) {
            setLabs([]); // Clear existing labs
            axios
                .get(`http://127.0.0.1:5000/labs?tests=${activeTest}`)
                .then((response) => {
                    if (response.data.success && Array.isArray(response.data.data)) {
                        const nearbyLabs = response.data.data.filter((lab) => {
                            const distance = calculateDistance(
                                location.latitude,
                                location.longitude,
                                lab.Latitude,
                                lab.Longitude
                            );
                            return distance <= maxDistance;
                        });
                        setLabs(nearbyLabs);
                    } else {
                        console.error('Unexpected response:', response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching labs:', error);
                });
        }
    }, [activeTest, location]);

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

    function handleBookAppointment(labName, labTests, labAddress, labPhone, testFees) {
        onAppointmentBooked(labName, labTests, labAddress, labPhone, testFees);
    }

    const labsForMap = labs.map((lab) => ({
        name: lab.labName,
        latitude: lab.Latitude,
        longitude: lab.Longitude,
        address: lab.Address,
        contact: lab.contactNumber,
        fees: lab.Fees,
        availableTest: lab.tests,
    }));

    return (
        <div>
            <div className="mt-4 mb-12">
                <h2 className="text-blue-600 text-3xl font-semibold mb-4 mt-8">Labs Available</h2>
                {showLabsList === false ? (
                    <p className="h-[50vh]">Please select a test to view available labs.</p>
                ) : (
                    <ul className="space-y-4 h-[50vh] overflow-y-auto">
                        {labs.length > 0 ? (
                            labs.map((lab, index) => (
                                <li
                                    key={lab.labName} // Use a unique key
                                    className="p-4 border rounded-lg shadow-md flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold">{lab.labName}</h3>
                                        <p>Address: {lab.Address}</p>
                                        <p>Contact Number: {lab.contactNumber}</p>
                                        <p>Available Test: {lab.tests}</p>
                                        <p>Fees: ₹{lab.Fees}</p>
                                    </div>
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => handleBookAppointment(lab.labName, lab.Address, lab.contactNumber, lab.tests, lab.Fees)}
                                    >
                                        Book Appointment
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No labs found nearby for the selected test.</p>
                        )}
                    </ul>
                )}
            </div>

            <h2 className="text-blue-600 text-3xl font-semibold mb-6 mt-8">Nearby Labs on Map</h2>
            {showLabsList === false ? (
                <p className="h-[50vh]">Please select a test to view nearby labs.</p>
            ) : (
                <MapComponent labs={labsForMap} />
            )}
        </div>
    );
}

export default LabsList;
