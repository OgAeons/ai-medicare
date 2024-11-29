import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const hospitalIcon = new L.DivIcon({
    className: 'hospital-icon',
    html: `<i class="fas fa-hospital" style="font-size: 30px; color: red;"></i>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const clinicIcon = new L.DivIcon({
    className: 'clinic-icon',
    html: `<i class="fas fa-clinic-medical" style="font-size: 30px; color: green;"></i>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const labIcon = new L.DivIcon({
    className: 'lab-icon',
    html: `<i class="fas fa-flask" style="font-size: 30px; color: blue;"></i>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

const doctorIcon = new L.DivIcon({
    className: 'doctor-icon',
    html: `<i class="fas fa-user-md" style="font-size: 30px; color: purple;"></i>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

function MapComponent({ doctors, labs}) {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    // Set default location (e.g., Pune)
                    setLocation({ latitude: 18.62020527766368, longitude: 73.74704984206268 });
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    if (!location.latitude || !location.longitude) {
        return <div>Loading...</div>;
    }

    const handleMarkerClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="flex h-[50vh] w-full">
            <div className={`transition-all duration-300 ${selectedItem ? 'w-[70%]' : 'w-full'}`}>
                <MapContainer
                    center={[location.latitude, location.longitude]}
                    zoom={13}
                    className="h-full w-full"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* Marker for User Location */}
                    <Marker position={[location.latitude, location.longitude]}>
                        <Popup>Your Current Location</Popup>
                    </Marker>

                    {/* Markers for Doctors or Labs */}
                    {doctors &&
                        doctors.map((doctor, index) => (
                            <Marker
                                key={index}
                                position={[doctor.latitude, doctor.longitude]}
                                icon={doctorIcon}
                                eventHandlers={{
                                    click: () => handleMarkerClick(doctor),
                                }}
                            >
                                <Popup>{doctor.name}</Popup>
                            </Marker>
                        ))}

                    {labs &&
                        labs.map((lab, index) => (
                            <Marker
                                key={index}
                                position={[lab.latitude, lab.longitude]}
                                icon={labIcon}
                                eventHandlers={{
                                    click: () => handleMarkerClick(lab),
                                }}
                            >
                                <Popup>{lab.name}</Popup>
                            </Marker>
                        ))}
                </MapContainer>
            </div>

            {/* Sidebar for Selected Item (Doctor or Lab) */}
            {selectedItem && (
                <div className="w-[30%] bg-white p-4 shadow-md">
                    <button
                        className="text-red-600 text-sm mb-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        Close
                    </button>
                    <h3 className="text-xl font-semibold">{selectedItem.name}</h3>
                    {selectedItem.specialization && (
                        <p>
                            <strong>Specialization:</strong> {selectedItem.specialization}
                        </p>
                    )}
                    {selectedItem.availableTest && (
                        <p>
                            <strong>Available Tests:</strong> {selectedItem.availableTest}
                        </p>
                    )}
                    {selectedItem.clinicAddress && (
                        <p>
                            <strong>Address:</strong> {selectedItem.clinicAddress}
                        </p>
                    )}
                    {selectedItem.address && (
                        <p>
                            <strong>Address:</strong> {selectedItem.address}
                        </p>
                    )}
                    {selectedItem.contactNumber && (
                        <p>
                            <strong>Contact:</strong> {selectedItem.contactNumber}
                        </p>
                    )}
                    {selectedItem.contact && (
                        <p>
                            <strong>Contact:</strong> {selectedItem.contact}
                        </p>
                    )}
                    {selectedItem.consultationFees && (
                        <p>
                            <strong>Fees:</strong> ₹{selectedItem.consultationFees}
                        </p>
                    )}
                    {selectedItem.fees && (
                        <p>
                            <strong>Fees:</strong> ₹{selectedItem.fees}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MapComponent;
