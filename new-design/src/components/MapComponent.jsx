import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {Icon} from 'leaflet'

function MapComponent() {
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
    ]
    
    const customIcon = new Icon({
        iconUrl: '/icons/pin2.png',
        iconSize: [38,38]
    })
    return (
        <div className='map'>
            <MapContainer center={[18.619893726057885, 73.74988316737976]} zoom={16}>
                <TileLayer 
                    attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {markers.map(marker => (
                    <Marker position={marker.geocode} icon={customIcon}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default MapComponent