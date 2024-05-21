export const validateHabitacionIdHotel = (idHotel) => {
    const regex = /^[a-f\d]{24}$/i;
    return regex.test(idHotel);
}