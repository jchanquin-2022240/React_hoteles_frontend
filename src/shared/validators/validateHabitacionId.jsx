export const validateHabitacionId = (habitacionId) => {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(habitacionId);
}