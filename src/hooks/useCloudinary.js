import axios from "axios";
import React,{useEffect,useState} from "react";

const useCloudinary = () => {
    
    // States
    const [Data,SetData] = useState({
        UploadFileLoading:false,
        UploadFileError:null,
        UploadedFile:null
    });

    /**
     * 1: These useEffect using for video file || image uploading on cloud 
    */
    // Handle Upload Media File
    const HandleUploadFile = async (payload) => {
        try {
            SetData( (prevVars) => ({...prevVars,UploadFileLoading:true}));
            const UploadedFile = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,payload);
            if(UploadedFile?.data !== null){
                SetData( {UploadedFile:UploadedFile.data,UploadFileError:null,UploadFileLoading:false});
                return UploadedFile.data;
            }else {
                SetData( {UploadedFile:UploadedFile.data,UploadFileError:"Error: Some thing wrong",UploadFileLoading:false});
                return UploadedFile.data;
            }
        } catch (error) {
            SetData( (prevVars) => ({...prevVars,UploadFileError:error?.response?.data || error?.response || error,UploadFileLoading:false}));
        }
    };

   return {Data,HandleUploadFile};
};

export default useCloudinary;