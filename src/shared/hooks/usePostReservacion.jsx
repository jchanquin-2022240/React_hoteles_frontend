import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { postReservacion as postReservacionRequest } from "../../services/api";
import toast from "react-hot-toast";

export const usePostReservacion = () => {
    const [isLoading, setIsLoading] = useState(false);

    //const navigate = useNavigate();

    const postReservacion = async (habitacionId, fechaInicio, fechaFin, huespedes ) => {
        setIsLoading(true);

        const response = await postReservacionRequest({
            habitacionId,
            fechaInicio,
            fechaFin,
            huespedes
        })

        setIsLoading(false)
        if(response.error){
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al crear la reservación'
            )
        }else {
            toast.success("Reservación creada exitosamente");
            window.location.reload();
        }
    }

    return {
        postReservacion,
        isLoading
    }

    
}

