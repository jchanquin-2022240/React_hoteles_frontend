import { useState } from "react";
import { deleteHabitacion as deleteHabitacionRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useDeleteHabitacion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteHabitacion = async (id) => {
        setIsLoading(true);

        const response = await deleteHabitacionRequest(id);

        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response.e?.response?.data?.error || 'Ocurrió un error al eliminar la habitación'
            );
        }

        toast.success('¡Habitación eliminada exitosamente!');
        return response.data;
    };

    return {
        deleteHabitacion,
        isLoading
    };
};
