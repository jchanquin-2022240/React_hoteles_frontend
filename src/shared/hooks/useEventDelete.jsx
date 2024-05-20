import { useState } from "react";
import toast from "react-hot-toast";
import { eventDelete } from "../../service/api";

export const useDeleteEvent = () => {
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteEvent = async (id) => {
        setIsDeleting(true);
        console.log('use:' + id)
        const response = await eventDelete(id);
        console.log('use: response:' + response)

        setIsDeleting(false);

        if (response.error) {
            return toast.error(
                response.e?.response?.data ||
                'Error occurred when deleting event'
            );
        }

        toast.success('Event deleted successfully');
    };

    return {
        isDeleting,
        deleteEvent
    };
};
