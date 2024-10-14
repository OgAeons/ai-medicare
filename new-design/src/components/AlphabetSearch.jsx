import React, { useState } from 'react'

function AlphabetSearch(props) {
    const [selectedLetter, setSelectedLetter] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('')
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
    // Filter diseases based on the selected letter or search query
    const filteredDiseases = searchQuery
        ? Object.values(diseases).flat().filter(disease => 
            disease.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : selectedLetter ? diseases[selectedLetter] || [] : [];

    function handleLetterClick(letter) {
        if (letter !== selectedLetter) {
            setSelectedLetter(letter)
            setSearchQuery('')
        }
    }

    function handleSearchQuery(e) {
        setSearchQuery(e.target.value)
        setSelectedLetter('') 
    }

    return (
        <div>
            <div className='section-title' style={{marginTop: '2rem'}}>{props.title}</div>
            <div className='alphabetical-search-container'> 
                <div className='alphabet-container'>
                    <div className='section-subtitle'>{props.subtitle}</div> 
                    <div className='letter-container'>
                        { alphabets.map((letter, index) => (
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
                <div className="alphabetical-search">
                    <div className='section-subtitle'>{props.label}</div>
                    <div className='search' style={{width: '95%', margin: '1rem 0rem', padding: '10px 15px' }}>
                        <img src="/icons/search.png" alt="search" height={"25rem"} style={{margin: "0 0.8rem"}}/>
                        <input 
                            type="text" 
                            placeholder='Search' 
                            style={{height: '2rem', fontSize: '1.2rem'}}
                            value={searchQuery}
                            onChange={handleSearchQuery} 
                        />
                    </div>
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
            </div>
        </div>
    )
}

export default AlphabetSearch;
