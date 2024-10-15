import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Location({ onLocationChange }) {
    const [location, setLocation] = useState({ latitude: null, longitude: null })
    const [area, setArea] = useState('')
    const [loading, setLoading] = useState(true)

    const api_key = '97a5e557a25342f8bd42da1553c8b5fc1'

    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        setLocation({ latitude, longitude })
                        onLocationChange({ latitude, longitude })

                        axios
                            .get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`)
                            .then((response) => {
                                console.log('API Response:', response.data)  

                                if (response.data.results && response.data.results.length > 0) {
                                    const components = response.data.results[0].components
                                    const areaName = components._normalized_city || components.city || components.town || components.village || components.road || 'Unknown area'
                                    setArea(areaName)
                                    onLocationChange({ latitude, longitude, area: areaName })
                                } else {
                                    console.error('No results found in the API response.')
                                }
                                setLoading(false)
                            })
                            .catch((error) => {
                                console.error('Error fetching location data:', error)
                                setLoading(false)
                            })
                    },
                    (error) => {
                        console.error('Error getting geolocation:', error)
                        setLoading(false)
                    }
                )
            } else {
                console.error('Geolocation is not supported by this browser.')
                setLoading(false)
            }
        }

        fetchLocation()
    }, []) 

    return (
        <div>
            {loading ? <p>Fetching Location</p> : ''}
        </div>
    )    
}

export default Location
