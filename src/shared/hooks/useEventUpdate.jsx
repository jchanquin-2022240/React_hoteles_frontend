import { useState } from "react";
import toast from "react-hot-toast";
import { eventPut } from "../../service/api";


export const useEventUpdate = (initialEvents) => {
    const [events, setEvents] = useState(initialEvents);
    const [isUpdating, setIsUpdating] = useState(false);

    const updateEvent = async (id, data) => {
        setIsUpdating(true);
        const response = await eventPut(id, data);
        setIsUpdating(false);

        if (response.error) {
            return toast.error(
                response.e?.response?.data ||
                'Error occurred when updating event'
            );
        }

        const updatedEvents = events.map(event => {
            if (event._id === id) {
                return {
                    ...event,
                    ...data
                };
            }
            return event;
        });
        setEvents(updatedEvents);

        toast.success('Event updated successfully');
    };

    return {
        isUpdating,
        events,
        updateEvent
    };
};