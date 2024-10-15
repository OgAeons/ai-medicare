import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./routes/Login"
import Register from "./routes/Register"
import Cover from "./routes/Cover"
import Home from "./routes/Home"
import Info from "./routes/Info"
import AuthCallback from "./components/AuthCallback"

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
                <Route path="/auth-callback" element={<AuthCallback />}></Route>
                <Route path="/info" element={<Info />} />
                <Route path="/home" element={<Home />} />
            </Routes> 
        </Router>
    )
}

export default App