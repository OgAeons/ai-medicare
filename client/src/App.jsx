import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './services/User'
import { LocationProvider } from './services/LocationContext'
import UserLocation from './services/UserLocation'
import Home from './routes/Home'
import FindDoctor from './routes/FindDoctor'
import LabTests from './routes/LabTests'
import Medicine from './routes/Medicine'
import AlphabetInfo from './routes/AlphabetInfo'
import Hospitals from './routes/Hospitals'
import SymptomChecker from './routes/SymptomChecker'
import Cover from './components/Cover'
import Login from './routes/Login'
import Register from './routes/Register'
import MapComponent from './components/MapComponent'
import Navbar from './components/Navbar'

function LayoutWithCover({ children }) {
  return (
      <div style={{display: 'flex'}}>
          <Cover />
          {children}
      </div>
  )
}

function App() {
  return (
    <LocationProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LayoutWithCover><Login /></LayoutWithCover>} />
            <Route path="/register" element={<LayoutWithCover><Register /></LayoutWithCover>} />
            <Route path="/" element={<Home />} />
            <Route path='/alphabet-info' element={<AlphabetInfo />} />
            <Route path='/doctor' element={<FindDoctor />} />
            <Route path='/lab-tests' element={<LabTests />} />
            <Route path='/medicine' element={<Medicine />} />
            <Route path='/hospitals' element={<Hospitals />} />
            <Route path='/symptoms' element={<SymptomChecker />} />
            <Route path="/map" element={<MapComponent />} />
            <Route path='/locate' element={<UserLocation />} />
            <Route path='/navbar' element={<Navbar />} />
          </Routes>
        </Router>
      </UserProvider>
    </LocationProvider>
  )
}

export default App