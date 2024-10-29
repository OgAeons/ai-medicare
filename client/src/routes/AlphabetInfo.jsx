import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function AlphabetInfo() {
    const [selectedLetter, setSelectedLetter] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredDiseases, setFilteredDiseases] = useState([])

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("")

    function handleSearch(e) {
        setSearchQuery(e.target.value);
        setSelectedLetter(''); 
    
        axios.get(`http://127.0.0.1:5000/diseases?search=${e.target.value}`)
            .then(response => {
                console.log('Search Response:', response.data);
                setFilteredDiseases(response.data);
            })
            .catch(error => {
                console.error('Error fetching diseases by search:', error);
            });
    }
    
    function handleLetterClick(letter) {
        setSelectedLetter(letter);
        setSearchQuery('');
        axios.get(`http://127.0.0.1:5000/diseases?letter=${letter}`)
            .then(response => {
                console.log('Letter Response:', response.data);
                setFilteredDiseases(response.data);
            })
            .catch(error => {
                console.error('Error fetching diseases by letter:', error);
            });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='home-container'>
            <Navbar />
            <div className="alphabetical-search-container">
                <div className="alphabetical-search">
                    <div className="navigation" style={{margin: '1.5rem'}}>
                        <Link to='/' style={{color: 'white', fontWeight: '300'}}> Home </Link>
                        <span style={{margin: '0 3px'}}> &gt; </span>
                        <Link to='/alphabet-info'  style={{color: 'white', fontWeight: '300'}}> Diseases & Conditions </Link>
                        {(selectedLetter || searchQuery) && ( 
                            <div style={{color: 'white', fontWeight: '300'}}>
                                <span  style={{margin: '0 0 0 2px'}}> &gt; </span>
                                Begins with {searchQuery ? `'${searchQuery}'` : `'${selectedLetter}'`}
                            </div>
                        )}
                    </div>
                    <div className="section-title" style={{margin: '1.3rem'}}>Diseases & Conditions</div>
                    <div className='section-subtitle' style={{margin: '1.3rem', marginBottom: '.5rem', color: 'white'}}>Search Diseases and Conditions</div>
                    <div className='search' style={{width: '90%', margin: '0rem 1.3rem', padding: '10px 15px' }}>
                        <img src="/icons/search.png" alt="search" height={"25rem"} style={{margin: "0 0.8rem"}}/>
                        <input 
                            type="text" 
                            placeholder='Search' 
                            style={{height: '2rem', width: '90%', fontSize: '1.2rem'}}
                            value={searchQuery}
                            onChange={handleSearch} 
                        />
                    </div>
                </div>
                <div className="alphabet-container">
                    <div className="section-subtitle" style={{color: 'white'}}>Find diseases & conditions by first letter</div>
                    <div className='letter-container'>
                        { alphabet.map((letter, index) => (
                            <div 
                                key={index} 
                                className={`alphabet ${letter === selectedLetter ? 'selected-letter' : ''}`} 
                                onClick={() => handleLetterClick(letter)} 
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <div className='disease-info'>
                    <h2><strong>Results:</strong></h2>
                    {Array.isArray(filteredDiseases) && filteredDiseases.length > 0 ? (
                        filteredDiseases.map((disease, index) => {
                            const riskLevel = disease['risk level'];
                            let riskStyle = {};

                            if (riskLevel.includes('high')) {
                                riskStyle = { backgroundColor: 'red', color: 'white', padding: '2px 5px', borderRadius: '3px' };
                            } else if (riskLevel.includes('moderate')) {
                                riskStyle = { backgroundColor: 'yellow', color: 'black', padding: '2px 5px', borderRadius: '3px' };
                            } else if (riskLevel.includes('low')) {
                                riskStyle = { backgroundColor: 'green', color: 'white', padding: '2px 5px', borderRadius: '3px' };
                            } else {
                                riskStyle = { backgroundColor: 'gray', color: 'white', padding: '2px 5px', borderRadius: '3px' };
                            }

                            return (
                                <div key={index} className="disease-item">
                                    <h3>{disease.name}</h3>
                                    <p><strong>Symptoms:</strong> {capitalizeFirstLetter(disease.info)}</p>
                                    <p><strong>Treatment:</strong> {capitalizeFirstLetter(disease.treatment)}</p>
                                    <p>
                                        <strong>Risk: </strong>
                                        <span style={riskStyle}>{capitalizeFirstLetter(riskLevel)}</span>
                                    </p>

                                    <p><strong>Refer:</strong> {disease.doctor.split(',').map(doctor =>
                                        doctor.charAt(0).toUpperCase() + doctor.slice(1).trim()).join(', ')}</p>

                                </div>
                            );
                        })
                    ) : (
                        <p>No diseases found.</p>
                    )}
                </div>
            </div>

            <div className='footer'>
                    <div className='footer-left'>
                        <div className='footer-logo'>
                            <img src="/images/Aim-logo-removebg.png" alt="logo" height={'300vh'} />
                            <div className='footer-title'>Artificial Intelligence Medicare</div>
                        </div>
                        <div className='copyright'>©2024 AiM: Artificial Intelligence Medicare</div>
                    </div>
                    <div className='footer-right'>
                        <div className='footer-section'>
                            <div className='footer-section-title'>Healthcare Team</div>
                            <div className='footer-items'>Doctors</div>
                            <div className='footer-items'>Nurses</div>
                            <div className='footer-items'>Consultants</div>
                            <div className='footer-items'>Health Plans</div>
                        </div>
                        <div className='footer-section'>
                            <div className='footer-section-title'>Need Support?</div>
                            <div className='footer-items'>Chat with us</div>
                            <div className='footer-items'>Call Support</div>
                            <div className='footer-items'>Email</div>
                            <div className='footer-items'>Feedback</div>
                        </div>
                    </div>
                </div>
        </div>
        
    )
}

export default AlphabetInfo