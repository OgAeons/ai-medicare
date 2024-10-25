import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState('');

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/symptoms');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSymptoms(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchSymptoms();
  }, []);

  const handleCheckboxChange = (symptom) => {
    setSelectedSymptoms((prev) => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom.');
      return; // Prevent submission if no symptoms are selected
    }
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        symptoms: selectedSymptoms,
      });
      console.log('Prediction response:', response.data); // Log the response
      setPredictedDisease(response.data.disease); // Update to match the API response
    } catch (error) {
      console.error('Error predicting disease:', error);
      setPredictedDisease('Error predicting disease'); // Optionally handle error display
    }
  };

  return (
    <div className='bottom-container'>
      <h1>Symptom Checker</h1>
      <form onSubmit={handleSubmit}>
        <h2>Select Symptoms:</h2>
        {symptoms.map((symptom) => (
          <div key={symptom}>
            <input 
              type="checkbox" 
              value={symptom} 
              onChange={() => handleCheckboxChange(symptom)} 
              style={{width: '2rem', marginLeft: '20vw'}}
            />
            <label>{symptom}</label>
          </div>
        ))}
        <button type="submit">Predict Disease</button>
      </form>
      {predictedDisease && <h3>Predicted Disease: {predictedDisease}</h3>}
    </div>
  );
};

export default SymptomChecker;
