import React from 'react';

const StatsCard = ({ title, value, percentageChange, icon }) => {
    return (
        <div style={styles.card} className='rounded-2xl shadow-lg p-4 flex-grow w-[17rem]'>
            <h4>{title}</h4>




            <div style={styles.content}>

                <span style={styles.value}>{value}</span>


            </div>
            <div className=' flex-grow'>
                <span style={percentageChange >= 0 ? styles.positive : styles.negative} className='flex items-center space-x-2'>

                    {percentageChange}% {percentageChange >= 0 ? '↑' : '↓'}

                    <p>From last month</p>
                </span>
            </div>
            <div>{icon}</div>
        </div>
    );
};

const styles = {
    // card: {
    //     padding: '1rem',
    //     background: '#fff',


    //     marginBottom: '1rem',
    // },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    value: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    positive: {
        color: 'green',
    },
    negative: {
        color: 'red',
    },
};

export default StatsCard;
