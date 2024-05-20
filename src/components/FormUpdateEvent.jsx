import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { Input } from './Input';
import { EventTypeSelector } from './EventTypeSelector';

export const EventUpdateForm = ({ event, onUpdate, onCancel }) => {
    const [updatedEvent, setUpdatedEvent] = useState({
        nameEvent: event.nameEvent,
        descriptionEvent: event.descriptionEvent,
        date: new Date(event.date),
        startTime: event.startTime,
        endingTime: event.endingTime,
        typeEvent: event.typeEvent,
    });

    const handleChange = (field, value) => {
        setUpdatedEvent({ ...updatedEvent, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedEvent);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Nombre del Evento"
                value={updatedEvent.nameEvent}
                onChange={(e) => handleChange('nameEvent', e.target.value)}
            />
            <Input
                label="Descripción"
                value={updatedEvent.descriptionEvent}
                onChange={(e) => handleChange('descriptionEvent', e.target.value)}
                textarea
            />
            <DatePicker
                label="Fecha"
                selected={updatedEvent.date}
                onChange={(date) => handleChange('date', date)}
            />
            <Input
                label="Hora de Inicio"
                type="time"
                value={updatedEvent.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
            />
            <Input
                label="Hora de Fin"
                type="time"
                value={updatedEvent.endingTime}
                onChange={(e) => handleChange('endingTime', e.target.value)}
            />
          
            <EventTypeSelector
                label="Tipo de Evento"
                value={updatedEvent.typeEvent}
                onChange={(value) => handleChange('typeEvent', value)}
            />
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
};
