import { useState } from "react";
import { SignInUser, SignUpUser, CheckUniqueUsername, CheckUniqueEmail, SendOtp, VerifyOtp } from "../api/instance";

const useAuth = () => {
    const [Data, SetData] = useState({
        AuthLoading: false,
        AuthError: null,
        AuthSuccess: false,
        OtpLoading: false,
        OtpError: null,
        VerifyLoading: false,
        VerifyError: null,
        VerifiedUser: null
    });

    const HandleSignIn = async (payload) => {
        try {
            SetData(prev => ({...prev, AuthLoading: true, AuthError: null}));
            const response = await SignInUser(payload);
            
            if(response.data?.statusCode === 200 && response.data?.success === true) {
                SetData(prev => ({...prev, AuthLoading: false, AuthSuccess: true, AuthError: null}));
                return { success: true, user: response.data?.data };
            } else {
                SetData(prev => ({...prev, AuthLoading: false, AuthError: "Login failed. Please try again.", AuthSuccess: false}));
                return { success: false, error: "Login failed" };
            }
        } catch (e) {
            const errorMsg = e?.response?.data?.message || e?.response?.data?.errors?.[0] || e?.message || "An error occurred during login";
            SetData(prev => ({...prev, AuthLoading: false, AuthError: errorMsg, AuthSuccess: false}));
            return { success: false, error: errorMsg };
        }
    };

    const HandleSendOtp = async (payload) => {
        try {
            SetData(prev => ({...prev, OtpLoading: true, OtpError: null}));
            const response = await SendOtp(payload);
            
            if(response.data?.statusCode === 200 && response.data?.success === true) {
                SetData(prev => ({...prev, OtpLoading: false, OtpError: null}));
                return { success: true, user: response.data?.data };
            } else {
                SetData(prev => ({...prev, OtpLoading: false, OtpError: "Failed to send code. Please try again."}));
                return { success: false, error: "Failed to send code" };
            }
        } catch (e) {
            const errorMsg = e?.response?.data?.message || e?.response?.data?.errors?.[0] || e?.message || "An error occurred";
            SetData(prev => ({...prev, OtpLoading: false, OtpError: errorMsg}));
            return { success: false, error: errorMsg };
        }
    };

    const HandleVerifyOtp = async (payload) => {
        try {
            SetData(prev => ({...prev, VerifyLoading: true, VerifyError: null}));
            const response = await VerifyOtp(payload);
            
            if(response.data?.statusCode === 200 && response.data?.success === true) {
                SetData(prev => ({...prev, VerifyLoading: false, VerifyError: null, VerifiedUser: response.data?.data}));
                return { success: true, user: response.data?.data };
            } else {
                SetData(prev => ({...prev, VerifyLoading: false, VerifyError: "Invalid code. Please try again."}));
                return { success: false, error: "Invalid code" };
            }
        } catch (e) {
            const errorMsg = e?.response?.data?.message || e?.response?.data?.errors?.[0] || e?.message || "An error occurred";
            SetData(prev => ({...prev, VerifyLoading: false, VerifyError: errorMsg}));
            return { success: false, error: errorMsg };
        }
    };

    const HandleSignUp = async (payload) => {
        try {
            SetData(prev => ({...prev, AuthLoading: true, AuthError: null}));
            const response = await SignUpUser(payload);
            
            if(response.data?.statusCode === 200 && response.data?.success === true) {
                SetData(prev => ({...prev, AuthLoading: false, AuthSuccess: true, AuthError: null}));
                return { success: true, user: response.data?.data };
            } else {
                SetData(prev => ({...prev, AuthLoading: false, AuthError: "Signup failed. Please try again.", AuthSuccess: false}));
                return { success: false, error: "Signup failed" };
            }
        } catch (e) {
            const errorMsg = e?.response?.data?.message || e?.response?.data?.errors?.[0] || e?.message || "An error occurred during signup";
            SetData(prev => ({...prev, AuthLoading: false, AuthError: errorMsg, AuthSuccess: false}));
            return { success: false, error: errorMsg };
        }
    };

    const HandleCheckUsername = async (username) => {
        try {
            const response = await CheckUniqueUsername({username});
            return response.data?.data === false;
        } catch (e) {
            return false;
        }
    };

    const HandleCheckEmail = async (email) => {
        try {
            const response = await CheckUniqueEmail({email});
            return response.data?.data === false;
        } catch (e) {
            return false;
        }
    };

    return { Data, HandleSignIn, HandleSignUp, HandleSendOtp, HandleVerifyOtp, HandleCheckUsername, HandleCheckEmail };
};

export default useAuth;

