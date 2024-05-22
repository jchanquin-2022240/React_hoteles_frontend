import { useState } from "react";
import { updateReservacion as updateReservacionRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useUpdateReservacion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateReservacion = async (id, data) => {
        setIsLoading(true);

        const response = await updateReservacionRequest(id, data);

        setIsLoading(false);
        if(response.error){
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al actualizar la reservacion'
            );
        } else {
            toast.success("Reservacion actualizada exitosamente");
            window.location.reload();
        }
    }

    return {
        updateReservacion,
        isLoading
    }
}