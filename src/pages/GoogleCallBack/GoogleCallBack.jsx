import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import useUser from '../../hooks/useUser';
import {AuthContext} from "../../contexts/AuthProvider";

const GoogleCallBack = () => {
    
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    // useUser() hook
    const {User,UserError,UserLoading} = useUser();

    // Auth context
    const {setUser} = useContext(AuthContext);

    // For Redirect
    const Redirect = useNavigate();

    // These useEffect using for Error Handling
    useEffect( () => {
        setError(UserError);
    },[UserError])

    // These useEffect using for Ui Loading
    useEffect( () => {
        setLoading(UserLoading);
    },[UserLoading])

    // User fetched assing the use auth provider
    useEffect( () => {
        if(User !== null){
            setUser(User);
            Redirect(`/`,{replace:false});
        }
    },[User])

    // If any error to show on console
    if(error !== null){
        console.log(error);
    }

    return (
        <div id="loading">Loading...</div>
    )
}

export default GoogleCallBack;
