import { useEffect, useState } from "react";
import { createContext } from "react";
import useUser from "../hooks/useUser";
import { SignOutUser } from "../api/instance";

// Auth context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({children}) => {

    // States
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [user,setUser] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [logoutLoading,setLogoutLoading] = useState(false);

    // useUser() hook
    const {User,UserError,UserLoading} = useUser();

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
            setIsAuthenticated(true);
        }
    },[User])

    const handleLogout = async () => {
        if(logoutLoading){
            return;
        }
        try {
            setLogoutLoading(true);
            await SignOutUser();
        } catch (err) {
            console.error(err);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setLogoutLoading(false);
        }
    };

    // If any error to show on console
    if(error !== null){
        console.log(error);
    }

    if(loading){
        return (<h1>Loading...</h1>)
    }

    return (
        <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated,logout:handleLogout,logoutLoading}}>
            {children}
        </AuthContext.Provider>
    );
}