import React, { useState } from 'react';
import { getHotelsAvailable } from '../services/api';

export const SearchBar = ({ onSearch }) => {

    const [searchQuery, setSearchQuery] = useState({
        
        nameHotel: '',
        installations: '',
        location: '',
        category: ''
    });

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setSearchQuery({ ...searchQuery, [name]: value });
    };

    const handleSearch = async () => {

        try {
            const { data } = await getHotelsAvailable(searchQuery);
            onSearch(data.hotels);
        } catch (error) {
            console.error('Error searching hotels:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                name="nameHotel"
                placeholder="Buscar por nombre de hotel"
                value={searchQuery.nameHotel}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="installations"
                placeholder="Buscar por instalaciones"
                value={searchQuery.installations}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="location"
                placeholder="Buscar por ubicación"
                value={searchQuery.location}
                onChange={handleInputChange}
            />
            <select
                name="category"
                value={searchQuery.category}
                onChange={handleInputChange}
            >
                <option value="">Selecciona una categoría</option>
                <option value="⭐">⭐</option>
                <option value="⭐⭐">⭐⭐</option>
                <option value="⭐⭐⭐">⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
            </select>
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default SearchBar;
