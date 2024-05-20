import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { resourceGet as resourceGetRequest } from "../../service/api";

export const useResources = () => {
    const [resources, setResources] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

     const getResource = useCallback(async () => {
        setIsFetching(true);
        try {
            const resourceData = await resourceGetRequest({
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });

            if (resourceData.error) {
                toast.error(
                    resourceData.e?.response?.data || 'Error occurred when reading resources'
                );
            } else {
                setResources(resourceData.data.resources);
            }
        } catch (error) {
            toast.error('Error occurred when fetching resources');
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        getResource,
        resources,
        isFetching,
        allResources: resources,
    };
};