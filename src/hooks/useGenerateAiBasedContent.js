import React,{useEffect, useState} from "react";

// Api Instance
import { AiBasedDescription,AiBasedHashtags } from "../api/instance";

const useGenerateAiBasedContent = () => {

    // State
    const [Data,SetData] = useState({
        AiBasedLoading:false,
        AiBasedError:null,
        Content:null
    });
    
    const HandleGenerateAiBasedContent = async (payload,isGenerateType) => {
        try {
            
            SetData( (prevValues) => ({...prevValues,AiBasedLoading:true}));
            let response = null;
            if(isGenerateType === "hashtags"){
                /** Hashtags Generate */
                response = await AiBasedDescription(payload);

            }else if(isGenerateType === "description"){
                /** Description Generate */
                response = await AiBasedHashtags(payload);            
            }
            if(response.data?.statusCode === 200 && response.data?.success === true && response?.data?.message === "Success: AI based content generated."){
                SetData( (prevValues) => ({AiBasedLoading:false,Content:response?.data?.data,...prevValues}));
                return true;
            }else {
                SetData( (prevValues) => ({AiBasedLoading:false,Content:response?.data?.data,AiBasedError:"Error: some thing wrong",...prevValues}));
            }

        } catch (e) {
            console.log(e)
            SetData( (prevValues) => ({...prevValues,AiBasedError:e?.response?.message || e?.response || e?.message || e,AiBasedLoading:false}));
            return false;
        }
    };
    

    return {Data,HandleGenerateAiBasedContent};

};

export default useGenerateAiBasedContent;