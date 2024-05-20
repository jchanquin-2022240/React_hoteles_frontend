import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/hotel/hotel.css';

const images = [

    "../assets/img/paisaje1.jpg"
];

export const HotelHeader = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {

            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []
);

    const handleCreateHotel = () => {
        
        navigate('/create');
    };

    return (
        <div className="hotel-header">
            <img src={images[currentImageIndex]} alt="Hotel view" className="hotel-header-image" />
            <div className="hotel-header-overlay">
                <h1 className="hotel-header-text">Welcome to our Hotels</h1>
                <button className="hotel-header-button" onClick={handleCreateHotel}>
                    Create Hotel
                </button>
            </div>
        </div>
    );
};

export default HotelHeader;