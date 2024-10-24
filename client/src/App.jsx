import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import FindDoctor from './routes/FindDoctor'
import LabTests from './routes/LabTests'
import Medicine from './routes/Medicine'
import AlphabetInfo from './routes/AlphabetInfo'
import Hospitals from './routes/Hospitals'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/alphabet-info' element={<AlphabetInfo />} />
        <Route path='/doctor' element={<FindDoctor />} />
        <Route path='/lab-tests' element={<LabTests />} />
        <Route path='/medicine' element={<Medicine />} />
        <Route path='/hospitals' element={<Hospitals />} />
      </Routes>
    </Router>
  )
}

export default App