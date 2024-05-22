import React from 'react';
import PropTypes from 'prop-types';
import "../pages/hotel/hotel.css"

export const HotelCard = ({ hotel }) => {
    
    const handleHotelClick = (id) => {

        navigate(`/hotel/${id}`);
    };

    return (
        <div className="hotel-card">
            <div className="hotel-card-header">
                <h1 className="hotel-card-title">{hotel.nameHotel}</h1>
                <div className="hotel-card-info">
                    <p>Location: {hotel.location}</p>
                    <p>Category: {hotel.category}</p>
                </div>
            </div>
            <div className="hotel-card-body">
                <p>{hotel.description.slice(0, 200) + " ...Read more"}</p>
                <div className="hotel-card-details">
                    <p>Installations: {hotel.installations}</p>
                    <p>Status: {hotel.status ? "Open" : "Closed"}</p>
                    <p>Bedrooms: {hotel.bedrooms.length}</p>
                    <button key={hotel._id} onClick={() => handleHotelClick(hotel._id)}>
                        ver habitaciones
                    </button>
                </div>
            </div>
        </div>
    );
};

HotelCard.propTypes = {
    hotel: PropTypes.shape({
        nameHotel: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        installations: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        bedrooms: PropTypes.arrayOf(PropTypes.string).isRequired,
        status: PropTypes.bool.isRequired
    }).isRequired
};

export default HotelCard;