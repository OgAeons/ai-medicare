import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Location from '../services/Location';

function MapComponent({ doctors, onPinHover, onPinLeave }) {
    const [userLocation, setUserLocation] = useState(null);
    const [nearestDoctorId, setNearestDoctorId] = useState(null);

    // Define custom icons for normal and nearest doctor
    const customIcon = new Icon({
        iconUrl: '/icons/pin2.png',
        iconSize: [38, 38],
    });

    const userLocationIcon = new Icon({
        iconUrl: '/icons/user-pin.png',
        iconSize: [38, 38],
    });

    const nearestDoctorIcon = new Icon({
        iconUrl: '/icons/golden-pin.png', // Ensure this is the correct path to your golden pin image
        iconSize: [45, 45],
    });

    // Calculate nearest doctor based on user location
    useEffect(() => {
        if (!userLocation || !doctors.length) return;

        let closestDoctor = null;
        let minDistance = Infinity;

        // Loop through all doctors and calculate their distance from the user
        doctors.forEach((doctor) => {
            const { latitude, longitude } = doctor;
            if (!latitude || !longitude) return;

            // Use Haversine formula or simplified distance calculation
            const distance = Math.sqrt(
                Math.pow(latitude - userLocation.latitude, 2) +
                Math.pow(longitude - userLocation.longitude, 2)
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestDoctor = doctor.name;
            }
        });

        // Set the nearest doctor's ID
        setNearestDoctorId(closestDoctor);
    }, [userLocation, doctors]);

    return (
        <div className="map">
            {userLocation ? (
                <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={16}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {doctors.map((doctor, index) => {
                        const { latitude, longitude, name, specialization, address } = doctor;
                        if (!latitude || !longitude) return null;

                        return (
                            <Marker
                                key={index}
                                position={[latitude, longitude]}
                                icon={name === nearestDoctorId ? nearestDoctorIcon : customIcon}
                                eventHandlers={{
                                    mouseover: () => onPinHover(name),
                                    mouseout: onPinLeave,
                                }}
                            >
                                <Popup>
                                    <strong>{name}</strong>
                                    <br />
                                    <em>{specialization}</em>
                                    <br />
                                    {address || 'Address not available'}
                                </Popup>
                            </Marker>
                        );
                    })}
                    <Marker
                        position={[userLocation.latitude, userLocation.longitude]}
                        icon={userLocationIcon}
                    >
                        <Popup>Your Location</Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>Loading map...</p>
            )}
            <Location onLocationChange={setUserLocation} />
        </div>
    );
}

export default MapComponent;
