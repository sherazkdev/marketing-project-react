import React,{useEffect, useState} from "react";

// Api Instance
import { GetSingleAddById } from "../api/instance";

const useSingleAdd = () => {

    // State
    const [Data,SetData] = useState({
        SingleAddLoading:false,
        SingleAddError:null,
        SingleAdd:null
    });
    
    const HandleFetchSingleAddById = async (payload) => {
        try {
            SetData( (prevValues) => ({...prevValues,SingleAddLoading:true}));
            const singleAddResponsei = await GetSingleAddById(payload);
            console.log(singleAddResponsei)
            if(singleAddResponsei.data?.statusCode === 200 && singleAddResponsei.data?.success === true){
                SetData( (prevValues) => ({...prevValues,SingleAdd:singleAddResponsei.data?.data,SingleAddLoading:false}));
                return true;
            }else {
                SetData( (prevValues) => ({...prevValues,SingleAdd:singleAddResponsei.data?.data,SingleAddLoading:false,SingleAddError:"Error: Some thing wrong"}));
                return false;
            }
        } catch (e) {
            SetData( (prevValues) => ({...prevValues,SingleAddError:e?.response?.message || e?.response || e?.message || e,SingleAddLoading:false}));
            return false;
        }
    };

    return {Data,HandleFetchSingleAddById};

};

export default useSingleAdd;