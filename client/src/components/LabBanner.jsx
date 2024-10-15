import React, { useState, useEffect } from 'react'
import Slides from './Slides'

function LabBanner() {
    return (
        <div className='banner-container'>
            <img src="/images/family.png" alt="" height={'100%'}/>
            <div className='banner-title-container'>
                <div className='banner-title'>Full Body Check-ups @299!!</div>
                <div className='book-now'>Book Now</div>
            </div>
        </div>
    );
}

export default LabBanner