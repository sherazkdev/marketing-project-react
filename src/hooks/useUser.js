import React,{useEffect, useState} from "react";

// Api Instance
import { VerifyUserAccessToken } from "../api/instance";

const useUser = () => {

    // State
    const [Data,SetData] = useState({
        UserLoading:false,
        UserError:null,
        User:null
    });

    useEffect( () => {
    
        const HandleFetchUserAndVerifyAccessToken = async () => {
            try {
                SetData( (prevValues) => ({...prevValues,UserLoading:true}));
                const fetchedUser = await VerifyUserAccessToken();
                console.log(fetchedUser)
                if(fetchedUser.data?.statusCode === 200 && fetchedUser.data?.success === true){
                    SetData( (prevValues) => ({...prevValues,User:fetchedUser.data?.data,UserLoading:false}));
                    return true;
                }else {
                    SetData( (prevValues) => ({...prevValues,User:fetchedUser.data?.data,UserLoading:false,UserError:"Error: Some thing wrong"}));
                    return false;
                }
            } catch (e) {
                SetData( (prevValues) => ({...prevValues,UserError:e?.response?.message || e?.response || e?.message || e,UserLoading:false}));
                return false;
            }
        };

        const functionTimer = setTimeout(HandleFetchUserAndVerifyAccessToken,100);

        // Clean up function
        return () => clearTimeout(functionTimer);
    },[])

    return Data;

};

export default useUser;