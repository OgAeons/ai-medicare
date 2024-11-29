import React from 'react';

const Header = () => {
    return (
        <header style={styles.header} className='rounded-3xl flex flex-col items-center'>
            <h1 className='text-3xl font-bold'>Welcome back, Richard</h1>
            <p>Track, manage, and forecast your patient reports and data.</p>
        </header>
    );
};

const styles = {
    header: {
        padding: '1rem 2rem',
        backgroundColor: '#f8fafc',
    },
};

export default Header;
