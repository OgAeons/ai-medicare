import React from "react"

function Cover() {
    return (
        <div className="cover-container">
            <div className="cover-logo">
                <img src="/images/Aim-logo-removebg.png" alt="cover-logo" width={'250vw'}/>
                <p style={{fontSize: '2rem', paddingBottom: '2rem'}}>Artificial Intelligence Medicare</p>
            </div>
            <img className="cover-img" src="/images/cover-img.png" alt="cover-img" />
        </div>
    )
}

export default Cover