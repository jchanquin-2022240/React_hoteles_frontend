/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getReservaciones } from '../../services/api';
import { ReservacionCard } from './ReservacionCard';

export const Reservaciones = () => {
    const [reservaciones, setReservaciones] = useState([]);

    useEffect(() => {
        const fetchReservaciones = async () => {
            const response = await getReservaciones();
            if (!response.error) {
                setReservaciones(response.data.reservaciones);
            } else {
                console.error(response.e);
            }
        };
        fetchReservaciones();
    }, []);

    const handleReservacionDeleted = (id) => {
        setReservaciones(prevState => prevState.filter(reservacion => reservacion._id !== id));
    };

    return (
        <div>
            <h1>Lista de Habitaciones</h1>
            <ReservacionCard habitaciones={reservaciones} onReservacionDeleted={handleReservacionDeleted} />
        </div>
    );
};