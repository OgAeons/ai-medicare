import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import FindDoctor from './routes/FindDoctor'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/doctor' element={<FindDoctor />} />
      </Routes>
    </Router>
  )
}

export default App