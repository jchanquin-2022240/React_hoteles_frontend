import { useState } from "react";
import toast from "react-hot-toast";
import { eventPost } from "../../service/api";
import { useNavigate } from "react-router-dom";

export const useEventCreate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const createEvent = async (nameEvent, descriptionEvent, date, startTime, endingTime, typeEvent, resources) => {
        setIsLoading(true);

        try {
            const response = await eventPost({
                name: nameEvent,
                description: descriptionEvent,
                date: date,
                startTime: startTime,
                endTime: endingTime,
                type: typeEvent,
                resourceId: resources
            });

            setIsLoading(false);

            if (response.error) {
                return toast.error(
                    response.e?.response?.data || "Ocurrió un error al registrar el evento"
                );
            }

            toast.success("Evento registrado exitosamente");
            navigate("/event");
        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error al registrar el evento");
        }
    };

    return {
        createEvent,
        isLoading,
    };
};