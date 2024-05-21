/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import toast from 'react-hot-toast';
//import './habitacionCard.css';

export const HabitacionCard = ({ habitaciones }) => {
    habitaciones = Array.isArray(habitaciones) ? habitaciones : [];
    console.log("habitacionesCard", habitaciones)
    if (habitaciones.length === 0) {
        return <div className="no-habitaciones">No hay habitaciones disponibles</div>;

    }

    const handleUpdateClick = () => {
        toast.error("Necesitas un administrador para actualizar la habitación");
    };

    const handleDeleteClick = () => {
        toast.error("Comunícate con el administrador para cancelar y eliminar la habitación");
    };

    return (
        <div className="habitacion-card-container">
            <h2 className="h">Habitaciones</h2>
            {habitaciones.map((habitacion, index) => (
                <div key={index} className="habitacion-card">
                    <div>
                        <label>Número:</label>
                        <div>{habitacion.numero}</div>
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <div>{habitacion.tipo}</div>
                    </div>
                    <div>
                        <label>Capacidad:</label>
                        <div>{habitacion.capacidad}</div>
                    </div>
                    <div>
                        <label>Precio:</label>
                        <div>${habitacion.precio}</div>
                    </div>
                    <div>
                        <label>Hotel:</label>
                        <div>${habitacion.idHotel}</div>
                    </div>
                    <button className="update" onClick={handleUpdateClick}>Actualizar</button>
                    <button className="delete" onClick={handleDeleteClick}>Eliminar</button>
                </div>
            ))}
        </div>
    );
}
