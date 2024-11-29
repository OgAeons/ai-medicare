import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Items from '../components/Items';
import DoctorCard from '../components/DoctorCard';
import MapComponent from '../components/MapComponent';

function FindDoctor() {
    const [selectedBanner, setSelectedBanner] = useState(null);
    const [allDoctors, setAllDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSelected, setIsSelected] = useState('All');
    const [nearestDoctor, setNearestDoctor] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [hoveredDoctorId, setHoveredDoctorId] = useState(null);

    // Fetch all doctors on component mount
    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/doctors`);
                const data = await response.json();
                if (data.success) {
                    setAllDoctors(data.doctors);
                    setFilteredDoctors(data.doctors);
                    // Calculate nearest doctor when doctors are fetched
                    calculateNearestDoctor(data.doctors, userLocation);
                } else {
                    console.error('Failed to fetch doctors:', data.message);
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        }

        // Get user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => console.error('Error getting user location:', error)
        );

        fetchDoctors();
    }, []);

    // Calculate distance using Haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    // Find nearest doctor based on the current user location and filtered doctors
    function calculateNearestDoctor(doctors, location) {
        if (location && doctors.length > 0) {
            const nearest = doctors.reduce((closest, doctor) => {
                const distance = calculateDistance(
                    location.latitude,
                    location.longitude,
                    doctor.latitude,
                    doctor.longitude
                );
                return !closest || distance < closest.distance
                    ? { ...doctor, distance }
                    : closest;
            }, null);
            setNearestDoctor(nearest);
        } else {
            setNearestDoctor(null); // Reset nearest doctor if no doctors are available
        }
    }

    // Handle specialist item click
    function handleItemClick(specialist) {
        setIsSelected(specialist);

        if (specialist === 'All') {
            setFilteredDoctors(allDoctors);
            calculateNearestDoctor(allDoctors, userLocation);  // Recalculate nearest for all doctors
        } else {
            const filtered = allDoctors.filter(
                (doctor) => doctor.specialization === specialist
            );
            setFilteredDoctors(filtered);
            calculateNearestDoctor(filtered, userLocation);  // Recalculate nearest for filtered doctors
        }
    }

    // Handle banner click for clinic or doorstep
    function handleBannerClick(banner) {
        setSelectedBanner(banner);
    }

    return (
        <div className="home-container">
            <Navbar />
            <div className="doctor-banner-container">
                <div
                    className={`doctor-banner ${selectedBanner === 'clinic' ? 'selected-banner' : ''}`}
                    onClick={() => handleBannerClick('clinic')}
                >
                    Book an Appointment for In-Clinic consultation.
                </div>
                <div
                    className={`doctor-banner ${selectedBanner === 'doorstep' ? 'selected-banner' : ''}`}
                    onClick={() => handleBannerClick('doorstep')}
                >
                    Book an Appointment for Doorstep Checkup.
                </div>
            </div>
            <div className="bottom-container">
                <div className="specialist">
                    <div className="section-title">Specialists:</div>
                    <div className="item-container">
                        {[
                            'All',
                            'Cardiology',
                            'Dermatology',
                            'Gastroenterology',
                            'Neurology',
                            'Oncology',
                            'Pediatrics',
                            'Psychiatry',
                            'Surgery',
                            'Other',
                        ].map((specialist, index) => (
                            <Items
                                key={index}
                                name={specialist}
                                onClick={() => handleItemClick(specialist)}
                                isSelected={isSelected === specialist}
                            />
                        ))}
                    </div>
                    <div className="doctor-card-container">
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors
                                .filter((doctor) => !nearestDoctor || doctor.name !== nearestDoctor.name)
                                .map((doctor, index) => {
                                    const imgSrc = `http://localhost:5000/uploads/${doctor.name.replace(
                                        /[^a-zA-Z0-9]/g,
                                        '_'
                                    )}_${doctor.specialization.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
                                    return (
                                        <DoctorCard
                                            key={index}
                                            name={doctor.name}
                                            img={imgSrc}
                                            specialization={doctor.specialization}
                                            onMouseEnter={() => setHoveredDoctorId(doctor.name)}
                                            onMouseLeave={() => setHoveredDoctorId(null)}
                                            style={{
                                                backgroundColor:
                                                    hoveredDoctorId === doctor.name ? '#f0f8ff' : '',
                                            }}
                                        />
                                    );
                                })
                        ) : (
                            <div>No doctors found for the selected specialization.</div>
                        )}
                        {nearestDoctor && filteredDoctors.length > 0 && (
                            <div className="nearest-doctor">
                                <h3>Nearest Doctor:</h3>
                                <DoctorCard
                                    name={nearestDoctor.name}
                                    img={`http://localhost:5000/uploads/${nearestDoctor.name.replace(
                                        /[^a-zA-Z0-9]/g,
                                        '_'
                                    )}_${nearestDoctor.specialization.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`}
                                    specialization={nearestDoctor.specialization}
                                    distance={`${nearestDoctor.distance.toFixed(2)} km away`}
                                    onMouseEnter={() => setHoveredDoctorId(nearestDoctor.name)}
                                    onMouseLeave={() => setHoveredDoctorId(null)}
                                    style={{
                                        backgroundColor:
                                            hoveredDoctorId === nearestDoctor.name ? '#f0f8ff' : '',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="section-title">Clinics:</div>
                <MapComponent
                    doctors={filteredDoctors.map((doctor) => ({
                        name: doctor.name,
                        specialization: doctor.specialization,
                        latitude: doctor.latitude || 0,
                        longitude: doctor.longitude || 0,
                        isNearest: nearestDoctor && doctor.name === nearestDoctor.name,
                    }))}
                    onPinHover={(doctorName) => setHoveredDoctorId(doctorName)}
                    onPinLeave={() => setHoveredDoctorId(null)}
                />
            </div>
        </div>
    );
}

export default FindDoctor;
