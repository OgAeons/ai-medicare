import React, { useState, useEffect } from 'react'
import Slides from './Slides'

function Banner() {
    const slides = [
        { bgColor: '#14114d', color: '#b3aff6', title: 'Healthcare', img: '/public/images/doctor.png', imgWidth: '43%' },
        { bgColor: '#2bec72', color: '#2b5e3d', title: 'Pharmacy', img: '/public/images/doctor2.png', imgWidth: '52%' },
        { bgColor: '#e12285', color: '#ee87bc', title: 'Virtual Nurse', img: '/public/images/doctor3.png', imgWidth: '42%' },
        { bgColor: '#ff0000', color: '#f38c8c', title: 'Lab Tests', img: '/public/images/doctor4.png', imgWidth: '35%' },
    ];
    
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length); 
        }, 3000); 

        return () => clearInterval(interval); 
    }, [slides.length]);

    return (
        <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
            <div style={{
                display: 'flex',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${(currentSlide * 100)}vw)`, 
                width: `${slides.length + 1 * 100}vw`, 
            }}>
                {slides.map((slide, index) => (
                    <div key={index} style={{ width: '100vw', flexShrink: 0 }}>
                        <Slides 
                            background={slide.bgColor}
                            color={slide.color}
                            title={slide.title}
                            img={slide.img}
                            imgWidth={slide.imgWidth}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Banner