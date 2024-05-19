/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ReservacionCard } from '../../components/reservacion/ReservacionCard';
import { PostReservacion } from '../../components/reservacion/PostReservacion';
import { getReservaciones } from '../../services/';

export const DashboardPage = () => {
  const [reservaciones, setReservaciones] = useState([]);

  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        const response = await getReservaciones();
        console.log('Datos obtenidos:', response.data);
        if (!response.error) {
          setReservaciones(response.data.reservaciones || []);
          console.log('Reservaciones actualizadas:', response.data.reservacion);
        } else {
          console.log('Error:', response.data);
        }
      } catch (error) {
        console.log('Error fetching blogs:', error);
      }
    };

    fetchReservaciones();
  }, []);

  return (
    <div>
      <ReservacionCard reservaciones={reservaciones} />
      <PostReservacion />
    </div>
  );
};