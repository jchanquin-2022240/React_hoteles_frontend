/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PostHabitacion } from '../../components/habitaciones/PostHabitacion';
import { HabitacionCard } from '../../components/habitaciones/HabitacionCard';
import { getHabitaciones } from '../../services';

export const HabitacionesPage = () => {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await getHabitaciones();
        console.log('Datos obtenidos', response.data);
        if (!response.error) {
          setHabitaciones(response.data.habitaciones || []);
          console.log('Habitaciones update: ', response.data.habitaciones);
        } else {
          console.log('Error:', response.data);
        }
      } catch (error) {
        console.log('Error fetching habitaciones:', error);
      }
    };

    fetchHabitaciones();
  }, []);

  return (
    <div className="habitacion-dashboard">
      <h2>Habitaciones</h2>
      <PostHabitacion />
      <HabitacionCard habitaciones={habitaciones} />
    </div>
  );
};
