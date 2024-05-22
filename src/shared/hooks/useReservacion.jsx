/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
//import { getReservaciones as getReservacionesRequest } from "../../services";

export const useReservacion = () => {
    const  [reservaciones, setReservaciones] = useState([]);
    console.log("reservaciones dataaaaaaaaaaa:", reservaciones)

    const obtenerReservaciones = async () => {
        const reservacionData = await getReservacionesRequest();
        if(reservacionData.error){
            return toast.error(
                reservacionData.e.response?.data || "Error al obtener las reservaciones"
            )
        }
        setReservaciones(reservacionData.data)

        return reservacionData.data;
    }
    
}