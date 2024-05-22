import { useState } from "react";
import { Input } from "../Input";
import { usePostReservacion } from "../../shared/hooks";
import { useParams } from 'react-router-dom';
import {
    validateFecha,
    validateFechaFinAfterFechaInicio,
    validateHuespedes
} from "../../shared/validators";
import "./postReservacion.css";

export const PostReservacion = () => {
    const { id: habitacionId } = useParams(); // Obtener el id de la habitación desde los parámetros de la URL
    const { postReservacion, isLoading } = usePostReservacion();

    const initialFormState = {
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
    };

    const [formState, setFormState] = useState(initialFormState);

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

    const handlePostReservacion = async (event) => {
        event.preventDefault();
        console.log('Formulario de reservación', formState);
        const result = await postReservacion(
            habitacionId, // Pasar el id de la habitación
            formState.fechaInicio.value,
            formState.fechaFin.value,
            formState.huespedes.value
        );

        // Si la reservación se crea con éxito, restablece el formulario
        if (result) {
            setFormState(initialFormState);
        }
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.fechaInicio.isValid ||
        !formState.fechaFin.isValid ||
        !formState.huespedes.isValid;

    return (
        <div className="post-reservacion-container">
            <h2>Registrar Reservación</h2>
            <form>
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
                    label="Huéspedes"
                    value={formState.huespedes.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.huespedes.showError}
                    validationMessage="Por favor ingrese un número de huéspedes válido (1-10)."
                />
                <button onClick={handlePostReservacion} disabled={isSubmitButtonDisabled}>
                    Crear Reservación
                </button>
            </form>
        </div>
    );
};
