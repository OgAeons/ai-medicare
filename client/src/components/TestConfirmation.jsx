const TestConfirmation = ({ show, onClose, appointmentDetails }) => {
    if (!show) return null;

    const confirmAppointment = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/confirm-lab-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentDetails),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Appointment Confirmed:', data);
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            onClose();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                <h2 className="text-xl font-semibold">Confirm Appointment</h2>
                <p><strong>Lab Name:</strong> {appointmentDetails.labName || 'N/A'}</p>
                <p><strong>Tests:</strong> {appointmentDetails.labTests || 'N/A'}</p>
                <p><strong>Date:</strong> {appointmentDetails.date || 'N/A'}</p>
                <p><strong>Appointment Type:</strong> {appointmentDetails.appointmentType || 'N/A'}</p>
                <p><strong>Address:</strong> {appointmentDetails.labAddress || 'N/A'}</p>
                <p><strong>Phone:</strong> {appointmentDetails.labPhone || 'N/A'}</p>
                <p><strong>Fees:</strong> {appointmentDetails.testFees || 'N/A'}</p>


                <div className="flex justify-between mt-4">
                    <button
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                        onClick={confirmAppointment}
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

export default TestConfirmation;
