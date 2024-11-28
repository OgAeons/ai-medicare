import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import "../styles.css" // Assuming you're using React Router for navigation

function Medicine() {
    const [partialName, setPartialName] = useState('');
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle search input change
    const handleInputChange = (e) => {
        setPartialName(e.target.value);
    };

    // Handle form submission for medicine search
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/medicine', { // Updated URL to match Flask route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ partial_name: partialName }),
            });

            if (response.ok) {
                const data = await response.json();
                setMatches(data.matches || []);
            } else {
                setError('No matches found');
            }
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    // Handle medicine selection and navigate to detail page
    const handleMedicineClick = (medicineName) => {
        navigate(`/medicine_detail/${medicineName}`);
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="pre">
                <h1>Medicine Search</h1>
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="partial_name">Enter Medicine Name:</label>
                    <input
                        type="text"
                        id="partial_name"
                        name="partial_name"
                        value={partialName}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                {error && <p>{error}</p>}

                {matches.length > 0 && (
                    <div>
                        <h2>Multiple matches found. Please select the desired medicine:</h2>
                        <div>
                            {matches.map((match, index) => (
                                <div
                                    key={`${match.name}-${index}`}  // Unique key using medicine name and index
                                    className="medicine-container"
                                    onClick={() => handleMedicineClick(match.name)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <a className="medicine-link">{match.name}</a>
                                    <div className="tooltip">
                                        <p><strong>Potential Use:</strong> {match.use}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Medicine;
