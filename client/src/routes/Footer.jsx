import React from 'react'

function Footer() {
  return (
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
  )
}

export default Footer