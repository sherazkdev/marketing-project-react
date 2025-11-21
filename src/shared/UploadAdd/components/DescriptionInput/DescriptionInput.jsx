import React, { useEffect, useState } from 'react';
import useGenerateAiBasedContent from '../../../../hooks/useGenerateAiBasedContent';

const DescriptionInput = ({onChange,title,value}) => {

    const [descripton,setDescription] = useState(value || ""); 
    const [error,setError] = useState(null);

    useEffect(() => {
        setDescription(value || "");
    },[value]);

    /** Handle onchange description */
    const HandleOnChangeDescription = (e) => {
        setDescription(e.target.value);
        onChange(e.target.value);
    }

    /** Ai Hook */
    const {HandleGenerateAiBasedContent,Data} = useGenerateAiBasedContent();

    /** Content genrating with ai */
    const HandleClickGenerateAi = async () => {
        try {
            const AiBasedContentPayload = {
                title:title
            };
            const isGenerateType = "description";
            const response = await HandleGenerateAiBasedContent(AiBasedContentPayload,isGenerateType);
            console.log(response);
        } catch (e) {
            setError(e);
        }
    };

    // These useEffect using for Error Handling
    useEffect( () => {
        if(Data.Content){
            setDescription(Data.Content);
            onChange(Data.Content);
        }
    },[Data.Content,onChange])

    // If any error to show on console
    if(Data.AiBasedError !== null){
        console.log(Data.AiBasedError);
    }

    return (
        <>
            {/* DESCRIPTION */}
            <div className="!mb-8">
                <div className="flex justify-between items-center">
                    <p className="text-base font-semibold">Description*</p>
                    <span className="text-xs text-gray-500">{descripton?.length}/2000</span>
                </div>
                <div id="description-input" className="w-full border rounded-md !mt-3 !p-3 text-sm min-h-[140px] relative">
                    <textarea 
                        className='w-full h-full min-h-[140px] outline-none'  
                        placeholder="Describe the item you're selling" 
                        onChange={HandleOnChangeDescription} 
                        value={descripton}
                        maxLength={2000}
                    ></textarea>
                    <button 
                        className='bg-[#edeff3] !p-1 absolute bottom-2 right-2 cursor-pointer text-xs' 
                        onClick={HandleClickGenerateAi} 
                        disabled={Data.AiBasedLoading}
                        type="button"
                    >
                        {Data.AiBasedLoading === true ? "Generating..." : "Generate With AI"}
                    </button>
                    {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                </div>
            </div>
        </>
    );
}

export default DescriptionInput;
