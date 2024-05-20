import React from 'react';

export const ResourceSelector = ({ resources, value, onChange }) => {
    const validResources = resources.filter(resource => resource._id && resource.namePackage && resource.price);


    return (
        <div>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value, 'resourceId')}
            >
                <option value="">Seleccionar recurso...</option>
                {validResources.map(resource => (
                    <option key={resource._id} value={resource._id}>
                        {resource.namePackage} --- {resource.price}.00Q
                    </option>
                ))}
            </select>
            {validResources.length === 0 && <p>No hay recursos disponibles.</p>}
        </div>
    );
};