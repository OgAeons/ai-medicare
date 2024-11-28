import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUserLocation } from './locationService';

// Create Context for Location
const LocationContext = createContext();

// Create a custom hook to use location context
export const useLocation = () => {
    return useContext(LocationContext);
};

// Location Provider component
export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);

    const updateLocation = (newLocation) => {
        setLocation(newLocation);
    };

    useEffect(() => {
        // Fetch location once when the app loads
        const fetchLocation = async () => {
            const data = await fetchUserLocation();
            updateLocation(data);
        };
        fetchLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ location, updateLocation }}>
            {children}
        </LocationContext.Provider>
    );
};
