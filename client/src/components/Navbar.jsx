import React, { useState } from 'react'
import { useLocation } from '../services/LocationContext'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../services/User'

function Navbar() {
    const { location } = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useUser()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleLoginClick = () => {
        if (!user) {
            navigate('/login')
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/register')
    }

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState)
    }

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
                    {location.area || 'Fetching location...'} 
                </div>
            </div>

            {/* Search Input */}
            <div className="bg-gray-200 text-sm w-2/6 px-4 py-2 flex items-center border border-transparent hover:border-black rounded-3xl outline-none">
                <img src="/icons/search.png" className="w-6" alt="search icon" />
                <input type="text" className="bg-gray-200 px-2" placeholder="Search Doctor, Hospitals, and Medicines" />
            </div>

            {/* Healthcare Services Dropdown */}
            <div className="text-sm w-1/6 mx-4 py-2 border border-transparent hover:border-black rounded-3xl">
                <div className="flex px-2">
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
                </div>
            </div>

            {/* User Login/Logout */}
            {user ? (
                <div
                    className="text-sm w-1/6 px-4 py-2 flex items-center border border-black rounded-3xl"
                    onClick={toggleDropdown}
                >
                    <img src="/icons/user.png" className="w-6" alt="user icon" />
                    {user.name}
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="text-sm w-1/6 px-4 py-2 flex items-center border border-black rounded-3xl"
                    onClick={handleLoginClick}
                >
                    <img src="/icons/user.png" className="w-6 mx-2" alt="user icon" />
                    Login
                </div>
            )}
        </nav>
    )
}

export default Navbar
