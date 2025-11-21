import { useState, useCallback } from "react";
import { SearchAdds } from "../api/instance";

const useSearch = () => {
    const [Data, SetData] = useState({
        SearchLoading: false,
        SearchError: null,
        SearchResults: null
    });

    const HandleSearch = useCallback(async (payload) => {
        try {
            SetData(prev => ({...prev, SearchLoading: true, SearchError: null}));
            const response = await SearchAdds({
                q: payload.query || "",
                sortField: payload.sortField || "createdAt",
                order: payload.order || "ASC",
                page: payload.page || 1,
                limit: payload.limit || 30,
                minPrice: payload.minPrice ?? undefined,
                maxPrice: payload.maxPrice ?? undefined
            });
            
            if(response.data?.statusCode === 200 && response.data?.success === true) {
                SetData(prev => ({...prev, SearchResults: response.data?.data, SearchLoading: false}));
                return { success: true, results: response.data?.data };
            } else {
                SetData(prev => ({...prev, SearchLoading: false, SearchError: "Search failed"}));
                return { success: false, error: "Search failed" };
            }
        } catch (e) {
            const errorMsg = e?.response?.data?.message || e?.message || "An error occurred";
            SetData(prev => ({...prev, SearchLoading: false, SearchError: errorMsg}));
            return { success: false, error: errorMsg };
        }
    }, []);

    return { Data, HandleSearch };
};

export default useSearch;

