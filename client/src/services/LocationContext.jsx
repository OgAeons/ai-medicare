import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({ latitude: null, longitude: null, area: '' });

    const updateLocation = (newLocation) => {
        setLocation((prev) => ({
            ...prev,
            ...newLocation, // Update latitude, longitude, and area
        }));
    };

    return (
        <LocationContext.Provider value={{ location, updateLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
