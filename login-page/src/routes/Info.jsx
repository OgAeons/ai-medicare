import React, { useState } from 'react'
import Questions from '../components/Questions'

function Info() {
    return (
        <div className='info-container'>
            <div style={{ padding: '20px' }}>
                <h1 style={{textAlign: "center"}}>About You:</h1>
                <Questions />
            </div>
        </div>
    );
};

export default Info;
