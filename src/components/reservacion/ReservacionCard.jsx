/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { useDeleteReservacion } from "../../shared/hooks/useDeleteReservacion";
import {UpdateReservacion} from "./UpdateReservacion";
import './reservacionCard.css';

const calcularPrecioTotal = (habitacionPrecio, fechaInicio, fechaFin) => {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const diffTiempo = fechaFinDate.getTime() - fechaInicioDate.getTime();
    const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
    return habitacionPrecio * diffDias;
};

export const ReservacionCard = ({ reservaciones }) => {

    const { deleteReservacion, isLoading: isDeleting } = useDeleteReservacion();
    const [updatingReservacion, setUpdatingReservacion] = useState(null);

    if (reservaciones.length === 0) {
        return <div className="no-reservaciones">No hay reservaciones disponibles</div>;
    }

    const handleUpdateClick = () => {
        toast.error("Necesitas un administrador para actualizar tu reserva");
    };

    /*const handleDeleteClick = () => {
        toast.error("Comunícate con el administrador para cancelar y eliminar tu reserva");
    };*/

    const handleEditClick = (reservacion) => {
        setUpdatingReservacion(reservacion);
    };

    const handleDeleteClick = async (id) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta reservación?");
        if (confirmed) {
            try {
                await deleteReservacion(id);
                if (onReservacionDeleted) {
                    onReservacionDeleted(id);
                }
            } catch (error) {
                console.error("Error al eliminar la reserva:", error);
            }
        }
    };

    const handleCloseModal = () => {
        setUpdatingReservacion(null);
    };

    return (
        <div className="reservacion-card-container">
            <h2 className="h">Reservaciones</h2>
            {reservaciones.map((reservacion, index) => {
                const precioTotal = calcularPrecioTotal(reservacion.habitacion.precio, reservacion.fechaInicio, reservacion.fechaFin);
                return (
                    <div key={index} className="reservacion-card">
                        <div>
                            <label><i className="icon">📅</i>Fecha de Inicio:</label>
                            <div>{new Date(reservacion.fechaInicio).toLocaleDateString()}</div>
                        </div>
                        <div>
                            <label><i className="icon">📅</i>Fecha De Fin:</label>
                            <div>{new Date(reservacion.fechaFin).toLocaleDateString()}</div>
                        </div>
                        <div>
                            <label><i className="icon">💵</i>Precio Total:</label>
                            <div>${precioTotal}</div>
                        </div>
                        <button className="update" onClick={() => handleEditClick(reservacion)}>Actualizar</button>
                        <button className="delete" onClick={() => handleDeleteClick(reservacion._id)} disabled={isDeleting}>Eliminar</button>
                    </div>
                );
            })}

            {updatingReservacion && (
                <UpdateReservacion reservacion={updatingReservacion} onClose={handleCloseModal} />
            )}
        </div>
    );
};