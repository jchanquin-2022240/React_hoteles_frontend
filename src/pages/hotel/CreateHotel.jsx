
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createHotel } from '../../services/api';
import "./hotel.css";

export const CreateHotel = () => {

    const [hotelData, setHotelData] = useState({
        nameHotel: '',
        photo: null,
        description: '',
        installations: '',
        location: '',
        category: '⭐',
        status: true,
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        validateForm();
    }, [hotelData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setHotelData((prevData) => ({
            ...prevData,
            [name]: val,
        }));
    };

    const handleFileChange = (e) => {
        setHotelData((prevData) => ({
            ...prevData,
            photo: e.target.files[0],
        }));
    };

    const validateForm = () => {
        const { nameHotel, description, installations, location, category } = hotelData;
        setIsFormValid(nameHotel && description && installations && location && category);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(hotelData).forEach((key) => {
            formData.append(key, hotelData[key]);
        });

        const result = await createHotel(formData);

        if (!result.error) {
            console.log('Hotel created successfully:', result);
            navigate('/');
        } else {
            console.error('Error creating hotel:', result.e);
        }
    };

    return (
        <div className="create-hotel-form">
            <h1>Crear Hotel</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nameHotel">Nombre del Hotel:</label>
                    <input
                        type="text"
                        id="nameHotel"
                        name="nameHotel"
                        value={hotelData.nameHotel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Foto:</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={hotelData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="installations">Instalaciones:</label>
                    <textarea
                        id="installations"
                        name="installations"
                        value={hotelData.installations}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Ubicación:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={hotelData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Categoría:</label>
                    <select
                        id="category"
                        name="category"
                        value={hotelData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="⭐">⭐</option>
                        <option value="⭐⭐">⭐⭐</option>
                        <option value="⭐⭐⭐">⭐⭐⭐</option>
                        <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                        <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                    </select>
                </div>
                <button type="submit" disabled={!isFormValid}>
                    Crear
                </button>
            </form>
        </div>
    );
};

CreateHotel.propTypes = {
    hotelData: PropTypes.shape({
        nameHotel: PropTypes.string.isRequired,
        photo: PropTypes.string,
        description: PropTypes.string.isRequired,
        installations: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        status: PropTypes.bool.isRequired,
    }),
};

export default CreateHotel;
