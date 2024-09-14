import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar-title'>AiM - Aritfical Intelligence Medicare</div>
        <img src="/public/icons/line.png" alt="divider" height={"20rem"} style={{color: 'grey'}}/>
        <div className='location-container'>
            <p className='select-location'><img src="/public/icons/pin.png" alt="pin" height={"12rem"} />Select Location</p>
            <p>Pune<img src="/public/icons/down.png" alt="down-arrow" height={"15rem"} /></p>
        </div>
        <div className='search'>
            <img src="/public/icons/search.png" alt="search-icon" height={"20rem"} style={{margin: "0 .8rem", paddingTop: "3px"}}/>
            <input type="text" placeholder="Search Doctor, Hospitals and Medicines" />
        </div>
        <div class="services-container">
            <div className="servicesBtn">Healthcare Services<img src="/public/icons/down.png" alt="down-arrow" height={"15rem"} /></div>
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
            <img src="/public/icons/shopping-bag.png" alt="user-icon" height={"15rem"}/>
            Cart
        </div>
        <div className='login-container'>
            <img src="/public/icons/user.png" alt="user-icon" height={"15rem"}/>
            Login
        </div>
        
    </div>
  )
}

export default Navbar