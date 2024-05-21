import { useState } from "react";
import { Input } from "../Input";
import { usePostHabitacion } from "../../shared/hooks";
import {
    validateHabitacionNombre,
    validateHabitacionTipo,
    validateHabitacionCapacidad,
    validateHabitacionPrecio,
} from "../../shared/validators";
import "./postHabitacion.css";

export const PostHabitacion = () => {
    const { postHabitacion, isLoading } = usePostHabitacion();

    const [formState, setFormState] = useState({
        nombre: {
            value: "",
            isValid: false,
            showError: false,
        },
        tipo: {
            value: "",
            isValid: false,
            showError: false,
        },
        capacidad: {
            value: "",
            isValid: false,
            showError: false,
        },
        precio: {
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
            case "nombre":
                isValid = validateHabitacionNombre(value);
                break;
            case "tipo":
                isValid = validateHabitacionTipo(value);
                break;
            case "capacidad":
                isValid = validateHabitacionCapacidad(value);
                break;
            case "precio":
                isValid = validateHabitacionPrecio(value);
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

    const handlePostHabitacion = (event) => {
        event.preventDefault();
        console.log('Formulario de habitación', formState);
        postHabitacion(
            formState.nombre.value,
            formState.tipo.value,
            formState.capacidad.value,
            formState.precio.value
        );
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.nombre.isValid ||
        !formState.tipo.isValid ||
        !formState.capacidad.isValid ||
        !formState.precio.isValid;

    return (
        <div className="post-habitacion-container">
            <h2>Registrar Habitación</h2>
            <form>
                <Input
                    field="nombre"
                    label="Nombre"
                    value={formState.nombre.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.nombre.showError}
                    validationMessage="Por favor ingrese un nombre de habitación válido."
                />
                <Input
                    field="tipo"
                    label="Tipo"
                    value={formState.tipo.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.tipo.showError}
                    validationMessage="Por favor ingrese un tipo de habitación válido."
                />
                <Input
                    field="capacidad"
                    label="Capacidad"
                    value={formState.capacidad.value}
                    onChangeHandler={handleInputValueChange}
                    type="number"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.capacidad.showError}
                    validationMessage="Por favor ingrese una capacidad válida."
                />
                <Input
                    field="precio"
                    label="Precio"
                    value={formState.precio.value}
                    onChangeHandler={handleInputValueChange}
                    type="number"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.precio.showError}
                    validationMessage="Por favor ingrese un precio válido."
                />
                <button onClick={handlePostHabitacion} disabled={isSubmitButtonDisabled}>
                    Crear Habitación
                </button>
            </form>
        </div>
    );
};
