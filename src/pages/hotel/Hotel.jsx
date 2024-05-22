import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelHeader from '../../components/HotelHeader';
import HotelCard from '../../components/HotelCard';
import SearchBarHotels from '../../components/SearchBarHotels'; 
import { getHotels, habitacionesByHotelId, getHotelsAvailable } from '../../services/api';

export const Hotel = () => {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const handleHotelClick = (id) => {

        navigate(`/hotel/habitaciones/${id}`);
    };

    const handleSearch = async (searchResults) => {

        setLoading(true);
        try {

            if (searchResults.length > 0) {

                setHotels(searchResults);
                setError(null);
            } else {
                const result = await getHotelsAvailable({});
                if (result.error) {
                    setError(result.e.message);
                } else {
                    setHotels(result.hotels);
                    setError(null);
                }
            }
        } catch (error) {
            console.error('Error searching hotels:', error);
            setError('Error searching hotels');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading hotels...</p>;
    if (error) return <p>Error loading hotels: {error}</p>;

    return (
        <div className="hotel-list">
            <HotelHeader />
            <SearchBarHotels onSearch={handleSearch} /> 
            {hotels.map((hotel) => (
                <div key={hotel._id} onClick={() => handleHotelClick(hotel._id)} className="hotel-card-wrapper">
                    <HotelCard hotel={hotel} />
                </div>
            ))}
        </div>
    );
};

export default Hotel;