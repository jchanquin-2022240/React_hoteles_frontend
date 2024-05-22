import { useState } from "react";
import { postHabitacion as postHabitacionRequest } from "../../services/api";
import toast from "react-hot-toast";

export const usePostHabitacion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const postHabitacion = async (numero, tipo, capacidad, precio, idHotel) => {
        setIsLoading(true);

        const response = await postHabitacionRequest({
            numero,
            tipo,
            capacidad,
            precio,
            idHotel
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
