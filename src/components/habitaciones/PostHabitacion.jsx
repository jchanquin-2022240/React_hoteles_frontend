import { useState } from "react";
import { Input } from "../Input";
import { usePostHabitacion } from "../../shared/hooks";
import {
    validateHabitacionTipo,
    validateHabitacionCapacidad,
    validateHabitacionPrecio,
    validateHabitacionNumero,
    validateHabitacionIdHotel
} from "../../shared/validators";

//import "./postHabitacion.css";

export const PostHabitacion = () => {
    const { postHabitacion, isLoading } = usePostHabitacion();

    const [formState, setFormState] = useState({
        numero: {
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
        idHotel: {
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
            case "numero":
                isValid = validateHabitacionNumero(value);
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
            case "idHotel":
                isValid = validateHabitacionIdHotel(value);
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
            formState.numero.value,
            formState.tipo.value,
            formState.capacidad.value,
            formState.precio.value,
            formState.idHotel.value
        );
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.numero.isValid ||
        !formState.tipo.isValid ||
        !formState.capacidad.isValid ||
        !formState.precio.isValid
        !formState.idHotel.isValid;

    return (
        <div className="post-habitacion-container">
            <h2>Registrar Habitación</h2>
            <form>
                <Input
                    field="numero"
                    label="Número"
                    value={formState.numero.value}
                    onChangeHandler={handleInputValueChange}
                    type="number"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.numero.showError}
                    validationMessage="Por favor ingrese un número de habitación válido."
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
                <Input
                    field="idHotel"
                    label="Id Hotel"
                    value={formState.idHotel.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.idHotel.showError}
                    validationMessage="Por favor ingrese un id de hotel válido."
                />
                <button onClick={handlePostHabitacion} disabled={isSubmitButtonDisabled}>
                    Crear Habitación
                </button>
            </form>
        </div>
    );
};
