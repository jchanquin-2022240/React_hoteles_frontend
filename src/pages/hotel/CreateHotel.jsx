import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHotel } from '../../services/api';

export const CreateHotel = () => {

    const [hotel, setHotel] = useState({
        nameHotel: '',
        photo: '',
        description: '',
        installations: '',
        location: '',
        category: '⭐',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setHotel({
            ...hotel,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const response = await createHotel(hotel);
            setError(null);
            console.log('Hotel created successfully:', response);
            navigate('/hotel');
        } catch (e) {

            if (e.response && e.response.status === 400) {
                const validationErrors = e.response.data.errors;
                if (validationErrors && Array.isArray(validationErrors)) {
                    const errorMsg = validationErrors.map(err => err.msg).join(', ');
                    setError(`Validation error: ${errorMsg}`);
                } else {
                    setError(e.response.data.msg || 'Validation error. Please check your input.');
                }
            } else {
                setError('There was an error creating the hotel.');
            }
            console.error(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name Hotel:
                    <input
                        type="text"
                        name="nameHotel"
                        value={hotel.nameHotel}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Photo:
                    <input
                        type="text"
                        name="photo"
                        value={hotel.photo}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={hotel.description}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Installations:
                    <textarea
                        name="installations"
                        value={hotel.installations}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={hotel.location}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Category:
                    <select
                        name="category"
                        value={hotel.category}
                        onChange={handleChange}
                    >
                        <option value="⭐">⭐</option>
                        <option value="⭐⭐">⭐⭐</option>
                        <option value="⭐⭐⭐">⭐⭐⭐</option>
                        <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                        <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                    </select>
                </label>
            </div>
            <button type="submit">Create Hotel</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default CreateHotel;
