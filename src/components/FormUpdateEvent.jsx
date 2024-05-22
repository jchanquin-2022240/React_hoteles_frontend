import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { Input } from './Input';
import { EventTypeSelector } from './EventTypeSelector';

export const EventUpdateForm = ({ event, onUpdate, onCancel }) => {
    const [updatedEvent, setUpdatedEvent] = useState({
        nameEvent: event.nameEvent,
        descriptionEvent: event.descriptionEvent,
        date: new Date(event.date).toISOString(),
        startTime: event.startTime,
        endingTime: event.endingTime,
        typeEvent: event.typeEvent,
    });

    const handleInputValueChange = (value, field) => {

        if (field === 'startTime' || field === 'endingTime') {
            // Verificar si la hora de finalización es menor que la hora de inicio
            if (field === 'endingTime' && new Date(value) <= new Date(updatedEvent.startTime)) {
                console.error("La hora de finalización debe ser mayor que la hora de inicio");
                return;
            }
        }

        setUpdatedEvent((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleInputBlur = (value, field) => {
        if (field === 'date') {
            const isoDate = new Date(value).toISOString();
            setUpdatedEvent((prevState) => ({
                ...prevState,
                date: isoDate,
            }));
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        onUpdate(updatedEvent);
        console.log("Datos del formulario de actualización:", updatedEvent);
    };

    const isSubmitButtonDisabled = !updatedEvent.nameEvent || !updatedEvent.descriptionEvent || !updatedEvent.date || !updatedEvent.startTime || !updatedEvent.endingTime || !updatedEvent.typeEvent;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onCancel}>Cerrar</button>
                <form onSubmit={handleSubmit} className="auth-form">
                    <Input
                        field='nameEvent'
                        label='Nombre del Evento'
                        value={updatedEvent.nameEvent}
                        onChangeHandler={(value) => handleInputValueChange(value, 'nameEvent')}
                        onBlurHandler={(value) => handleInputBlur(value, 'nameEvent')}
                        type='text'
                    />
                    <Input
                        field='descriptionEvent'
                        label='Descripción'
                        value={updatedEvent.descriptionEvent}
                        onChangeHandler={(value) => handleInputValueChange(value, 'descriptionEvent')}
                        onBlurHandler={(value) => handleInputBlur(value, 'descriptionEvent')}
                        textarea
                    />
                    <DatePicker
                        label="Fecha"
                        selected={new Date(updatedEvent.date)}
                        onChangeHandler={(date) => handleInputValueChange(date.toISOString(), 'date')}
                        onBlurHandler={(date) => handleInputBlur(date, 'date')}
                    />
                    <Input
                        field='startTime'
                        label='Hora de Inicio'
                        type="time"
                        value={updatedEvent.startTime}
                        onChangeHandler={(value) => handleInputValueChange(value, 'startTime')}
                        onBlurHandler={(value) => handleInputBlur(value, 'startTime')}
                    />
                    <Input
                        field='endingTime'
                        label='Hora de Fin'
                        type="time"
                        value={updatedEvent.endingTime}
                        onChangeHandler={(value) => handleInputValueChange(value, 'endingTime')}
                        onBlurHandler={(value) => handleInputBlur(value, 'endingTime')}
                    />
                    <EventTypeSelector
                        value={updatedEvent.typeEvent}
                        onChange={(value) => handleInputValueChange(value, 'typeEvent')}
                    />
                    <div>
                        <button type="submit" disabled={isSubmitButtonDisabled}>Guardar</button>
                        <button type="button" onClick={onCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};