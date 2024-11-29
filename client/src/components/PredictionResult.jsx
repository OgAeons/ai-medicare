import React from 'react';

const PredictionResult = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-md w-1/3 flex flex-col items-center'>
        <h3 className='text-xl font-semibold mb-4'>Prediction Result</h3>
        <p><strong>Disease:</strong> {result.predicted_disease || "Not available"}</p>
        <p><strong>Recommended Test:</strong> {result.recommended_test || "Not available"}</p>
        <div className='flex justify-between w-full'>
            <button onClick={onClose} className="mt-4 bg-red-600 text-white py-2.5 px-4 rounded-xl">
            Close
            </button>
            <a href="/lab-tests" className='mt-4 bg-emerald-600 text-white py-3 px-4 rounded-xl'> Go to Lab Tests</a>
        </div>
        
      </div>
    </div>
  );
};

export default PredictionResult;
