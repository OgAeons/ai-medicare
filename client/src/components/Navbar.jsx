import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from '../services/LocationContext'
import axios from 'axios'

function Navbar() {
    const [user, setUser] = useState()
    // const { user, logout } = useUser()
    const navigate = useNavigate()
    const { location } = useLocation()
    const [dropdownOpen, setDropdownOpen] = useState(false)


    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser)) 
        }
    }, [])


    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        setUser(null)
        navigate('/login')
    }

    const handleLoginClick = () => {
        if (!user) {
            navigate('/login')
        }
    }

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState)
    }

    useEffect(() => {
        if (location) {
            console.log('User location:', location)
        }
    }, [location])

    return (
        <nav className="navbar bg-white text-gray-800 w-full h-16 flex">
            {/* Logo Section */}
            <div className="navbar-logo w-1/6">
                <Link to="/" className="flex items-center">
                    <img src="/images/Aim-logo.png" className="w-1/5 h-12" alt="Artificial Intelligence Medicare logo" />
                    <span className="font-bold w-4/5">Artificial Intelligence Medicare</span>
                </Link>
                <img src="/icons/line.png" className="w-8" alt="divider" />
            </div>

            {/* Location Display */}
            <div className="text-sm w-1/6 px-4 py-2 flex items-center border border-transparent rounded-3xl">
                <img src="/icons/pin.png" className="w-6" alt="location pin" />
                <div className="text-sm px-2">
                {location ? (
                        <p>{location.area}</p>
                    ) : (
                        <p>Loading location...</p>
                    )}
                </div>
            </div>

            {/* Search Input */}
            <div className="bg-gray-200 text-sm w-3/6 px-4 py-2 flex items-center border border-transparent hover:border-black rounded-3xl outline-none">
                <img src="/icons/search.png" className="w-6" alt="search icon" />
                <input type="text" className="bg-gray-200 px-2" placeholder="Search Doctor, Hospitals, and Medicines" />
            </div>

            {/* Healthcare Services Dropdown */}
            <div className="relative text-sm w-0/6 mx-4 py-2 border border-transparent hover:border-black rounded-3xl">
                {/* <div className="flex px-2">
                    Healthcare Services
                    <img src="/icons/down.png" className="w-4" alt="dropdown arrow" />
                </div>
                <div className="services-content">
                    <Link to="/find-doctor">Find Doctor</Link>
                    <Link to="/virtual-nurse">Virtual Nurse</Link>
                    <Link to="/hospitals">Hospitals</Link>
                    <Link to="/medicines">Medicines</Link>
                    <Link to="/lab-tests">Lab Tests</Link>
                    <Link to="#">Medical Equipment on Rent</Link>
                    <Link to="/tests-recommendations">Tests Recommendations</Link>
                    <Link to="/doctor-at-doorstep">Doctor at Doorstep</Link>
                </div> */}
            </div>

            {/* User Login/Logout */}
            {user ? (
                <div className="text-md w-1/6 px-4 py-2 flex items-center border border-black rounded-3xl" onClick={toggleDropdown}>
                    <img src="/icons/user.png" className="w-6" alt="user icon" />
                    <span className='ml-4 text-md'>{user.name}</span>
                    {dropdownOpen && (
                        <div className="dropdown-menu flex flex-col">
                            <a href="/doctor-dashboard" className='text-center'>Profile</a>
                            <button onClick={handleLogout} className='text-red-400 bg-white mt-4'>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-sm w-1/6 px-4 py-2 flex items-center border border-black rounded-3xl" onClick={handleLoginClick}>
                    <img src="/icons/user.png" className="w-6 mx-2" alt="user icon" />
                    Login
                </div>
            )}

        </nav>
    )
}

export default Navbar
