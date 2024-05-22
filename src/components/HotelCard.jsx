import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import "../pages/hotel/hotel.css";
import { deleteHotel } from '../services/api';

const BASE_URL = "http://127.0.0.1:3000";

export const HotelCard = ({ hotel }) => {

    const navigate = useNavigate();

    const handleHotelClick = (id) => {
        navigate(`/hotel/habitaciones/${id}`);
    };

    const handleEditClick = (id, event) => {
        event.stopPropagation();
        navigate(`/hotel/update/${id}`);
    };

    const handleDeleteClick = async (id, event) => {
        event.stopPropagation();
        try {
            const response = await deleteHotel(id);
            if (response.error) {
                console.error('Error deleting hotel:', response.e);
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the hotel');
        }
    };

    const imageUrl = `${BASE_URL}${hotel.photo}`;

    return (
        <div className="hotel-card" onClick={() => handleHotelClick(hotel._id)}>
            <div className="hotel-card-body">
                <div className="hotel-photo-container">
                    <img src={imageUrl} alt={`${hotel.nameHotel} photo`} className="hotel-photo" />
                </div>
                <div className="hotel-details">
                    <div className="hotel-title-info">
                        <h1 className="hotel-card-title">{hotel.nameHotel}</h1>
                        <p className="hotel-card-category">Category: {hotel.category}</p>
                    </div>
                    <div className="hotel-description">
                        <p>{hotel.description}</p>
                    </div>
                    <div className="hotel-card-info">
                        <p>Installations: {hotel.installations}</p>
                        <p>Location: {hotel.location}</p>
                        <p>Status: {hotel.status ? "Open" : "Closed"}</p>
                    </div>
                    <div className="hotel-buttons">
                        <button className="edit-button" onClick={(event) => handleEditClick(hotel._id, event)}>Editar</button>
                        <button className="delete-button" onClick={(event) => handleDeleteClick(hotel._id, event)}>Eliminar</button>
                        <button className="view-rooms-button" onClick={(event) => {
                            event.stopPropagation();
                            handleHotelClick(hotel._id);
                        }}>
                            Ver habitaciones
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

HotelCard.propTypes = {
    hotel: PropTypes.shape({
        nameHotel: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        installations: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired
    }).isRequired
};

export default HotelCard;
