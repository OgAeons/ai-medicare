import React, { useState } from 'react'
import Location from '../services/Location'
import { Link } from 'react-router-dom'

function Navbar() {
    const [userLocation, setUserLocation] = useState({latitude: null, longitude: null, area: ''})
    const userSignedIn = true

    function handleLocationChange(location) {
        setUserLocation(location)
    }

  return (
    <div className='navbar'>
        <div className='navbar-logo'>
            <Link to={'/'}><img src="/images/Aim-logo.png" alt="logo" height={'50vh'} /></Link>
            <Link to={'/'}>Artifical Intelligence Medicare</Link>
        </div>
        <img src="/icons/line.png" alt="divider" height={"20rem"} style={{color: 'grey'}} />
        <div className='location-container'>
            <img src="/icons/pin.png" alt="pin" height={"20rem"} />
            <div className='location'>{userLocation.area}<Location onLocationChange={handleLocationChange}/></div>
        </div>
        <div className='search'>
            <img src="/icons/search.png" alt="search-icon" height={"20rem"} style={{margin: "0 .8rem"}}/>
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
        { userSignedIn ? (
                <div className='user-container'>
                    <img src="/icons/user.png" alt="user-icon" height={"15rem"}/>
                    Atharva Phatak
                </div>
            ) : (
                <div className='login-container'>
                    <img src="/icons/user.png" alt="user-icon" height={"15rem"}/>
                    Login
                </div>
            )
        } 
    </div>
  )
}

export default Navbar