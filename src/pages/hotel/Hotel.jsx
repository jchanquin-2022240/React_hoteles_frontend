import React, { useEffect, useState } from 'react';
import HotelHeader from '../../components/HotelHeader';
import HotelCard from '../../components/HotelCard';
import { getHotels } from '../../services/api';

export const Hotel = () => {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            const result = await getHotels();
            if (result.error) {
                setError(result.e.message);
            } else {
                setHotels(result.hotels);
            }
            setLoading(false);
        };
        fetchHotels();
    }, []);

    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p>Error loading hotels: {error}</p>;

    const handleHotelClick = (hotelId) => {
        navigate(`/hotel-details/${hotelId}`); 
    };

    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p>Error loading hotels: {error}</p>;

    return (
        <div className="hotel-list">
            <HotelHeader />
            {hotels.map((hotel) => (
                <div key={hotel._id} onClick={() => handleHotelClick(hotel._id)}> 
                    <HotelCard hotel={hotel} />
                </div>
            ))}
        </div>
    );
};

export default Hotel;