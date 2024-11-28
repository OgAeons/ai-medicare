import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Location from '../services/Location';

function MapComponent({ doctors }) {
    const [userLocation, setUserLocation] = useState(null);

    const handleLocationChange = (locationData) => {
        setUserLocation(locationData);
    };

    const customIcon = new Icon({
        iconUrl: '/icons/pin2.png',
        iconSize: [38, 38],
    });

    const userLocationIcon = new Icon({
        iconUrl: '/icons/user-pin.png',
        iconSize: [38, 38],
    });

    return (
        <div className="map">
            {userLocation ? (
                <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={16}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {doctors.map((doctor, index) => {
                        // Ensure valid latitude and longitude
                        const { latitude, longitude, name, specialization, address } = doctor;
                        if (!latitude || !longitude) return null;

                        return (
                            <Marker
                                key={index}
                                position={[latitude, longitude]}
                                icon={customIcon}
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
            <Location onLocationChange={handleLocationChange} />
        </div>
    );
}

export default MapComponent;
