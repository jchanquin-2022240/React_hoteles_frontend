export const validateHabitacionNumero = (huespedes) => {
    const regex = /^[1-99]$|^100$/;
    return regex.test(huespedes);
}