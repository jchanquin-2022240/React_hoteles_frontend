/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ReservacionCard } from '../../components/reservacion/ReservacionCard';
import { PostReservacion } from '../../components/reservacion/PostReservacion';
//import { reservacionesByHabitacionId } from '../../services';
import { getReservaciones as getReservacionesRequest } from '../../services';
import { Navbar } from '../../components/complementos/Navbar';
import { Footer } from '../../components/complementos/Footer';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

export const ReservacionesPage = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const navigate = useNavigate();
  console.log('Reservaciones data:', reservaciones);
  // const id = useParams().id;
  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        const response = await getReservacionesRequest();
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

  const handleHotelClick = () => {

    navigate(`/hotel/habitaciones`);
  };

  return (
    <div>
      <Navbar />
      <button className="button-img" onClick={handleHotelClick}>
        <img src="../../src/assets/img/back.png" />
      </button>
          <PostReservacion />
      <ReservacionCard reservaciones={reservaciones} />
      <Footer />
    </div>
  );
};