import { useState } from "react";
import toast from "react-hot-toast";
import { searching as searchingRequest } from "../../service/api";

export const useSearching = () => {
    const [data, setData] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const search = async () => {
        setIsSearching(true);
        const response = await searchingRequest();
        setIsSearching(false);

        if (response.error) {
            return toast.error(
                response.e?.response?.data ||
                'Error occurred when searching'
            );
        }

        setData(response.data);

        toast.success('Search completed successfully');
    };

    return {
        isSearching,
        data,
        search
    };
};