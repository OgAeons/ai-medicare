import React from 'react';

function Slides(props) {
    return (
        <div className="slide-container" style={{ backgroundColor: props.background, color: props.color, width: '93%' }}>
            <h1>{props.title}</h1>
            <img src={props.img} alt={props.title} style={{width: props.imgWidth}}/>
        </div>
    );
}

export default Slides
