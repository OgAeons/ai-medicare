import React from 'react';

const Appointments = () => {
    return (
        <div style={styles.container}>
            <h4>Your Appointments</h4>
            <ul>
                <li>Doctor: Dr. Smith, Date: 2024-12-01</li>
                <li>Doctor: Dr. Brown, Date: 2024-12-05</li>
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        marginBottom: '1rem',

    },
};

export default Appointments;
