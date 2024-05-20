import { useState } from "react";
import toast from "react-hot-toast";
import { getHabitaciones as getHabitacionesRequest } from '../../services/index';

export const useHabitacion = () => {
    const [habitaciones, setHabitaciones] = useState([]);

    const obtenerHabitaciones = async () => {
        const habitacionData = await getHabitacionesRequest();
        if(habitacionData.error){
            return toast.error(
                habitacionData.e.response?.data || "Error al obtener las habitaciones"
            );
        }
        setHabitaciones(habitacionData.data);

        return habitacionData.data;
    }
}
