
import React, { useState, useEffect } from "react";
import { useEditHabitacion } from "../../shared/hooks/useEditHabitacion";
//import './editHabitacion.css';

const EditHabitacion = ({ habitacion, onClose }) => {
    const { editHabitacion, isLoading } = useEditHabitacion();
    const [formState, setFormState] = useState({
        numero: '',
        tipo: '',
        capacidad: '',
        precio: ''
    });

    useEffect(() => {
        if (habitacion) {
            setFormState({
                numero: habitacion.numero,
                tipo: habitacion.tipo,
                capacidad: habitacion.capacidad,
                precio: habitacion.precio
            });
        }
    }, [habitacion]);

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
            await editHabitacion(habitacion._id, formState);
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
                    <label>Número:</label>
                    <input
                        type="text"
                        name="numero"
                        value={formState.numero}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Tipo:</label>
                    <input
                        type="text"
                        name="tipo"
                        value={formState.tipo}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Capacidad:</label>
                    <input
                        type="number"
                        name="capacidad"
                        value={formState.capacidad}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={formState.precio}
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

export default EditHabitacion;
