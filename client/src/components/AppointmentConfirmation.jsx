const AppointmentConfirmation = ({ show, onClose, appointmentDetails }) => {
    if (!show) return null;

    const confirmAppointment = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/confirm-doctor-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentDetails),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Appointment Confirmed', data);
            } else {
                console.log('Error:', data.error);
            }
            onClose();
        } catch (error) {
            console.error('Error:', error);
            onClose();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                <h2 className="text-xl font-semibold">Confirm Appointment</h2>
                <p><strong>Doctor's Name:</strong> {appointmentDetails.doctorName}</p>
                {/* <p><strong>Specialization:</strong> {appointmentDetails.doctorSpecialization}</p> */}
                <p><strong>Date:</strong> {appointmentDetails.date}</p>
                <p><strong>Appointment Type:</strong> {appointmentDetails.appointmentType}</p>
                <p><strong>Address:</strong> {appointmentDetails.doctorAddress}</p>
                <p><strong>Phone:</strong> {appointmentDetails.doctorPhone}</p>
                <p><strong>Fees:</strong> {appointmentDetails.doctorFees}</p>

                <div className="flex justify-between mt-4">
                    <button
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => {
                            confirmAppointment()
                            console.log("Appointment Confirmed");
                            onClose();
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentConfirmation;
