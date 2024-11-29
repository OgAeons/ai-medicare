import React from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
  return (
    <div className="card" style={{backgroundColor: props.bgColor}}>
      <Link to={props.link}>
      <div className='card-title'>{props.title}</div>
      <div className='card-info'>{props.info}</div>
      <div className='card-bottom'>
      <div className='card-arrow w-12 h-12'><img src="/icons/right-arrow.png" alt="arrow" /></div>
      <div className='card-img'><img src={props.img} alt="card-img" className='w-40 p-0 m-0'/></div>
      </div>
      </Link>
    </div>
  )
}

export default Card