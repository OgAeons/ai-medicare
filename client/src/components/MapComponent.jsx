import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Location from '../services/Location';

function MapComponent() {
    const [userLocation, setUserLocation] = useState(null); 

    const handleLocationChange = (locationData) => {
        setUserLocation(locationData);
    };

    const markers = [
        {
            geocode: [18.619893726057885, 73.74988316737976],
            popUp: 'JSPMs Rajarshi Shahu College of Engineering'
        },
        {
            geocode: [18.618938000659224, 73.7479627056685],
            popUp: 'Clinic A'
        },
        {
            geocode: [18.618968502616635, 73.75231861323707],
            popUp: 'Clinic B'
        }
    ];

    const customIcon = new Icon({
        iconUrl: '/icons/pin2.png',
        iconSize: [38, 38]
    });

    const userLocationIcon = new Icon({
        iconUrl: '/icons/user-pin.png', 
        iconSize: [38, 38]
    })

    return (
        <div className='map'>
            {userLocation ? ( 
                <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={16}>
                    <TileLayer 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker.geocode} icon={customIcon}>
                            <Popup>{marker.popUp}</Popup>
                        </Marker>
                    ))}
                    <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
                        <Popup>{`Your Location`}</Popup>
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
