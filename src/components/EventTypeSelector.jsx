import React from 'react';

export const EventTypeSelector = ({ value, onChange }) => {
    return (
        <div>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value, 'typeEvent')}
            >
                <option value="Conferencia">Conferencia</option>
                <option value="Casamiento">Boda</option>
                <option value="Reunion">Reunión</option>
                <option value="Otro">Otro</option>
            </select>
        </div>
    );
};
