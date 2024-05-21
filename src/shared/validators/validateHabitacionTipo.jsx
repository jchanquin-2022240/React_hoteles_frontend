export const validateHabitacionTipo = (tipo) => {
    const tiposValidos = ["simple", "doble", "suite"];
    return tiposValidos.includes(tipo.toLowerCase());
}
