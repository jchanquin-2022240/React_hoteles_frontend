export const validateHabitacionNumero = (numero) => {
    const regex = /^(100|[1-9][0-9]?)$/;
    return regex.test(numero);
}