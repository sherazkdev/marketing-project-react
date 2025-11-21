import React,{useEffect, useState} from "react";

// Api Instance
import { UpdateAdd } from "../api/instance";

const useUpdateAdd = () => {

    // State
    const [Data,SetData] = useState({
        UpdateLoading:false,
        UpdateError:null,
        UpdatedAdd:null
    });
    
    const HandleUpdateAdd = async (payload) => {
        try {
            SetData( (prevValues) => ({...prevValues,UpdateLoading:true}));
            const updatedAdd = await UpdateAdd(payload);
            
            if(updatedAdd.data?.statusCode === 200 && updatedAdd.data?.success === true){
                SetData( (prevValues) => ({...prevValues,UpdatedAdd:updatedAdd.data?.data,UpdateLoading:false}));
                return true;
            }else {
                SetData( (prevValues) => ({...prevValues,UpdatedAdd:null,UpdateLoading:false,UpdateError:"Error: Something went wrong"}));
                return false;
            }
        } catch (e) {
            SetData( (prevValues) => ({...prevValues,UpdateError:e?.response?.data?.message || e?.response?.message || e?.message || e,UpdateLoading:false}));
            return false;
        }
    };
    

    return {Data,HandleUpdateAdd};

};

export default useUpdateAdd;

