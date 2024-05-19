export const validateFecha = (fecha) => {
    return !isNaN(Date.parse(fecha));
}