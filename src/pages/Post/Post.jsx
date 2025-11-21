import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import SelectCategory from '../../shared/SelectCategory/SelectCategory';
import UploadAdd from "../../shared/UploadAdd/UploadAdd";
import EditAdd from "../../shared/EditAdd/EditAdd";

const Post = () => {

    const location = useLocation();
    const isEditMode = location.pathname === '/edit';
    
    const [step,setStep] = useState(1);
    const [category,setCategory] = useState({
        category:"",
        index:null
    });
    const [subCategory,setSubCategory] = useState("");

    // Handle Click Category
    const HandleClickCategory = (category,index) => {
        setCategory({category:category,index:index})
        setStep(2);
    };

    // Handle Click SubCategory
    const HandleClickSubCategory = (category) => {
        setSubCategory(category)
        setStep(3);
    };

    if(isEditMode) {
        return (
            <main id="body-wrapper" className='grid grid-col-[auto_1fr]'>
                <Header />
                <EditAdd />
            </main>
        );
    }

    return (
        <main id="body-wrapper" className='grid grid-col-[auto_1fr]'>
            <Header />
            {step === 1 && (<SelectCategory HandleClickCategory={HandleClickCategory} variant='category'/>)}
            {step === 2 && (<SelectCategory category={category} variant="subCategory" subCategory={subCategory} HandleClickCategory={HandleClickCategory} HandleClickSubCategory={HandleClickSubCategory} />)}
            {step === 3 && (<UploadAdd category={category} subCategory={subCategory}/>)}
        
        </main>
    );
}

export default Post;
