import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
  return (
    <div className="card" style={{backgroundColor: props.bgColor}}>
      <Link to={props.link}>
      <div className='card-title'>{props.title}</div>
      <div className='card-info'>{props.info}</div>
      <div className='card-bottom'>
      <div className='card-arrow'><img src="/icons/right-arrow.png" alt="arrow" height={"40rem"} style={{color: "white"}}/></div>
      <div className='card-img'><img src={props.img} alt="card-img" height={"150rem"}/></div>
      </div>
      </Link>
    </div>
  )
}

export default Card