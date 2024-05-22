import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { EventForm } from '../../components/FormEvent';
import { useEvents } from '../../shared/hooks/useEvents';
import { useEventCreate } from '../../shared/hooks/useEventAdd';
import { useDeleteEvent } from '../../shared/hooks/useEventDelete';
import { useEventUpdate } from '../../shared/hooks/useEventUpdate';
import { useResourcesAdd } from '../../shared/hooks/useResourceAdd';
import { useDeleteResource } from '../../shared/hooks/useDeleteResource';
import { EventItem } from '../../components/EventItem';
import { EventUpdateForm } from '../../components/FormUpdateEvent';
import './eventPage.css';


export const EventsPage = () => {
    const { events, isFetching, getEvents } = useEvents();
    const { createEvent } = useEventCreate();
    const { deleteEvent } = useDeleteEvent();
    const { updateEvent } = useEventUpdate();
    const { addResource } = useResourcesAdd();
    const { removeResource } = useDeleteResource();

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    const handleSaveEvent = async (data) => {

        const requiredFields = ['nameEvent', 'descriptionEvent', 'date', 'startTime', 'endingTime', 'typeEvent'];
        if (!selectedEvent) {
            requiredFields.push('resources');
        }

        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            console.error("Faltan campos obligatorios:", missingFields.join(', '));
            return;
        }

        if (typeof data.nameEvent !== "string" || !/^[a-zA-Z0-9\s]+$/.test(data.nameEvent)) {
            console.error("El campo nameEvent debe ser una cadena de texto y no contener caracteres no válidos");
            return;
        }

        const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(data.startTime) || !timeRegex.test(data.endingTime)) {
            console.error("El formato de la hora de inicio o fin es incorrecto");
            return;
        }

        if (selectedEvent) {
            await updateEvent(selectedEvent._id, {
                nameEvent: data.nameEvent,
                descriptionEvent: data.descriptionEvent,
                date: data.date,
                startTime: data.startTime,
                endingTime: data.endingTime,
                typeEvent: data.typeEvent
            });
        } else {
            await createEvent(
                data.nameEvent,
                data.descriptionEvent,
                data.date,
                data.startTime,
                data.endingTime,
                data.typeEvent,
                data.resources
            );
        }

        setSelectedEvent(null);
        setShowForm(false);
        getEvents();
    };

    const handleDelete = async (id) => {
        await deleteEvent(id);
        getEvents();
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setShowForm(true);
    };

    const handleAddResource = async (resourceData, eventId) => {
        await addResource(resourceData, eventId);
        getEvents();
    };

    const handleRemoveResource = async (resourceId, eventId) => {
        await removeResource(eventId, { resourceId });
        getEvents();
    };

    return (
        <div>
            <h1>Eventos</h1>
            {showForm && (
                selectedEvent ? (
                    <EventUpdateForm
                        event={selectedEvent}
                        onUpdate={handleSaveEvent}
                        onCancel={() => { setSelectedEvent(null); setShowForm(false); }}
                    />
                ) : (
                    <EventForm
                        onSave={handleSaveEvent}
                        onCancel={() => setShowForm(false)}
                    />
                )
            )}
            <div className="event-card-container">
                {isFetching ? (
                    <p>Cargando eventos...</p>
                ) : (
                    events.length === 0 ? (
                        <p className="no-events">No hay eventos disponibles.</p>
                    ) : (
                        events.map(event => (
                            <EventItem
                                key={event._id}
                                event={event}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                handleAddResource={handleAddResource}
                                handleRemoveResource={handleRemoveResource}
                            />
                        ))
                    )
                )}
            </div>
            {!showForm && ( 
                <button className="add-event-btn" onClick={() => setShowForm(true)}>
                    Agregar Evento
                </button>
            )}
        </div>
    );
};
