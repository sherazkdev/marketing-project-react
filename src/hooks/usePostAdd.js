import React,{useEffect, useState} from "react";

// Api Instance
import { PostNewAdd } from "../api/instance";

const usePublishAdd = () => {

    // State
    const [Data,SetData] = useState({
        AddLoading:false,
        AddError:null,
        Add:null
    });
    
    const HandlePostNewAdd = async (payload) => {
        try {
            SetData( (prevValues) => ({...prevValues,AddLoading:true}));
            const postedAdd = await PostNewAdd(payload);
            console.log(postedAdd);
            
            if(postedAdd.data?.statusCode === 200 && postedAdd.data?.success === true){
                SetData( (prevValues) => ({...prevValues,Add:postedAdd.data?.data,AddLoading:false}));
                return true;
            }else {
                SetData( (prevValues) => ({...prevValues,Add:postedAdd.data?.data,AddLoading:false,AddError:"Error: Some thing wrong"}));
                return false;
            }
        } catch (e) {
            console.log(e)
            SetData( (prevValues) => ({...prevValues,AddError:e?.response?.message || e?.response || e?.message || e,AddLoading:false}));
            return false;
        }
    };
    

    return {Data,HandlePostNewAdd};

};

export default usePublishAdd;