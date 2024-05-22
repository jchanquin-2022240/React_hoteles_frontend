import React, { useState, useEffect } from 'react';
import { DatePicker } from './DatePicker';
import { Input } from './Input';
import { useResources } from '../shared/hooks/useResources';
import { ResourceSelector } from '../components/ResourceSelector'
import { EventTypeSelector } from './EventTypeSelector';
import './formEvent.css'

export const EventForm = ({ event, onSave, onCancel }) => {

    const [formData, setFormData] = useState({
        nameEvent: event?.nameEvent || '',
        descriptionEvent: event?.descriptionEvent || '',
        date: event?.date ? new Date(event.date) : new Date(),
        startTime: event?.startTime || '',
        endingTime: event?.endingTime || '',
        typeEvent: event?.typeEvent || '',
        resources: event?.resources ? event.resources[0] : []
    });

    const [validationMessage, setValidationMessage] = useState('');
    const { resources, getResource, isFetching } = useResources();

    useEffect(() => {
        getResource();
    }, [getResource]);

    const handleChange = (value, field) => {
        if (field === 'resources' && Array.isArray(value)) {
            const newResources = [...formData.resources];
            newResources.push(...value);
            setFormData(prevState => ({
                ...prevState,
                [field]: newResources
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [field]: value
            }));
        }
    };
    const handleBlur = (value, field) => {
        if (field === 'nameEvent' && !value.trim()) {
            setValidationMessage('El nombre del evento es obligatorio');
        } else {
            setValidationMessage('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nameEvent || !formData.descriptionEvent || !formData.date || !formData.startTime || !formData.endingTime || !formData.typeEvent || !formData.resources) {
            setValidationMessage('Todos los campos son obligatorios');
            return;
        }

        if (formData.startTime >= formData.endingTime) {
            setValidationMessage('La hora de inicio debe ser menor que la hora de fin');
            return;
        }

        setValidationMessage('');

        onSave({
            nameEvent: formData.nameEvent,
            descriptionEvent: formData.descriptionEvent,
            date: formData.date.toISOString(),
            startTime: formData.startTime,
            endingTime: formData.endingTime,
            typeEvent: formData.typeEvent,
            resources: [formData.resources]
        });
    };

       return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onCancel}>Cerrar</button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Input
                            field="nameEvent"
                            label="Nombre del Evento"
                            value={formData.nameEvent}
                            onChangeHandler={(value) => handleChange(value, 'nameEvent')}
                            onBlurHandler={(value) => handleBlur(value, 'nameEvent')}
                            type="text"
                        />
                    </div>
                    <div>
                        <Input
                            field="descriptionEvent"
                            label="Descripción"
                            value={formData.descriptionEvent}
                            onChangeHandler={(value) => handleChange(value, 'descriptionEvent')}
                            onBlurHandler={(value) => handleBlur(value, 'descriptionEvent')}
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
                            onChangeHandler={(value) => handleChange(value, 'startTime')}
                            onBlurHandler={(value) => handleBlur(value, 'startTime')}
                            type="time"
                        />
                    </div>
                    <div>
                        <Input
                            field="endingTime"
                            label="Hora de Fin"
                            value={formData.endingTime}
                            onChangeHandler={(value) => handleChange(value, 'endingTime')}
                            onBlurHandler={(value) => handleBlur(value, 'endingTime')}
                            type="time"
                        />
                    </div>
                    <ResourceSelector
                        resources={resources}
                        value={formData.resources}
                        onChange={(value) => handleChange(value, 'resources')}
                    />
                    <EventTypeSelector
                        value={formData.typeEvent}
                        onChange={(value) => handleChange(value, 'typeEvent')}
                    />
                    <div>
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onCancel}>Cancelar</button>
                    </div>
                    {validationMessage && <p>{validationMessage}</p>}
                </form>
            </div>
        </div>
    );
    };