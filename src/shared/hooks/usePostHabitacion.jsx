import { useState } from "react";
import { postHabitacion as postHabitacionRequest } from "../../services/api";
import toast from "react-hot-toast";

export const usePostHabitacion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const postHabitacion = async (nombre, tipo, capacidad, precio) => {
        setIsLoading(true);

        const response = await postHabitacionRequest({
            nombre,
            tipo,
            capacidad,
            precio
        });

        setIsLoading(false);
        if(response.error){
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al crear la habitación'
            );
        }
    }

    return {
        postHabitacion,
        isLoading
    }
}
