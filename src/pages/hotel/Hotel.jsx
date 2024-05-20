import React, { useEffect, useState } from 'react';
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

    return (
        <div className="hotel-list">
            {hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
            ))}
        </div>
    );
};

export default Hotel;