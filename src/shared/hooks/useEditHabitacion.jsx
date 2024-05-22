
import { useState } from "react";
import { putHabitacion as putHabitacionRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useEditHabitacion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const editHabitacion = async (id, data) => {
        setIsLoading(true);

        const response = await putHabitacionRequest(id, data);

        setIsLoading(false);
        if (response.error) {
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al actualizar la habitación'
            );
        } else {
            toast.success("Habitación actualizada exitosamente");
            window.location.reload();
        }
    }

    return {
        editHabitacion,
        isLoading
    }
}
