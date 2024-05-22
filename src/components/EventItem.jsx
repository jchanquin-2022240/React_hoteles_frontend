import React, { useState, useEffect } from 'react';
import { ResourceSelector } from './ResourceSelector';
import { useResources } from '../shared/hooks/useResources';
import { EventUpdateForm } from './FormUpdateEvent';

export const EventItem = ({ event, handleEdit, handleDelete, handleAddResource, handleRemoveResource }) => {
    const [showResourceForm, setShowResourceForm] = useState(false);
    const [resourceId, setResourceId] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const { resources, getResource, isLoading } = useResources();

    useEffect(() => {
        getResource();
    }, [getResource]);


    const handleSubmit = (e) => {
        e.preventDefault(); 
        handleAddResource({ resources: [resourceId] }, event._id);
        setShowResourceForm(false);
        setResourceId('');
    }


    const handleUpdateEvent = async (updatedEvent) => {
        await updatedEvent(updatedEvent._id, updatedEvent)
    };


    return (
        <div key={event._id}>
            <h2>Nombre del evento: {event.nameEvent}</h2>
            <p>Descripcion del evento: {event.descriptionEvent}</p>
            <p>Fecha del evento: {new Date(event.date).toLocaleDateString()}</p>
            <p>Hora de inicio: {event.startTime} - {event.endingTime}</p>
            <p>Hora de finalizacion: {event.typeEvent}</p>
            <p>Precio total: {event.totalPrice}.00Q</p>

            <button onClick={() => handleEdit(event)}>Editar</button>
            <button onClick={() => handleDelete(event._id)}>Eliminar</button>
            <button onClick={() => setShowResourceForm(true)}>Agregar Recurso</button>
            <div>
                <h3>Recursos</h3>
                {event.resources.map(resource => (
                    <div key={resource._id}>
                        <p>{resource.namePackage}</p>
                        <p>{resource.price}.00Q</p>
                        <button onClick={() => handleRemoveResource(resource._id, event._id)}>Eliminar Recurso</button>
                    </div>
                ))}
                {showResourceForm ? (
                    <form onSubmit={handleSubmit}>
                        {isLoading ? (
                            <p>Cargando recursos...</p>
                        ) : (
                            <ResourceSelector
                                resources={resources}
                                value={resourceId}
                                onChange={setResourceId}
                            />
                        )}
                        <button type="submit">Agregar Recurso</button>
                    </form>
                ) : null}
                {showUpdateForm ? (
                    <EventUpdateForm event={event} onUpdate={handleUpdateEvent} onCancel={() => setShowUpdateForm(false)} />
                ) : null}
            </div>
        </div>
    );
};