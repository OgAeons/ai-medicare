import React from 'react';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>Healthcare Dashboard</h2>
            <ul style={styles.navLinks}>
                <li>Home</li>
                <li>Appointments</li>
                <li>Prescriptions</li>
                <li>Messages</li>
                <li>Logout</li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#1976d2',
        color: '#fff',
    },
    logo: {
        margin: 0,
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '1rem',
        margin: 0,
        padding: 0,
    },
};

export default Navbar;
