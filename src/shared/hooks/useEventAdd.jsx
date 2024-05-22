import { useState } from "react";
import toast from "react-hot-toast";
import { eventPost as eventPostRequest } from "../../service/api";
import { useNavigate } from "react-router-dom";

export const useEventCreate = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const createEvent = async (nameEvent, descriptionEvent, date, startTime, endingTime, typeEvent, resources) => {
        setIsLoading(true);

        try {
            if (typeof resources === 'string') {
                resources = [resources];
            }
            const response = await eventPostRequest({
                nameEvent,
                descriptionEvent,
                date,
                startTime,
                endingTime,
                typeEvent,
                resources
            });
    
            setIsLoading(false);

            if (response.error) {
                if (response.e?.response?.data?.errors) {
                    const errors = response.e.response.data.errors;
                    const errorMessages = errors.map((error) => error.msg);
                    toast.error(errorMessages.join('\n'));
                } else {
                    toast.error(
                        response.e?.response?.data || "Ocurrió un error al registrar el evento"
                    );
                }
            } else {
                toast.success("Evento registrado exitosamente");
                navigate("/event");
            }
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