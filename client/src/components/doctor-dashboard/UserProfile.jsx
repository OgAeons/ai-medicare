import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div style={styles.container}>
            <h3>Welcome, {user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
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

export default UserProfile;
