import React, { useEffect, useState } from 'react';
import { PostHabitacion } from '../../components/habitaciones/PostHabitacion';
import { HabitacionCard } from '../../components/habitaciones/HabitacionCard';
import { getHabitaciones } from '../../services';

export const DashboardPage = () => {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await getHabitaciones();
        if (!response.error) {
          setHabitaciones(response.data || []);
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
