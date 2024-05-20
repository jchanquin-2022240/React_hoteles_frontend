
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Logo } from "./Logo";
import { Input } from "./Input";
import {
    emailValidationMessage,
    passwordValidationMessage,
    passwordConfirmationMessage,
    validateUsernameMessage,
    validatePasswordConfirm,
    validateUsername,
    validateEmail,
    validatePassword,
} from "../shared/validators";
import { useRegister } from "../shared/hooks";

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        email: {
            value: "",
            isValid: false,
            showError: false,
        },
        username: {
            value: "",
            isValid: false,
            showError: false,
        },
        password: {
            value: "",
            isValid: false,
            showError: false,
        },
        passwordConfirm: {
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
            case "email":
                isValid = validateEmail(value);
                break;
            case "username":
                isValid = validateUsername(value);
                break;
            case "password":
                isValid = validatePassword(value);
                break;
            case "passwordConfirm":
                isValid = validatePasswordConfirm(formState.password.value, value);
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

    const handleRegister = (event) => {
        event.preventDefault();
        register(
            formState.username.value,
            formState.email.value,
            formState.password.value
        );
    };

    const isSubmitButtonDisabled =
        isLoading ||
        !formState.password.isValid ||
        !formState.email.isValid ||
        !formState.username.isValid ||
        !formState.passwordConfirm.isValid;

    return (
        <div>
            <Logo text={"Registrar"} />
            <form>
                <Input
                    field="email"
                    label="Email"
                    value={formState.email.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.email.showError}
                    validationMessage={emailValidationMessage}
                />
                <Input
                    field="username"
                    label="Username"
                    value={formState.username.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.username.showError}
                    validationMessage={validateUsernameMessage}
                />
                <Input
                    field="password"
                    label="Password"
                    value={formState.password.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.password.showError}
                    validationMessage={passwordValidationMessage}
                />
                <Input
                    field="passwordConfirm"
                    label="Password Confirmation"
                    value={formState.passwordConfirm.value}
                    onChangeHandler={handleInputValueChange}
                    type="text"
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.passwordConfirm.showError}
                    validationMessage={passwordConfirmationMessage}
                />
                <button onClick={handleRegister} disabled={isSubmitButtonDisabled}>
                    Registrar
                </button>
            </form>
            <span onClick={switchAuthHandler}>
                Ya puedes iniciar sesión
            </span>
        </div>
    );
};
