import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [markers, setMarkers] = useState([]);

  // Fetch user's current location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location:', latitude, longitude); // Log the coordinates
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocation({ latitude: 19.0760, longitude: 72.8777 }); // Default location (Mumbai) if geolocation fails
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Simulate fetching nearby places (this can be replaced with a real API call)
  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      const places = [
        { lat: 19.0760, lon: 72.8777, name: 'Nearby Hospital' },
        { lat: 19.0880, lon: 72.8890, name: 'Nearby Clinic' },
        { lat: 19.0950, lon: 72.8900, name: 'Nearby Doctor' },
        { lat: 19.0800, lon: 72.8800, name: 'Nearby Lab Test Clinic' },
      ];
      setMarkers(places);
    };

    if (location.latitude && location.longitude) {
      fetchNearbyPlaces();
    }
  }, [location]);

  // Return null or a loading spinner until the location is available
  if (!location.latitude || !location.longitude) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-[50vh] w-full overflow-auto'>
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker for User Location */}
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>Your Current Location</Popup>
        </Marker>

        {/* Markers for Nearby Places */}
        {markers.map((place, index) => (
          <Marker key={index} position={[place.lat, place.lon]}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
