export const validateFechaFinAfterFechaInicio = (fechaInicio, fechaFin) => {
    return new Date(fechaFin) > new Date(fechaInicio);
}