import React, { useState, useEffect } from 'react';
import { DatePicker } from './DatePicker';
import { Input } from './Input';
import { useResources } from '../shared/hooks/useResources';
import  {ResourceSelector } from '../components/ResourceSelector'
import { EventTypeSelector  } from './EventTypeSelector';

export const EventForm = ({ event, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nameEvent: event?.nameEvent || '',
        descriptionEvent: event?.descriptionEvent || '',
        date: event?.date || new Date(),
        startTime: event?.startTime || '',
        endingTime: event?.endingTime || '',
        typeEvent: event?.typeEvent || '',
        resourceId: ''
    });
    const [validationMessage, setValidationMessage] = useState('');
    const { resources, getResource, isFetching } = useResources();

    useEffect(() => {
        getResource();
    }, [getResource]);

    const handleChange = (value, field) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleBlur = (value, field) => {
        console.log(`Field ${field} blurred with value: ${value}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.nameEvent || !formData.descriptionEvent || !formData.date || !formData.startTime || !formData.endingTime || !formData.typeEvent || !formData.resourceId) {
            setValidationMessage('Todos los campos son obligatorios');
            return;
        }

        if (formData.startTime >= formData.endingTime) {
            setValidationMessage('La hora de inicio debe ser menor que la hora de fin');
            return;
        }

        setValidationMessage('');
        onSave(formData);
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Input
                    field="nameEvent"
                    label="Nombre del Evento"
                    value={formData.nameEvent}
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="text"
                />
            </div>
            <div>
                <Input
                    field="descriptionEvent"
                    label="Descripción"
                    value={formData.descriptionEvent}
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="text"
                    textarea
                />
            </div>
            <div>
                <DatePicker
                    field="date"
                    value={formData.date}
                    onChangeHandler={(date) => handleChange(date, 'date')}
                />
            </div>
            <div>
                <Input
                    field="startTime"
                    label="Hora de Inicio"
                    value={formData.startTime}
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="time"
                />
            </div>
            <div>
                <Input
                    field="endingTime"
                    label="Hora de Fin"
                    value={formData.endingTime}
                    onChangeHandler={handleChange}
                    onBlurHandler={handleBlur}
                    type="time"
                />
            </div>
            <ResourceSelector
                resources={resources}
                value={formData.resourceId}
                onChange={handleChange}
            />
            <EventTypeSelector
                value={formData.typeEvent}
                onChange={handleChange}
            />
            <div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
            {validationMessage && <p>{validationMessage}</p>}
        </form>
    );
};