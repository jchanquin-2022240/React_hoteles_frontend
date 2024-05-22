import React, { useState } from "react";
import { useDeleteHabitacion } from "../../shared/hooks/useDeleteHabitacion";
import EditHabitacion from "../../components/habitaciones/EditHabitacion";
import './habitacionCard.css';

export const HabitacionCard = ({ habitaciones, onHabitacionDeleted }) => {
    const { deleteHabitacion, isLoading: isDeleting } = useDeleteHabitacion();
    const [editingHabitacion, setEditingHabitacion] = useState(null);

    habitaciones = Array.isArray(habitaciones) ? habitaciones : [];
    console.log("habitacionesCard", habitaciones);

    if (habitaciones.length === 0) {
        return <div className="no-habitaciones">No hay habitaciones disponibles</div>;
    }

    const handleEditClick = (habitacion) => {
        setEditingHabitacion(habitacion);
    };

    const handleDeleteClick = async (id) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta habitación?");
        if (confirmed) {
            try {
                await deleteHabitacion(id);
                if (onHabitacionDeleted) {
                    onHabitacionDeleted(id);
                }
            } catch (error) {
                console.error("Error al eliminar la habitación:", error);
            }
        }
    };

    const handleCloseModal = () => {
        setEditingHabitacion(null);
    };

    return (
        <div className="habitacion-card-container">
            <h2 className="h">Habitaciones</h2>
            {habitaciones.map((habitacion, index) => (
                <div key={index} className="habitacion-card">
                    <div>
                        <label><i className="icon">🔢</i>Número:</label>
                        <div>{habitacion.numero}</div>
                    </div>
                    <div>
                        <label><i className="icon">🏷️</i>Tipo:</label>
                        <div>{habitacion.tipo}</div>
                    </div>
                    <div>
                        <label><i className="icon">👥</i>Capacidad:</label>
                        <div>{habitacion.capacidad}</div>
                    </div>
                    <div>
                        <label><i className="icon">💵</i>Precio:</label>
                        <div>${habitacion.precio}</div>
                    </div>
                    <div>
                        <label><i className="icon">🏨</i>Hotel:</label>
                        <div>{habitacion.idHotel}</div>
                    </div>
                    <button className="update" onClick={() => handleEditClick(habitacion)}>Actualizar</button>
                    <button className="delete" onClick={() => handleDeleteClick(habitacion._id)} disabled={isDeleting}>Eliminar</button>
                </div>
            ))}

            {editingHabitacion && (
                <EditHabitacion habitacion={editingHabitacion} onClose={handleCloseModal} />
            )}
        </div>
    );
};
