import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AlphabetInfo() {
    const { letter } = useParams();
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const fetchDiseases = async () => {
            const response = await fetch(`/api/diseases?letter=${letter}`);
            const data = await response.json();
            setDiseases(data);
        };

        fetchDiseases();
    }, [letter]);

    const getRiskColor = (riskLevel) => {
        if (riskLevel.includes('low')) return 'green';
        if (riskLevel.includes('moderate')) return 'yellow';
        if (riskLevel.includes('high')) return 'red';
        return 'black'; // Default color if risk level is not recognized
    };

    return (
        <div className="disease-info">
            <h2><strong>Results for {letter}:</strong></h2>
            {diseases.length > 0 ? (
                diseases.map((disease, index) => (
                    <div key={index} className="disease-item">
                        <h3>{disease.name}</h3>
                        <p><strong>Symptoms:</strong> {disease.info}</p>
                        <p><strong>Treatment:</strong> {disease.treatment}</p>
                        <p style={{ color: getRiskColor(disease['risk level']) }}>
                            <strong>Risk Level:</strong> {disease['risk level']}
                        </p>
                        <p><strong>Recommended Doctors:</strong> {disease.doctor}</p>
                    </div>
                ))
            ) : (
                <p>No diseases found for the letter {letter}.</p>
            )}
        </div>
    );
}

export default AlphabetInfo;
