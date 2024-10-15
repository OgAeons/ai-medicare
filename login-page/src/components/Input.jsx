import React from 'react'

function Input(props) {
  return (
    <div className='input'>
        <label htmlFor={props.name} className="label">{props.placeholder}</label>
        <input 
            onChange={(e) => {
                props.setUser({
                    ...props.user,
                    [props.name]: e.target.value
                })
            }}
            type={props.type} 
            placeholder={props.placeholder} 
            name={props.name} 
            required 
        />
    </div>
  )
}

export default Input