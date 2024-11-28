import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './services/User'
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
import MedicineDetail from './routes/MedicineDetail';
import Profiles from './routes/Profiles';


function LayoutWithCover({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Cover />
      {children}
    </div>
  )
}

function App() {
  return (
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
          <Route path="/medicine_detail/:medicineName" element={<MedicineDetail />} />
          {/* <Route path="/contact_pharmacist" element={<ContactPharmacist />} /> Contact page */}
          <Route path="/profile" element={<Profiles />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App