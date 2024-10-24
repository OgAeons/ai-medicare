import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AlphabetInfo(props) {
    const [selectedLetter, setSelectedLetter] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("")
    const diseases = { 
        A: [
            { name: 'Asthma', info: 'A respiratory condition', treatment: 'Inhalers, lifestyle changes' },
            { name: 'Alzheimer’s', info: 'A brain disorder', treatment: 'Medications, therapies' },
        ],
        B: [
            { name: 'Bronchitis', info: 'Inflammation of bronchial tubes', treatment: 'Rest, fluids, inhalers' },
        ],
        C: [
            { name: 'Cystic Fibrosis', info: 'Affects lungs and digestive system', treatment: 'Airway clearance, enzymes' },
        ]
    }

    const filteredDiseases = searchQuery
        ? Object.values(diseases).flat().filter(disease => 
            disease.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : selectedLetter ? diseases[selectedLetter] || [] : []

    function handleSearch(e) {
        setSearchQuery(e.target.value)
        setSelectedLetter('') 
    }

    function handleLetterClick(letter) {
        if (letter !== selectedLetter) {
            setSelectedLetter(letter)
            setSearchQuery('')
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    return (
        <div className='home-container'>
            <Navbar />
            <div className="alphabetical-search-container">
                <div className="alphabetical-search">
                    <div className="navigation">
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
                            style={{height: '2rem', fontSize: '1.2rem'}}
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
            <div className="bottom-container" style={{height: '100vh'}}>
                <div className='disease-info'>
                    <h2><strong>Results:</strong></h2>
                    {filteredDiseases.length > 0 ? (
                        filteredDiseases.map((disease, index) => (
                            <div key={index} className="disease-item">
                                <h3>{disease.name}</h3>
                                <p><strong>Info:</strong> {disease.info}</p>
                                <p><strong>Treatment:</strong> {disease.treatment}</p>
                            </div>
                        ))
                    ) : (
                        <div>No diseases found for this letter or search.</div>
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