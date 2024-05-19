import { useState } from "react";
import { Input } from "../Input";
import { usePostReservacion } from "../../shared/hooks";
import {
    validateHabitacionId,
    validateFecha,
    validateFechaFinAfterFechaInicio,
    validateHuespedes
} from "./validations";

export const PostReservacion = () => {
    const { postReservacion, isLoading } = usePostReservacion();

    const [formState, setFormState] = useState({
        habitacionId: {
            value: "",
            isValid: false,
            showError: false,
        },
        fechaInicio: {
            value: "",
            isValid: false,
            showError: false,
        },
        fechaFin: {
            value: "",
            isValid: false,
            showError: false,
        },
        huespedes: {
            value: "",
            isValid: false,
            showError: false,
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "habitacionId":
                isValid = validateHabitacionId(value);
                break;
            case "fechaInicio":
                isValid = validateFecha(value);
                if (isValid && formState.fechaFin.value) {
                    isValid = validateFechaFinAfterFechaInicio(value, formState.fechaFin.value);
                }
                break;
            case "fechaFin":
                isValid = validateFecha(value);
                if (isValid && formState.fechaInicio.value) {
                    isValid = validateFechaFinAfterFechaInicio(formState.fechaInicio.value, value);
                }
                break;
            case "huespedes":
                isValid = validateHuespedes(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            },
        }));
    };

    const handlePostReservacion = (event) => {
        event.preventDefault();
        console.log('Formulario de reservación', formState);
        postReservacion(
            formState.habitacionId.value,
            formState.fechaInicio.value,
            formState.fechaFin.value,
            formState.huespedes.value
        );
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.habitacionId.isValid ||
        !formState.fechaInicio.isValid ||
        !formState.fechaFin.isValid ||
        !formState.huespedes.isValid;

    return (
        <div>
            <form>
                <Input
                    field="habitacionId"
                    label="Habitacion"
                    value={formState.habitacionId.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.habitacionId.showError}
                    validationMessage="Por favor ingrese un ID de habitación válido."
                />
                <Input
                    field="fechaInicio"
                    label="Fecha de Inicio"
                    value={formState.fechaInicio.value}
                    onChangeHandler={handleInputValueChange}
                    type="date"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.fechaInicio.showError}
                    validationMessage="Por favor ingrese una fecha válida."
                />
                <Input
                    field="fechaFin"
                    label="Fecha de Fin"
                    value={formState.fechaFin.value}
                    onChangeHandler={handleInputValueChange}
                    type="date"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.fechaFin.showError}
                    validationMessage={formState.fechaFin.isValid ? "Por favor ingrese una fecha válida." : "La fecha de fin debe ser posterior a la fecha de inicio."}
                />
                <Input
                    field="huespedes"
                    label="Huespedes"
                    value={formState.huespedes.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.huespedes.showError}
                    validationMessage="Por favor ingrese un número de huéspedes válido (1-10)."
                />
                <button onClick={handlePostReservacion} disabled={isSubmitButtonDisabled}>
                    Registrar
                </button>
            </form>
        </div>
    );
};