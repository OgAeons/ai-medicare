import React from 'react'

function DoctorCard(props) {
  return (
    <div className='doctor-card'>
        <img src={props.img} alt={props.name} />
        <div className='doctor-name'>{props.name}</div>
        <div className='doctor-speciality'>{props.speciality || props.price}</div>
    </div>
  )
}

export default DoctorCard