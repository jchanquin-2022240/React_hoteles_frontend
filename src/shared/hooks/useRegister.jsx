import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../../services/api';
import toast from 'react-hot-toast';

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const register = async (username, email, password) => {
        setIsLoading(true);

        const response = await registerRequest({
            username,
            email,
            password
        });

        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response.e?.response?.data || 'Error al iniciar sesión'
            );
        }

        const { userDetails } = response.data;

        localStorage.setItem('user', JSON.stringify(userDetails));

        navigate('/')

    }

    return (
        register,
        isLoading
    )
}