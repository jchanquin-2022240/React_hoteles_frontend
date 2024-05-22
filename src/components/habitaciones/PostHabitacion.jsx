import { useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../Input";
import { usePostHabitacion } from "../../shared/hooks";
import {
    validateHabitacionTipo,
    validateHabitacionCapacidad,
    validateHabitacionPrecio,
    validateHabitacionNumero,
} from "../../shared/validators";
import "./postHabitacion.css";

export const PostHabitacion = () => {
    const { id: idHotel } = useParams(); // Obtener el id del hotel desde los parámetros de la URL
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
        postHabitacion(
            formState.numero.value,
            formState.tipo.value,
            formState.capacidad.value,
            formState.precio.value,
            idHotel // Pasar el id del hotel al postHabitacion
        );
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.numero.isValid ||
        !formState.tipo.isValid ||
        !formState.capacidad.isValid ||
        !formState.precio.isValid;

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
                <select
                    id="tipo"
                    name="tipo"
                    value={formState.tipo.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'tipo')}
                    onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'tipo')}
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="individual">Individual</option>
                    <option value="doble">Doble</option>
                    <option value="suite">Suite</option>
                </select>
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
