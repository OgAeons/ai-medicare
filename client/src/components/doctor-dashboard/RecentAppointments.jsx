import React from 'react';

const RecentAppointments = () => {
    const appointments = [
        { serial: '001', date: '2024-11-20', name: 'John Doe', doctor: 'Dr. Smith', status: 'Confirmed' },
        { serial: '002', date: '2024-11-21', name: 'Jane Smith', doctor: 'Dr. Brown', status: 'Pending' },
    ];

    return (
        <div style={styles.container}>
            <h4>Recent Patient Appointments</h4>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Date</th>
                        <th>Patient Name</th>
                        <th>Assign To Doctor</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.serial}>
                            <td>{appointment.serial}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.name}</td>
                            <td>{appointment.doctor}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '1rem',
        background: '#fff',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
};

export default RecentAppointments;
