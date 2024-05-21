export const validateHabitacionPrecio = (precio) => {
    const precioNum = parseFloat(precio);
    return precioNum > 0;
}
