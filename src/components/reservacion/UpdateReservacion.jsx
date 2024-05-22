/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useUpdateReservacion } from "../../shared/hooks/useUpdateReservacion";
//import './editHabitacion.css';

export const UpdateReservacion = ({ reservacion, onClose }) => {
    const { updateReservacion, isLoading } = useUpdateReservacion();
    const [formState, setFormState] = useState({
        fechaInicio: '',
        fechaFin: '',
        huespedes: ''


    });

    useEffect(() => {
        if (reservacion) {
            setFormState({
                fechaInicio: reservacion.fechaInicio,
                fechaFin: reservacion.fechaFin,
                huespedes: reservacion.huespedes
            });
        }
    }, [reservacion]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateReservacion(reservacion._id, formState);
            onClose();
        } catch (error) {
            console.error("Error al actualizar la habitación:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Habitación</h2>
                <form onSubmit={handleSubmit}>
                    <label>Fecha Inicio:</label>
                    <input
                        type="date"
                        name="fechaInicio"
                        value={formState.fechaInicio}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Fecha Fin:</label>
                    <input
                        type="date"
                        name="fechaFin"
                        value={formState.fechaFin}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Huespedes:</label>
                    <input
                        type="text"
                        name="huespedes"
                        value={formState.huespedes}
                        onChange={handleInputChange}
                        required
                    />
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

