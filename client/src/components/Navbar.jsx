import React, { useState } from 'react';
import Location from '../services/Location';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../services/User';

function Navbar() {
    const navigate = useNavigate()

    const { user } = useUser();
    const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null, area: '' });
    
    function handleLocationChange(location) {
        setUserLocation(location);
    }

    const handleLoginClick = () => {
        if (!user) {
            navigate('/login'); // Navigate to login if user is not logged in
        }
    }

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <Link to='/'>
                    <img src="/images/Aim-logo.png" alt="Artificial Intelligence Medicare logo" height='50vh' />
                </Link>
                <Link to='/'>Artificial Intelligence Medicare</Link>
            </div>
            <img src="/icons/line.png" alt="divider" height="20rem" style={{ color: 'grey' }} />
            <div className='location-container'>
                <img src="/icons/pin.png" alt="location pin" height="20rem" />
                <div className='location'>
                    {userLocation.area || 'Select Location'}
                    <Location onLocationChange={handleLocationChange} />
                </div>
            </div>
            <div className='search'>
                <img src="/icons/search.png" alt="search icon" height="20rem" style={{ margin: "0 .8rem" }} />
                <input type="text" placeholder="Search Doctor, Hospitals, and Medicines" />
            </div>
            <div className="services-container">
                <div className="servicesBtn">
                    Healthcare Services
                    <img src="/icons/down.png" alt="dropdown arrow" height="15rem" />
                </div>
                <div className="services-content">
                    <Link to="/find-doctor">Find Doctor</Link>
                    <Link to="/virtual-nurse">Virtual Nurse</Link>
                    <Link to="/hospitals">Hospitals</Link>
                    <Link to="/medicines">Medicines</Link>
                    <Link to="/lab-tests">Lab Tests</Link>
                    <Link to="/medical-equipment">Medical Equipment on Rent</Link>
                    <Link to="/tests-recommendations">Tests Recommendations</Link>
                    <Link to="/doctor-at-doorstep">Doctor at Doorstep</Link>
                </div>
            </div>
            <div className='login-container'>
                <Link to="/cart" style={{color: 'black', fontWeight: '400'}}>
                    <img src="/icons/shopping-bag.png" alt="shopping cart" height="15rem" />
                    Cart
                </Link>
            </div>
            {user ? (
                <div className='user-container'>
                    <img src="/icons/user.png" alt="user icon" height="15rem" />
                    {user.name}
                </div>
            ) : (
                <div className='login-container' onClick={handleLoginClick}>
                    <img src="/icons/user.png" alt="user-icon" height={"15rem"}/>
                    Login
                </div>
            )}
        </nav>
    );
}

export default Navbar;
