import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelsDetails } from '../../services/api';
import '../hotel/hotel.css';

export const HotelDetails = () => {

    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            const result = await getHotelsDetails(id);
            if (result.error) {
                setError(result.e.message);
            } else {
                setHotel(result.hotel);
            }
            setLoading(false);
        };
        fetchHotelDetails();
    }, [id]);

    if (loading) return <p>Loading hotel details...</p>;
    if (error) return <p>Error loading hotel details: {error}</p>;

    return (
        <div className="hotel-details">
            {hotel && (
                <>
                    <h1>{hotel.nameHotel}</h1>
                    <img src={hotel.photo} alt={hotel.nameHotel} className="hotel-photo" />
                    <p><strong>Description:</strong> {hotel.description}</p>
                    <p><strong>Installations:</strong> {hotel.installations}</p>
                    <p><strong>Location:</strong> {hotel.location}</p>
                    <p><strong>Category:</strong> {hotel.category}</p>
                    <p><strong>Status:</strong> {hotel.status ? "Open" : "Closed"}</p>
                    <p><strong>Bedrooms:</strong> {hotel.bedrooms.length}</p>
                </>
            )}
        </div>
    );
};

export default HotelDetails;
