import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MedicineDetail() {
    const { medicineName } = useParams();
    const [medicineData, setMedicineData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedicineDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/medicine_detail/${medicineName}`);

                if (response.ok) {
                    const data = await response.json();
                    setMedicineData(data);
                } else {
                    setError('Medicine not found');
                }
            } catch (err) {
                setError('Error fetching data');
            }
        };

        fetchMedicineDetail();
    }, [medicineName]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {medicineData ? (
                <div>
                    <h1>{medicineData.name}</h1>
                    <p><strong>Use:</strong> {medicineData.use}</p>
                    <p><strong>Side Effects:</strong> {medicineData.side_effects ? medicineData.side_effects.filter(Boolean).join(', ') : 'No side effects listed'}</p>
                    <p><strong>Substitutes:</strong> {medicineData.substitutes ? medicineData.substitutes.filter(Boolean).join(', ') : 'No substitutes available'}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MedicineDetail;
