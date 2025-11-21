import React,{useEffect, useState} from "react";

// Api Instance
import { GetLoggedInUserAdds } from "../api/instance";

const useUserAdds = () => {

    // State
    const [Data,SetData] = useState({
        UserAddsLoading:false,
        UserAddsError:null,
        UserAdds:null
    });

    useEffect( () => {
    
        const HandleFetchUserAdds = async () => {
            try {
                SetData( (prevValues) => ({...prevValues,UserAddsLoading:true}));
                const fetchedAdds = await GetLoggedInUserAdds();
                console.log(fetchedAdds)
                if(fetchedAdds.data?.statusCode === 200 && fetchedAdds.data?.success === true){
                    SetData( (prevValues) => ({...prevValues,UserAdds:fetchedAdds.data?.data,UserAddsLoading:false}));
                    return true;
                }else {
                    SetData( (prevValues) => ({...prevValues,UserAdds:fetchedAdds.data?.data,UserAddsLoading:false,UserAddsError:"Error: Some thing wrong"}));
                    return false;
                }
            } catch (e) {
                SetData( (prevValues) => ({...prevValues,UserAddsError:e?.response?.message || e?.response || e?.message || e,UserAddsLoading:false}));
                return false;
            }
        };

        const functionTimer = setTimeout(HandleFetchUserAdds,100);

        // Clean up function
        return () => clearTimeout(functionTimer);
    },[])

    return Data;

};

export default useUserAdds;