import { useState } from "react";
import toast from "react-hot-toast";
import { eventPut as eventUpdateRequest } from "../../service/api";

export const useEventUpdate = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateEvent = async (eventId, { nameEvent, descriptionEvent, date, startTime, endingTime, typeEvent, resources }) => {
        setIsLoading(true);

        try {
            const response = await eventUpdateRequest(eventId, {
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
                        response.e?.response?.data || "Ocurrió un error al actualizar el evento"
                    );
                }
            } else {
                toast.success("Evento actualizado exitosamente");
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error al actualizar el evento");
        }
    };

    return {
        updateEvent,
        isLoading,
    };
};