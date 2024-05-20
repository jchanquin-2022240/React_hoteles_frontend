export const validateHuespedes = (huespedes) => {
    const regex = /^[1-9]$|^10$/;
    return regex.test(huespedes);
}