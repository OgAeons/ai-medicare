import React from "react"

function Cover() {
    return (
        <div className="container-left">
            <div className="logo">
                <h1 className="title">A i M</h1>
                <div className="line"></div>
                <p className="title-p">Artificial Intelligence Medicare</p>
            </div>
            <p className="description">Welcome to a new era of healthcare!<br />Log in to unlock a world where Ai anticipates your needs,<br />personalizes your wellness journey,<br />and brings advanced care to your fingertips.</p>
            <div className="line-p"></div>
            <img className="cover-img" src="./public/cover-img.png" alt="cover-img" />
        </div>
    )
}

export default Cover