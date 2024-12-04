import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Footer from './Footer'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function MedicineInfo() {
    const [selectedLetter, setSelectedLetter] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredMedicines, setFilteredMedicines] = useState([])

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("")

    function handleSearch(e) {
        setSearchQuery(e.target.value)
        setSelectedLetter('')

        axios.get(`http://127.0.0.1:5000/medicines?search=${e.target.value}`)
            .then(response => {
                console.log('Search Response:', response.data)
                setFilteredMedicines(response.data)
            })
            .catch(error => {
                console.error('Error fetching medicines by search:', error)
            })
    }

    function handleLetterClick(letter) {
        setSelectedLetter(letter)
        setSearchQuery('')
        axios.get(`http://127.0.0.1:5000/medicines?letter=${letter}`)
            .then(response => {
                console.log('Letter Response:', response.data)
                setFilteredMedicines(response.data)
            })
            .catch(error => {
                console.error('Error fetching medicines by letter:', error)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='home-container'>
            <Navbar />
            <div className="medicine-search-container">
                <div className="alphabetical-search">
                    <div className="navigation" style={{ margin: '1.5rem' }}>
                        <Link to='/' style={{ color: 'white', fontWeight: '300' }}> Home </Link>
                        <span style={{ margin: '0 3px' }}> &gt; </span>
                        <Link to='/medicine-info' style={{ color: 'white', fontWeight: '300' }}> Medicines </Link>
                        {(selectedLetter || searchQuery) && (
                            <div style={{ color: 'white', fontWeight: '300' }}>
                                <span style={{ margin: '0 0 0 2px' }}> &gt; </span>
                                Begins with {searchQuery ? `'${searchQuery}'` : `'${selectedLetter}'`}
                            </div>
                        )}
                    </div>
                    <div className="section-title" style={{ margin: '1.3rem', color: 'black' }}>Medicine Information</div>
                    <div className='section-subtitle' style={{ margin: '1.3rem', marginBottom: '.5rem', color: 'white' }}>Search Medicines</div>
                    <div className='search' style={{ width: '90%', margin: '0rem 1.3rem', padding: '10px 15px' }}>
                        <img src="/icons/search.png" alt="search" className='w-6 h-6' />
                        <input
                            type="text"
                            placeholder='Search'
                            style={{ height: '2rem', width: '90%', fontSize: '1.2rem' }}
                            value={searchQuery}
                            onChange={handleSearch}
                            className='text-black'
                        />
                    </div>
                </div>
                <div className="alphabet-container">
                    <div className="section-subtitle text-gray-200">Find medicines by first letter</div>
                    <div className='letter-container'>
                        {alphabet.map((letter, index) => (
                            <div
                                key={index}
                                className={`alphabet ${letter === selectedLetter ? 'medicine-selected-letter' : ''}`}
                                onClick={() => handleLetterClick(letter)}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <div className='my-6 mx-4 h-[100vh] overflow-y-auto'>
                    <h2 className='text-3xl'><strong>Results:</strong></h2>
                    {Array.isArray(filteredMedicines) && filteredMedicines.length > 0 ? (
                        filteredMedicines.map((medicine, index) => (
                            <div key={index} className="my-4 p-4 border border-gray-400 rounded-2xl">
                                <h3 className='text-lg font-semibold'>{medicine.name}</h3>
                                {Object.entries(medicine).map(([key, value]) => (
                                    key !== "id" && key !== "name" && value && (
                                        <p key={key}>
                                            <strong>{capitalizeFirstLetter(key.replace(/([A-Z])/g, ' $1').toLowerCase())}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                                        </p>
                                    )
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No medicines found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MedicineInfo
