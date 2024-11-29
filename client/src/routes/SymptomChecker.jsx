import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import PredictionResult from '../components/PredictionResult';

const SymptomSelector = ({ onPredict }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch symptoms from the backend
    axios.get('http://127.0.0.1:5000/symptoms')
      .then((response) => setSymptoms(response.data))
      .catch((error) => console.error('Error fetching symptoms:', error));
  }, []);

  const handleToggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);

  // const handlePredict = () => {
  //   onPredict(selectedSymptoms);
  // };

  const handlePredict = (symptoms) => {
    axios
      .post('http://127.0.0.1:5000/predict', { symptoms })
      .then((response) => {
        setResult(response.data);
        setOpen(true); // Open popup after receiving the prediction
      })
      .catch((error) => console.error('Error predicting disease:', error));
  };

  const filteredSymptoms = symptoms.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => {
    setOpen(false);  // Close the prediction result popup
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white h-[70vh] w-[50vw] rounded-2xl p-6'>
        <Box>
          <h3 className='text-lg font-semibold'>Select Symptoms</h3>
          <Box display="flex" flexWrap="wrap" gap={1} className='mt-4'>
            {selectedSymptoms.map((symptom) => (
              <Chip
                key={symptom}
                label={symptom}
                onDelete={() => handleToggleSymptom(symptom)}
              />
            ))}
          </Box>
          <TextField
            label="Search Symptoms"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearch}
          />
          <List 
            style={{
              maxHeight: '300px', 
              overflowY: 'auto', 
              border: '1px solid #ccc', 
              padding: '10px',
            }}
          >
            {filteredSymptoms.map((symptom) => (
              <ListItem key={symptom}>
                <Checkbox
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleToggleSymptom(symptom)}
                />
                <ListItemText primary={symptom} />
              </ListItem>
            ))}
          </List>
          <button onClick={() => handlePredict(selectedSymptoms)} className='bg-blue-600 text-white py-4 w-full mt-6 rounded-xl'>Predict Disease</button>
        </Box>
      </div>
      {open && (
        <PredictionResult result={result} onClose={handleClose} />
      )}
    </div>
  );
};

export default SymptomSelector;
