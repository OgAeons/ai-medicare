import React from 'react';

const Messages = () => {
    return (
        <div style={styles.container}>
            <h4>Your Messages</h4>
            <p>You have no new messages.</p>
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

export default Messages;
