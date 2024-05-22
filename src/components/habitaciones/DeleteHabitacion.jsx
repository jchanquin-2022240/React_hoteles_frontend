import React, { useState, useEffect } from 'react';
import { getHabitaciones } from '../../services/api';
import { HabitacionCard } from '../HabitacionCard';

export const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);

    useEffect(() => {
        const fetchHabitaciones = async () => {
            const response = await getHabitaciones();
            if (!response.error) {
                setHabitaciones(response.data.habitaciones);
            } else {
                console.error(response.e);
            }
        };
        fetchHabitaciones();
    }, []);

    const handleHabitacionDeleted = (id) => {
        setHabitaciones(prevState => prevState.filter(habitacion => habitacion._id !== id));
    };

    return (
        <div>
            <h1>Lista de Habitaciones</h1>
            <HabitacionCard habitaciones={habitaciones} onHabitacionDeleted={handleHabitacionDeleted} />
        </div>
    );
};