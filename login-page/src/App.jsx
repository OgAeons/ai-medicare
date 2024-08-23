import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Cover from "./routes/Cover"
import Home from "./routes/Home"

function LayoutWithCover({ children }) {
    return (
        <div className="body">
            <Cover />
            {children}
        </div>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutWithCover><Login /></LayoutWithCover>} />
                <Route path="/register" element={<LayoutWithCover><Register /></LayoutWithCover>} />
                <Route path="/home" element={<Home />} />
            </Routes> 
        </Router>
    )
}

export default App