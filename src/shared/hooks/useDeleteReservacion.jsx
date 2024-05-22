import { useState } from "react";
import { deleteReservacion as deleteReservacionRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useDeleteReservacion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteReservacion = async (id) => {
        setIsLoading(true);

        const response = await deleteReservacionRequest(id);

        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response.e?.response?.data?.error || 'Ocurrió un error al eliminar la habitación'
            );
        }

        toast.success('Reservacion eliminada exitosamente!');
        return response.data;
    };

    return {
        deleteReservacion,
        isLoading
    };
};