import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Items from '../components/Items';
import DoctorCard from '../components/DoctorCard';
import MapComponent from '../components/MapComponent';

function FindDoctor() {
    const [selectedBanner, setSelectedBanner] = useState(null); // State for banner selection
    const [allDoctors, setAllDoctors] = useState([]); // State for all doctors
    const [filteredDoctors, setFilteredDoctors] = useState([]); // State for filtered doctors
    const [isSelected, setIsSelected] = useState('All'); // Default selected specialization

    // Fetch all doctors on component mount
    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/doctors`);
                const data = await response.json();
                if (data.success) {
                    setAllDoctors(data.doctors); // Use the `doctors` array from the response
                    setFilteredDoctors(data.doctors); // Initially set filtered doctors to all doctors
                } else {
                    console.error('Failed to fetch doctors:', data.message);
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        }
        fetchDoctors();
    }, []);

    // Handle specialist item click
    function handleItemClick(specialist) {
        setIsSelected(specialist);
        // Filter doctors based on selected specialization
        if (specialist === 'All') {
            setFilteredDoctors(allDoctors);
        } else {
            const filtered = allDoctors.filter(
                doctor => doctor.specialization === specialist
            );
            setFilteredDoctors(filtered);
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
                {/* Clinic and Doorstep banners */}
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
                            filteredDoctors.map((doctor, index) => {
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
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/default_image.jpg';
                                        }}
                                    />
                                );
                            })
                        ) : (
                            <div>No doctors found for the selected specialization.</div>
                        )}
                    </div>
                </div>

                <div className="section-title">Clinics:</div>
                {/* Pass filtered doctors to MapComponent */}
                <MapComponent
                    doctors={filteredDoctors.map((doctor) => ({
                        name: doctor.name,
                        specialization: doctor.specialization,
                        latitude: doctor.latitude || 0, // Default to 0 if missing
                        longitude: doctor.longitude || 0, // Default to 0 if missing
                    }))}
                />

                <div className="appointment-container">
                    <div className="section-title">Appointment Schedule:</div>
                    <form>
                        <input type="text" placeholder="Patient Name" required />
                        <input type="text" placeholder="Patient Phone Number" required />
                        <select id="time" name="time" required>
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
    );
}

export default FindDoctor;
