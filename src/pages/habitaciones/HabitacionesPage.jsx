/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PostHabitacion } from '../../components/habitaciones/PostHabitacion';
import { HabitacionCard } from '../../components/habitaciones/HabitacionCard';
import { habitacionesByHotelId } from '../../services';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/complementos/Navbar';
import { Footer } from '../../components/complementos/Footer';

export const HabitacionesPage = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  console.log('Habitaciones:', habitaciones)
  const id = useParams().id;
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await habitacionesByHotelId(id);
        console.log('Datos obtenidos', response);
        if (!response.error) {
          console.log(response)
          setHabitaciones(response.habitaciones || []);
          console.log('Habitaciones update: ', response.habitaciones);
        } else {
          console.log('Error:', response);
        }
      } catch (error) {
        console.log('Error fetching habitaciones:', error);
      }
    };

    fetchHabitaciones();
  }, []);

  return (
    <div className="habitacion-dashboard">
      <Navbar />
      <h2>Habitaciones</h2>
      <PostHabitacion />
      <HabitacionCard habitaciones={habitaciones} />
      <Footer />
    </div>
  );
};
