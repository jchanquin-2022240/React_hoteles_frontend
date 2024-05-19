import { useState } from 'react'
import { Logo } from './Logo'
import { Input } from './Input'
import {
    emailValidationMessage,
    passwordValidationMessage,
    validateEmail,
    validatePassword
} from '../shared/validators'
import { useLogin } from '../shared/hooks'

export const Login = ({ switchAuthHandler }) => {
    const {login, isLoading} = useLogin();

    const [formState, setFormState] = useState({
       email: {
        value: "",
        isValid: false,
        showErrror: false,
       },
       password: {
        value: "",
        isValid: false,
        showErrror: false,
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
            case "password":
                isValid = validatePassword(value);
                break;
            default:
                break;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    };
    
    const handleLogin = (event) => {
        event.preventDefault()

        login(formState.email.value, formState.password.value)
    }

    const isSubmitButtonDisabled = isLoading || !formState.email.isValid || !formState.password.isValid;
    return (
        <div>
            <Logo text={'Kinal Travels'}/>
            <form className=''>
                <Input
                    field='email'
                    label='Correo'
                    value={formState.email.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showError={formState.email.showError}
                    validationMessage={emailValidationMessage}
                />
                <Input
                    field='password'
                    label='Password'
                    value={formState.password.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showError={formState.email.showError}
                    validationMessage={passwordValidationMessage}
                />
                <button onClick={handleLogin}>
                    Iniciar sesión
                </button>
            </form>
            <span onClick={switchAuthHandler} className="auth-form-switch-label">
                ¿Aún no tienes una cuenta? ¡Registrate...!
            </span>        
        </div>
    )
}