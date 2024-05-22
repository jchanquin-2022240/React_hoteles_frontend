export const validateHabitacionCapacidad = (capacidad) => {
    const capacidadNum = parseInt(capacidad, 10);
    return capacidadNum > 0 && capacidadNum <= 10;
}
