import React,{useEffect, useState} from "react";

// Api Instance
import { LastestAdds } from "../api/instance";

const useAdds = (payload) => {

    // State
    const [Data,SetData] = useState({
        AddsLoading:false,
        AddsError:null,
        Adds:null
    });

    useEffect( () => {
    
        const HandleFetchLatestAdds = async () => {
            try {
                SetData( (prevValues) => ({...prevValues,UserLoading:true}));
                const fetchedLatestAdds = await LastestAdds(payload);
                console.log(fetchedLatestAdds)
                if(fetchedLatestAdds.data?.statusCode === 200 && fetchedLatestAdds.data?.success === true){
                    SetData( (prevValues) => ({...prevValues,Adds:fetchedLatestAdds.data?.data,AddsLoading:false}));
                    return true;
                }else {
                    SetData( (prevValues) => ({...prevValues,Adds:fetchedLatestAdds.data?.data,AddsLoading:false,AddsError:"Error: Some thing wrong"}));
                    return false;
                }
            } catch (e) {
                SetData( (prevValues) => ({...prevValues,AddsError:e?.response?.message || e?.response || e?.message || e,AddsLoading:false}));
                return false;
            }
        };

        const functionTimer = setTimeout(HandleFetchLatestAdds,100);

        // Clean up function
        return () => clearTimeout(functionTimer);
    },[])

    return Data;

};

export default useAdds;