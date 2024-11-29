import React from 'react';

const Prescriptions = () => {
    return (
        <div style={styles.container}>
            <h4>Your Prescriptions</h4>
            <ul>
                <li>Medication: Paracetamol, Dosage: 500mg</li>
                <li>Medication: Amoxicillin, Dosage: 250mg</li>
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

export default Prescriptions;
