/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import toast from 'react-hot-toast'; // Importar la biblioteca de toast
import './reservacionCard.css';

export const ReservacionCard = ({ reservaciones }) => {
    console.log('Reservaciones en ReservacionCard', reservaciones);

    if (reservaciones.length === 0) {
        return <div className="no-reservaciones">No hay reservaciones disponibles</div>;
    }

    const handleUpdateClick = () => {
        toast.error("Necesitas un administrador para actualizar tu reserva");
    };

    const handleDeleteClick = () => {
        toast.error("Comunícate con el administrador para cancelar y eliminar tu reserva");
    };

    return (
        <div className="reservacion-card-container">
            <h2 className="h">Reservaciones</h2>
            {reservaciones.map((reservacion, index) => (
                <div key={index} className="reservacion-card">
                    <div>
                        <label><i className="icon">🛏️</i>Habitación:</label>
                        <div>{reservacion.habitacionId}</div> {/* Ajusta esto según el nombre del campo correcto */}
                    </div>
                    <div>
                        <label><i className="icon">📅</i>Fecha de Inicio:</label>
                        <div>{new Date(reservacion.fechaInicio).toLocaleDateString()}</div>
                    </div>
                    <div>
                        <label><i className="icon">📅</i>Fecha De Fin:</label>
                        <div>{new Date(reservacion.fechaFin).toLocaleDateString()}</div>
                    </div>
                    <div>
                        <label><i className="icon">🔖</i>Estado:</label>
                        <div>{reservacion.estado}</div>
                    </div>
                    <div>
                        <label><i className="icon">💵</i>Precio Total:</label>
                        <div>${reservacion.precioReservacion}</div>
                    </div>
                    <button className="update" onClick={handleUpdateClick}>Actualizar</button>
                    <button className="delete" onClick={handleDeleteClick}>Eliminar</button>
                </div>
            ))}
        </div>
    );
}