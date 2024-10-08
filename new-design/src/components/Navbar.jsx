import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar-title'>AiM - Aritfical Intelligence Medicare</div>
        <img src="/icons/line.png" alt="divider" height={"20rem"} style={{color: 'grey'}}/>
        <div className='location-container'>
            <p className='select-location'><img src="/icons/pin.png" alt="pin" height={"12rem"} />Select Location</p>
            <p>Pune<img src="/icons/down.png" alt="down-arrow" height={"15rem"} /></p>
        </div>
        <div className='search'>
            <img src="/icons/search.png" alt="search-icon" height={"20rem"} style={{margin: "0 .8rem", paddingTop: "3px"}}/>
            <input type="text" placeholder="Search Doctor, Hospitals and Medicines" />
        </div>
        <div className="services-container">
            <div className="servicesBtn">Healthcare Services<img src="/icons/down.png" alt="down-arrow" height={"15rem"} /></div>
            <div className="services-content">
                <a href="#">Find Doctor</a>
                <a href="#">Virtual Nurse</a>
                <a href="#">Hospitals</a>
                <a href="#">Medicines</a>
                <a href="#">Lab Tests</a>
                <a href="#">Medical Equipment on Rent</a>
                <a href="#">Tests recommendations</a>
                <a href="#">Doctor at Doorstep</a>
            </div>
    </div>
        <div className='login-container'>
            <img src="/icons/shopping-bag.png" alt="user-icon" height={"15rem"}/>
            Cart
        </div>
        <div className='login-container'>
            <img src="/icons/user.png" alt="user-icon" height={"15rem"}/>
            Login
        </div>
        
    </div>
  )
}

export default Navbar