import React, { createContext, useContext, useState } from 'react';

// Create a UserContext
const UserContext = createContext();

// UserProvider component to wrap around your app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold user data

    const logout = () => {
        setUser(null); // Reset user state on logout
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
