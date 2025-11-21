import React, { useState, useEffect } from 'react';

const TitleInput = ({onChange,value}) => {

    const [title,setTitle] = useState(value || ""); 

    useEffect(() => {
        setTitle(value || "");
    },[value]);
    /** Handle onchange description */
    const HandleOnChangeDescription = (e) => {
        setTitle(e.target.value);
        onChange(e.target.value);
    }

    return (
        <>
            {/* TITLE */}
            <div className="!mb-8 relative">
                <div className="flex justify-between items-center">
                    <p className="text-base font-semibold">Ad title*</p>
                    <span className="text-xs text-gray-500">{title.length}/100</span>
                </div>
                <input 
                    className="w-full border rounded-md !mt-3 !p-3 text-sm" 
                    placeholder="Mention key features (brand, model, age, type)" 
                    value={title} 
                    onChange={HandleOnChangeDescription}
                    maxLength={100}
                />
            </div>        
        </>
    );
}

export default TitleInput;
