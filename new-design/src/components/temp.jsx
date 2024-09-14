import React from 'react';

function Slides(props) {
 
  const slideStyle = {
    backgroundColor: props.background, // Use the background color prop`
    backgroundSize: 'cover', // Cover the entire slide
    backgroundPosition: 'center', // Center the background image
    height: '400px', // Fixed height for the slide
    display: 'flex', // Flexbox to center content
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    color: '#fff', // Text color
    fontSize: '2rem', // Font size
    position: 'relative'
  };

  return (
    <div className="slide" style={slideStyle}>
      <h1>{props.title}</h1> 
      <img src={props.img} alt="image" style={{ position: 'absolute', top: 0, left: 0, height: '30rem', zIndex: '2' }} />
    </div>
  );
}

export default Slides;
