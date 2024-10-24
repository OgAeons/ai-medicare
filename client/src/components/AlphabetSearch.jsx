import React from 'react'
import { useNavigate } from 'react-router-dom'

function AlphabetSearch(props) {
    const navigate = useNavigate()

    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('')

    function handleClick() {
        navigate('/alphabet-info')
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
                                className={`alphabet`} 
                                onClick={() => handleClick()} 
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="alphabetical-search" style={{alignContent: 'center'}}>
                    <div className='section-subtitle'>{props.label}</div>
                    <div className='search' style={{width: '95%', margin: '1rem 0rem', padding: '10px 15px' }}>
                        <img src="/icons/search.png" alt="search" height={"25rem"} style={{margin: "0 0.8rem"}}/>
                        <input 
                            type="text" 
                            placeholder='Search' 
                            style={{height: '2rem', fontSize: '1.2rem'}}
                            onChange={handleClick} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlphabetSearch;
