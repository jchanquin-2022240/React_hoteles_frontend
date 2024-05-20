import { useState } from "react";
import toast from "react-hot-toast";
import { resourcesAdd as resourcesAddRequest } from "../../service/api";

export const useResourcesAdd = (initialResources = []) => {
    const [resources, setResources] = useState(initialResources);
    const [isAdding, setIsAdding] = useState(false);

    const addResource = async (data, id) => {
        setIsAdding(true);
        const response = await resourcesAddRequest(data, id);
        setIsAdding(false);

        if (response.error) {
            return toast.error(
                response.e?.response?.data ||
                'Error occurred when adding resource'
            );
        }

        setResources([...resources, response.data.resource]);

        toast.success('Resource added successfully');
    };

    return {
        isAdding,
        resources,
        addResource
    };
};