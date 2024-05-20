import { useState } from "react";
import toast from "react-hot-toast";
import { deleteResource as deleteResourceRequest } from "../../service/api";

export const useDeleteResource = () => {
    const [isLoading, setIsLoading] = useState(false);

    const removeResource = async (eventId, data) => {
        setIsLoading(true);
        const response = await deleteResourceRequest(eventId, data);
        setIsLoading(false);

        if (response.error) {
            toast.error(response.e?.response?.data || 'Ocurrió un error al eliminar el recurso');
            return { success: false };
        }

        toast.success('Recurso eliminado con éxito');
        return { success: true };
    };

    return {
        removeResource,
        isLoading,
    };
};