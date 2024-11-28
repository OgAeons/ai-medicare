import React, { useState } from 'react'
import { useLocation } from '../services/LocationContext'

// Geocode address to get coordinates and area name
const geocodeAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            const { lat, lon, display_name } = data[0];
            return { latitude: parseFloat(lat), longitude: parseFloat(lon), area: display_name };
        }
        throw new Error('Address not found');
    } catch (error) {
        console.error('Error geocoding address:', error);
        throw new Error('Unable to geocode the address.');
    }
};

// Reverse geocode to get area name from coordinates
const reverseGeocode = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const area = data?.address?.city || data?.address?.suburb || data?.address?.state || 'Unknown Area';
        return area;
    } catch (error) {
        console.error('Error in reverse geocoding:', error);
        return 'Unknown Area';
    }
};

function UserLocation() {
    const { updateLocation } = useLocation();
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const area = await reverseGeocode(latitude, longitude); // Get area name
                        console.log(`Current Location: Latitude: ${latitude}, Longitude: ${longitude}, Area: ${area}`);
                        updateLocation({ latitude, longitude, area });
                    } catch (err) {
                        setError('Unable to fetch area for current location.');
                        console.error(err);
                    }
                },
                () => {
                    setError('Unable to access your location. Please provide an address.');
                    console.error('Geolocation access denied');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            console.error('Geolocation is not supported');
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const coords = await geocodeAddress(address);
            const { latitude, longitude, area } = coords;
            console.log(`Address Location: Latitude: ${latitude}, Longitude: ${longitude}, Area: ${area}`);
            updateLocation({ latitude, longitude, area });
        } catch (err) {
            setError(err.message);
            console.error(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 z-60">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={getCurrentLocation}
            >
                Use Current Location
            </button>
            <p className="text-gray-500 mt-2">or enter your address:</p>
            <form onSubmit={handleAddressSubmit} className="mt-2 flex flex-col">
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="border p-2 rounded w-72"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
                >
                    Submit Address
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

export default UserLocation;
