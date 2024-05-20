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
        if (selectedEvent) {
            await updateEvent(selectedEvent._id, data);
        } else {
            await createEvent(data);
        }
        setSelectedEvent(null);
        setShowForm(false);
        getEvents();
    };

    const handleDelete = async (id) => {
        console.log('handleDelete id:', id);
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
            <button onClick={() => setShowForm(true)}>Agregar Evento</button>
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
            <div>
                {isFetching ? (
                    <p>Cargando eventos...</p>
                ) : (
                    events.length === 0 ? (
                        <p>No hay eventos disponibles.</p>
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
        </div>
    );
};