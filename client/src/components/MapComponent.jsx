import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import '@fortawesome/fontawesome-free/css/all.min.css'

const hospitalIcon = new L.DivIcon({
    className: 'hospital-icon',
    html: `<i class="fas fa-hospital" style="font-size: 30px; color: red;"></i>`, 
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  })

  const clinicIcon = new L.DivIcon({
    className: 'clinic-icon',
    html: `<i class="fas fa-clinic-medical" style="font-size: 30px; color: green;"></i>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  })

  const labIcon = new L.DivIcon({
    className: 'lab-icon',
    html: `<i class="fas fa-flask" style="font-size: 30px; color: blue;"></i>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  })

const MapComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null })
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          console.log('User location:', latitude, longitude)
          setLocation({ latitude, longitude })
        },
        (error) => {
          console.error('Error fetching location:', error)
          setLocation({ latitude: 18.62020527766368, longitude: 73.74704984206268 })
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      const places = [
        { lat: 18.629167650859767, lon: 73.75395827155215, name: 'Pulse Multispeciality Hospital', type: 'hospital' },
        { lat: 18.637539361667642, lon: 73.74217408183891, name: 'Punawale Multispeciality Hospital', type: 'hospital' },
        { lat: 18.625794529388845, lon: 73.73105146108536, name: 'Life Care Multispecility Hospital Punawale', type: 'hospital' },
        { lat: 18.62093214931341, lon: 73.76168668218786, name: 'LifeWave Hospital Tathwade', type: 'hospital' },
        { lat: 18.61503793976051, lon: 73.76337962230991, name: 'Saijyoti Hospital & ICU', type: 'hospital' },
        { lat: 18.609456623699828, lon: 73.74493919890847, name: 'Mangalmurti Hospital', type: 'hospital' },
        { lat: 18.60765539578501, lon: 73.75630415017824, name: 'Ashraya Hospital | Multispeciality Hospital In Pune', type: 'hospital' },
        { lat: 18.610401964060955, lon: 73.75673033925663, name: 'Swarn hospital', type: 'hospital' },
        { lat: 18.622420300963284, lon: 73.74724558149984, name: 'Om Clinic', type: 'clinic' },
        { lat: 18.622881589148435, lon: 73.7475264130212, name: 'Harsh Clinic', type: 'clinic' },
        { lat: 18.619741256380063, lon: 73.75198227316011, name: 'Namo Clinic', type: 'clinic' },
        { lat: 18.623679969588306, lon: 73.74849996229526, name: 'Sai Shri Clinic', type: 'clinic' },
        { lat: 18.61923472568888, lon: 73.75224143802576, name: 'Thyrocare Pathology Lab - Collection Centre', type: 'lab' },
        { lat: 18.615371106928155, lon: 73.75172645387973, name: 'Metropolis Labs | Blood Test & Diagnostic Centre in Mulshi', type: 'lab' },
        { lat: 18.62363896381391, lon: 73.74123215702923, name: 'Metropolis Labs | Blood Test & Diagnostic Centre in Tathwade', type: 'lab' },
      ]
      setMarkers(places)
    }

    if (location.latitude && location.longitude) {
      fetchNearbyPlaces()
    }
  }, [location])

  if (!location.latitude || !location.longitude) {
    return <div>Loading...</div>
  }

  const getIcon = (type) => {
    switch (type) {
      case 'hospital':
        return hospitalIcon
      case 'clinic':
        return clinicIcon
      case 'lab':
        return labIcon
      default:
        return hospitalIcon
    }
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
          <Marker key={index} position={[place.lat, place.lon]} icon={getIcon(place.type)}>
            <Popup>{place.name}</Popup>
          </Marker>  
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent
