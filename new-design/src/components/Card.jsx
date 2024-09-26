import React from 'react'

function Card(props) {
  return (
    <div className="card" style={{backgroundColor: props.bgColor}}>
      <div className='card-title'>{props.title}</div>
      <div className='card-info'>{props.info}</div>
      <div className='card-bottom'>
        <div className='card-arrow'><img src="/public/icons/right-arrow.png" alt="arrow" height={"40rem"} style={{color: "white"}}/></div>
        <div className='card-img'><img src={props.img} alt="card-img" height={"200rem"}/></div>
      </div>
    </div>
  )
}

export default Card