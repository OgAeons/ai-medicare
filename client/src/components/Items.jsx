import React from 'react'

function Items(props) {
  return (
    <div className={`specialist-items ${props.isSelected ? 'selected-item' : ''}`} onClick={props.onClick}>{props.name}</div>
  )
}

export default Items