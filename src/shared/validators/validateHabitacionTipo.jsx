export const validateHabitacionTipo = (tipo) => {
    const tiposValidos = ["individual", "doble", "suite"];
    return tiposValidos.includes(tipo.toLowerCase());
}
