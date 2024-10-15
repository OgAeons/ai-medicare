import React, { useState, useEffect } from 'react'
import Slides from './Slides'

function Banner({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 9000)

        return () => clearInterval(interval)
    }, [slides.length])

    return (
        <div style={{ position: 'relative', overflow: 'hidden', width: '100%', borderRadius: '20px' }}>
            <div
                style={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(-${currentSlide * 100}vw)`,
                    width: `${slides.length * 100}vw`, 
                    height: '100%'
                }}
            >
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
    )
}

export default Banner
