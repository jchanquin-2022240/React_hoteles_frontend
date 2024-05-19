/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import './reservacionCard.css';

export const ReservacionCard = ({ reservaciones }) => {
    console.log('Reservaciones en ReservacionCard', reservaciones);

    if (reservaciones.length === 0) {
        return <div>No hay reservaciones disponibles</div>;
    }

    return (
        <div className="reservacion-card-container">
          {reservaciones.map((reservacion, index) => (
            <div key={index} className="reservacion-card">
              <div>
                <label>Habitación:</label>
                <div>{reservacion.habitacionId}</div> {/* Ajusta esto según el nombre del campo correcto */}
              </div>
              <div>
                <label>Fecha de Inicio:</label>
                <div>{new Date(reservacion.fechaInicio).toLocaleDateString()}</div>
              </div>
              <div>
                <label>Fecha De Fin:</label>
                <div>{new Date(reservacion.fechaFin).toLocaleDateString()}</div>
              </div>
              <div>
                <label>Cantidad de Huéspedes:</label>
                <div>{reservacion.huespedes}</div>
              </div>
              <div>
                <label>Estado:</label>
                <div>${reservacion.estado}</div>
              </div>
              <div>
                <label>Precio Total:</label>
                <div>${reservacion.precioReservacion}</div>
              </div>
            </div>
          ))}
        </div>
    );
}