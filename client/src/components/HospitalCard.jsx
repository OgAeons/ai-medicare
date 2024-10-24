import React from 'react'

function HospitalCard(props) {
    const customStyle = {
        backgroundImage: `url(${props.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const gradientOverlay = {
        height: '70%',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
        alignContent: 'end',
        borderRadius: '20px'
    }

  return (
    <div style={customStyle} className="hospital-grid">
        <div style={gradientOverlay}>
            <div className="hospital-name">{props.name}</div>
            <div className="hospital-area">{props.area}</div>
        </div>
    </div>
  )
}

export default HospitalCard;
