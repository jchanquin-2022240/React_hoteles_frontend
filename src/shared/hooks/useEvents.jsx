import { useState, useCallback } from 'react';
import { eventGet as getEventsRequest } from '../../service/api';
import toast from 'react-hot-toast';

export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getEvents = useCallback(async () => {
        setIsFetching(true);
        try {
            const eventData = await getEventsRequest({
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            if (eventData.error) {
                toast.error(
                    eventData.e?.response?.data || 'Error occurred when reading events'
                );
            } else {
                setEvents(eventData.data.events || []);
            }
        } catch (error) {
            toast.error('Error occurred when fetching events');
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        events,
        isFetching,
        getEvents,
    };
};
