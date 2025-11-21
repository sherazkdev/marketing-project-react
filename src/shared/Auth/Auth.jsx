import { createPortal } from "react-dom";
import { CloseIcon, OLX_LOGO } from "../../assets/svgs/Icons";

// Icons
import IconGoogle from "../../assets/images/iconGoogleLogin_noinline.633b1f5afb5219bedca01d2367642a28.svg";
import IconFacebook from "../../assets/images/iconFacebookLogin_noinline.70f71af03bbf63ca01a044ff5c5eb342.svg";

// svg icons
import { PhoneIcon,EmailIcon,ChevronRightIcon } from "../../assets/svgs/Icons";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../contexts/AuthProvider";

const Auth = ({ onClose }) => {

    // for handling
    const {setError,register,handleSubmit,watch,formState:{errors}} = useForm();
    const { Data: AuthData, HandleSignIn, HandleSignUp, HandleSendOtp, HandleVerifyOtp, HandleCheckUsername, HandleCheckEmail } = useAuth();
    const { setUser, setIsAuthenticated } = useContext(AuthContext);

    const [selectTypeAuth,setSelectTypeAuth] = useState("select");
    const [signupStep, setSignupStep] = useState(1); // 1: email, 2: OTP, 3: details
    const [signupEmail, setSignupEmail] = useState("");
    const [verifiedUserId, setVerifiedUserId] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);

    const HandleSelectTypeAuth = (type) => {
        setSelectTypeAuth(type);
        setSignupStep(1);
        setSignupEmail("");
        setVerifiedUserId(null);
        setAuthError(null);
        setUsernameError(null);
        setEmailError(null);
    };

    const HandleSendOtpStep = async (email) => {
        setAuthError(null);
        setEmailError(null);
        
        const normalizedEmail = email?.toString().trim().toLowerCase();
        if(!normalizedEmail || !normalizedEmail.includes("@")) {
            setEmailError("Please enter a valid email");
            return;
        }

        const result = await HandleSendOtp({email: normalizedEmail});
        
        if(result.success) {
            setSignupEmail(normalizedEmail);
            setSignupStep(2);
            setVerifiedUserId(null);
        } else {
            setEmailError(result.error || AuthData.OtpError);
        }
    };

    const HandleVerifyOtpStep = async (otp) => {
        setAuthError(null);

        const sanitizedOtp = otp?.toString().trim();
        if(!sanitizedOtp || sanitizedOtp.length !== 6) {
            setAuthError("Please enter the 6-digit code sent to your email");
            return;
        }

        const result = await HandleVerifyOtp({
            email: signupEmail,
            otp: sanitizedOtp
        });
        
        if(result.success && result.user?._id) {
            setVerifiedUserId(result.user._id);
            setSignupStep(3);
        } else {
            setAuthError(result.error || AuthData.VerifyError);
        }
    };

    const HandleLoginFormSubmit = async (data) => {
        setAuthError(null);
        const result = await HandleSignIn({
            inputValue: data.email,
            password: data.password
        });
        
        if(result.success) {
            setUser(result.user);
            setIsAuthenticated(true);
            if(onClose) onClose();
            window.location.reload();
        } else {
            setAuthError(result.error || AuthData.AuthError);
        }
    };

    const HandleSignupFormSubmit = async (data) => {
        if(signupStep === 1) {
            await HandleSendOtpStep(data.email);
            return;
        }
        
        if(signupStep === 2) {
            await HandleVerifyOtpStep(data.otp);
            return;
        }

        if(signupStep === 3) {
            setAuthError(null);
            
            if(data.password !== data.confirmPassword) {
                setAuthError("Passwords do not match");
                return;
            }

            if(data.password.length < 7) {
                setAuthError("Password must be at least 7 characters");
                return;
            }

            if(!verifiedUserId) {
                setAuthError("Please complete email verification first");
                return;
            }

            const username = data.username?.trim();
            if(!username || username.length < 3) {
                setAuthError("Username is required and must be at least 3 characters");
                return;
            }

            const usernameLower = username.toLowerCase();
            if(!usernameLower || usernameLower.length < 3) {
                setAuthError("Username cannot be empty");
                return;
            }

            if(!data.fullname || data.fullname.trim().length < 3) {
                setAuthError("Full name is required and must be at least 3 characters");
                return;
            }

            const result = await HandleSignUp({
                email: signupEmail,
                username: usernameLower,
                fullname: data.fullname.trim(),
                password: data.password,
                avatar: "https://via.placeholder.com/150",
                userId: verifiedUserId
            });
            
            if(result.success) {
                setUser(result.user);
                setIsAuthenticated(true);
                if(onClose) onClose();
                window.location.reload();
            } else {
                setAuthError(result.error || AuthData.AuthError);
            }
        }
    };

    const handleUsernameBlur = async (username) => {
        if(!username || username.length < 3) {
            setUsernameError("Username must be at least 3 characters");
            return;
        }
        setCheckingUsername(true);
        const isAvailable = await HandleCheckUsername(username);
        setCheckingUsername(false);
        if(!isAvailable) {
            setUsernameError("Username already taken");
        } else {
            setUsernameError(null);
        }
    };

    const handleEmailBlur = async (email) => {
        if(!email || !email.includes("@")) {
            setEmailError("Please enter a valid email");
            return;
        }
        setCheckingEmail(true);
        const isAvailable = await HandleCheckEmail(email);
        setCheckingEmail(false);
        if(!isAvailable) {
            setEmailError("Email already registered");
        } else {
            setEmailError(null);
        }
    };

    return createPortal(
        <>
            {/* select type login */}
            {selectTypeAuth === "select" && (
                <div id="auth-overlay" className="w-full fixed flex justify-center items-center h-screen top-0 bg-[rgba(0,0,0,.7)] z-[9999999]">
                    <div id="login-type" className="bg-[#fff] rounded-[4px] max-w-[400px] w-full h-auto">
                        
                        {/* close section */}
                        <div id="close-button" className="w-full flex justify-end items-center">
                            <button onClick={onClose} className="!p-[16px_16px_0px_16px]"><CloseIcon stroke="rgba(0,47,52,.64)"  className="w-5 h-5 text-[#002f34]" /></button>
                        </div>

                        {/* top header */}
                        <div className="flex flex-col gap-3 items-center !mb-3">
                            <OLX_LOGO className="w-[75px] h-[40px]"/>
                            <h2 className="text-[#002f34] text-24 font-semibold">Login into your OLX account</h2>
                        </div>

                        {/* section login section */}
                        <div className="flex items-center flex-col gap-1 !mb-4">
                            
                            {/* google link */}
                            <Link to={`http://localhost:8000/api/v1/users/google/auth`} className="max-w-[336px] w-full text-[#002f34] fill-[#002f34] bg-white border-0 shadow-[inset_0_0_0_var(--btn-border-thickness,.1rem)_var(--btn-border-color,#002f34)] h-[48px] transition-shadow flex items-center justify-center gap-2 rounded-[4px]">
                                <img src={IconGoogle} />
                                <span className="text-[#002f34] text-15 font-semibold">Google</span>
                            </Link>
                            
                            {/* facebook link */}
                            <Link to={``} className="max-w-[336px] w-full text-[#002f34] fill-[#002f34] bg-white border-0 shadow-[inset_0_0_0_var(--btn-border-thickness,.1rem)_var(--btn-border-color,#002f34)] h-[48px] transition-shadow flex items-center justify-center gap-2 rounded-[4px]">
                                <img src={IconFacebook} />
                                <span className="text-[#002f34] text-15 font-semibold">Facebook</span>
                            </Link>

                            {/* or option */}
                            <span>Or</span>

                            {/* Email auth */}
                            <button onClick={ () => HandleSelectTypeAuth("login")} className="max-w-[336px] w-full text-[#002f34] fill-[#002f34] bg-white border-0 shadow-[inset_0_0_0_var(--btn-border-thickness,.1rem)_var(--btn-border-color,#002f34)] h-[48px] transition-shadow flex items-center justify-center gap-2 rounded-[4px] cursor-pointer">
                                <span><EmailIcon /></span>
                                <span className="text-[#002f34] text-15 font-semibold">Email or Password</span>
                            </button>

                            {/* phone Auth */}
                            <button className="max-w-[336px] w-full text-[#002f34] fill-[#002f34] bg-white border-0 shadow-[inset_0_0_0_var(--btn-border-thickness,.1rem)_var(--btn-border-color,#002f34)] h-[48px] transition-shadow flex items-center justify-center gap-2 rounded-[4px] cursor-pointer">
                                <span><PhoneIcon /></span>
                                <span className="text-[#002f34] text-15 font-semibold">Login with Phone</span>
                            </button>

                        </div>

                        {/* create new account option */}
                        <div className="w-full flex justify-center items-center !mb-3">
                            <button onClick={ () => HandleSelectTypeAuth("register")} className="text-[#3a77ff] font-semibold text-16">New to OLX? Create an account</button>
                        </div>

                    </div>
                </div>
            )}

            {/* login type */}
            {selectTypeAuth === "login" && (

                <div id="auth-overlay" className="w-full fixed flex justify-center items-center h-screen top-0 bg-[rgba(0,0,0,.7)] z-[9999999]">
                    <div id="login-type" className="bg-[#fff] rounded-[4px] max-w-[400px] w-full h-auto">
                        <form onSubmit={handleSubmit(HandleLoginFormSubmit)}>

                            {/* top header */}
                            <div className="flex justify-between items-center !p-[10px_10px_0px_10px]">

                                {/* back button */}
                                <button type="button" onClick={() => HandleSelectTypeAuth("select")} className="rotate-180 "><ChevronRightIcon className="w-5 h-5"/></button>
                                
                                {/* close button */}
                                <button type="button" onClick={onClose}><CloseIcon stroke="rgba(0,47,52,.64)"  className="w-5 h-5 text-[#002f34]" /></button>
                            
                            </div>
                            
                            {/* login inputs */}
                            <div className="w-full flex justify-center items-center flex-col gap-5 !mt-10 !p-[16px_20px]">
                                
                                <h1 className="text-24 text-[#002f34] font-semibold">Log in with Email</h1>
                                
                                {authError && (
                                    <div className="w-full bg-red-50 border border-red-200 text-red-700 !p-3 rounded-[4px] text-sm">
                                        {authError}
                                    </div>
                                )}

                                {/* email input */}
                                <div id="email" className="flex flex-col items-start gap-1 w-full">
                                    <label htmlFor="email" className="text-14 w-full text-[#002f34] font-semibold">Email or Username</label>
                                    <div id="email-input" className="w-full h-[48px] border border-[#e8ecec] rounded-[4px]">
                                        <input type="text" id="email" placeholder="Enter email or username"  className="w-full outline-none h-full !px-4" {...register("email",{required:{value:true,message:"Please enter your email or username."}})} />   
                                    </div>
                                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                </div>

                                
                                {/* password input */}
                                <div id="email-input" className="flex flex-col items-start gap-1 w-full">
                                    <label htmlFor="password" className="text-14 text-[#002f34] font-semibold">Password</label>
                                    
                                    <div id="password-input" className="w-full h-[48px] border rounded-[4px] border-[#e8ecec]">
                                        <input type="password" placeholder="Enter password" {...register("password",{required:{value:true,message:"Password is required."}})} id="password" className="w-full outline-none h-full !px-4"/>    
                                    </div>
                                    {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                                </div>


                                {/* for password link */}
                                <div id="forgot-password" className="flex w-full items-start">
                                    <button type="button" className="text-[#3a77ff] text-14 font-semibold">Forgot your password?</button>
                                </div>
                                
                                <div id="submit-button" className="w-full">
<button
  type="submit"
  disabled={AuthData.AuthLoading || !watch("email") || !watch("password")}
  className={`w-full !px-2.5 h-[49px] rounded-[4px]
    ${
      watch("email")?.length > 0 && watch("password")?.length > 0 && !AuthData.AuthLoading
        ? "bg-[#002f34] text-white cursor-pointer"
        : "bg-[#d8dfe0] text-[#7f9799] cursor-not-allowed"
    }
  `}
>
  {AuthData.AuthLoading ? "Logging in..." : "Login"}
</button>
                                
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* signup type */}
            {selectTypeAuth === "register" && (

                <div id="auth-overlay" className="w-full fixed flex justify-center items-center h-screen top-0 bg-[rgba(0,0,0,.7)] z-[9999999]">
                    <div id="login-type" className="bg-[#fff] rounded-[4px] max-w-[400px] w-full h-auto max-h-[90vh] overflow-y-auto">
                        <form onSubmit={handleSubmit(HandleSignupFormSubmit)}>

                            {/* top header */}
                            <div className="flex justify-between items-center !p-[10px_10px_0px_10px]">

                                {/* back button */}
                                <button type="button" onClick={() => {
                                    if(signupStep > 1) {
                                        setSignupStep(signupStep - 1);
                                    } else {
                                        HandleSelectTypeAuth("select");
                                    }
                                }} className="rotate-180 "><ChevronRightIcon className="w-5 h-5"/></button>
                                
                                {/* close button */}
                                <button type="button" onClick={onClose}><CloseIcon stroke="rgba(0,47,52,.64)"  className="w-5 h-5 text-[#002f34]" /></button>
                            
                            </div>
                            
                            {/* Step 1: Email */}
                            {signupStep === 1 && (
                                <div className="w-full flex justify-center items-center flex-col gap-5 !mt-10 !p-[16px_20px]">
                                    <h1 className="text-24 text-[#002f34] font-semibold">Create an account</h1>
                                    
                                    {authError && (
                                        <div className="w-full bg-red-50 border border-red-200 text-red-700 !p-3 rounded-[4px] text-sm">
                                            {authError}
                                        </div>
                                    )}

                                    {emailError && (
                                        <div className="w-full bg-red-50 border border-red-200 text-red-700 !p-3 rounded-[4px] text-sm">
                                            {emailError}
                                        </div>
                                    )}

                                    <div className="flex flex-col items-start gap-1 w-full">
                                        <label htmlFor="email" className="text-14 w-full text-[#002f34] font-semibold">Email Address*</label>
                                        <div className="w-full h-[48px] border border-[#e8ecec] rounded-[4px]">
                                            <input 
                                                type="email" 
                                                id="email" 
                                                placeholder="Enter email"  
                                                className="w-full outline-none h-full !px-4" 
                                                {...register("email",{required:{value:true,message:"Email is required."}})}
                                            />   
                                        </div>
                                        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                    </div>

                                    <div className="w-full">
                                        <button
                                            type="submit"
                                            disabled={AuthData.OtpLoading || !watch("email")}
                                            className={`w-full !px-2.5 h-[49px] rounded-[4px]
                                                ${
                                                    watch("email")?.length > 0 && !AuthData.OtpLoading
                                                        ? "bg-[#002f34] text-white cursor-pointer"
                                                        : "bg-[#d8dfe0] text-[#7f9799] cursor-not-allowed"
                                                }
                                            `}
                                        >
                                            {AuthData.OtpLoading ? "Sending code..." : "Send verification code"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: OTP Verification */}
                            {signupStep === 2 && (
                                <div className="w-full flex justify-center items-center flex-col gap-5 !mt-10 !p-[16px_20px]">
                                    <h1 className="text-24 text-[#002f34] font-semibold">Verify your email</h1>
                                    
                                    <p className="text-sm text-gray-600 text-center">
                                        We sent a verification code to <strong>{signupEmail}</strong>
                                    </p>

                                    {authError && (
                                        <div className="w-full bg-red-50 border border-red-200 text-red-700 !p-3 rounded-[4px] text-sm">
                                            {authError}
                                        </div>
                                    )}

                                    <div className="flex flex-col items-start gap-1 w-full">
                                        <label htmlFor="otp" className="text-14 w-full text-[#002f34] font-semibold">Verification Code*</label>
                                        <div className="w-full h-[48px] border border-[#e8ecec] rounded-[4px]">
                                            <input 
                                                type="text" 
                                                id="otp" 
                                                placeholder="Enter 6-digit code"  
                                                className="w-full outline-none h-full !px-4 text-center text-lg tracking-widest" 
                                                maxLength={6}
                                                {...register("otp",{required:{value:true,message:"Verification code is required."}, minLength:{value:6,message:"Code must be 6 digits"}})}
                                            />   
                                        </div>
                                        {errors.otp && <span className="text-xs text-red-500">{errors.otp.message}</span>}
                                    </div>

                                    <div className="w-full">
                                        <button
                                            type="submit"
                                            disabled={AuthData.VerifyLoading || !watch("otp") || watch("otp")?.length !== 6}
                                            className={`w-full !px-2.5 h-[49px] rounded-[4px]
                                                ${
                                                    watch("otp")?.length === 6 && !AuthData.VerifyLoading
                                                        ? "bg-[#002f34] text-white cursor-pointer"
                                                        : "bg-[#d8dfe0] text-[#7f9799] cursor-not-allowed"
                                                }
                                            `}
                                        >
                                            {AuthData.VerifyLoading ? "Verifying..." : "Verify code"}
                                        </button>
                                    </div>

                                    <button 
                                        type="button"
                                        onClick={() => HandleSendOtpStep(signupEmail)}
                                        className="text-[#3a77ff] text-14 font-semibold"
                                        disabled={AuthData.OtpLoading}
                                    >
                                        Resend code
                                    </button>
                                </div>
                            )}

                            {/* Step 3: Account Details */}
                            {signupStep === 3 && (
                                <div className="w-full flex justify-center items-center flex-col gap-5 !mt-10 !p-[16px_20px]">
                                    <h1 className="text-24 text-[#002f34] font-semibold">Complete your profile</h1>
                                    
                                    {authError && (
                                        <div className="w-full bg-red-50 border border-red-200 text-red-700 !p-3 rounded-[4px] text-sm">
                                            {authError}
                                        </div>
                                    )}

                                    <div className="flex flex-col items-start gap-1 w-full">
                                        <label htmlFor="fullname" className="text-14 w-full text-[#002f34] font-semibold">Full Name*</label>
                                        <div className="w-full h-[48px] border border-[#e8ecec] rounded-[4px]">
                                            <input type="text" id="fullname" placeholder="Enter your full name"  className="w-full outline-none h-full !px-4" {...register("fullname",{required:{value:true,message:"Full name is required."}, minLength:{value:3,message:"Name must be at least 3 characters"}})} />   
                                        </div>
                                        {errors.fullname && <span className="text-xs text-red-500">{errors.fullname.message}</span>}
                                    </div>

                                    <div className="flex flex-col items-start gap-1 w-full">
                                        <label htmlFor="username" className="text-14 w-full text-[#002f34] font-semibold">Username*</label>
                                        <div className="w-full h-[48px] border border-[#e8ecec] rounded-[4px]">
                                            <input 
                                                type="text" 
                                                id="username" 
                                                placeholder="Enter username"  
                                                className="w-full outline-none h-full !px-4" 
                                                {...register("username",{
                                                    required:{value:true,message:"Username is required."},
                                                    minLength:{value:3,message:"Username must be at least 3 characters"},
                                                    validate: (value) => {
                                                        const trimmed = value?.trim();
                                                        if(!trimmed || trimmed.length < 3) {
                                                            return "Username must be at least 3 characters";
                                                        }
                                                        return true;
                                                    }
                                                })}
                                                onBlur={(e) => {
                                                    const val = e.target.value?.trim();
                                                    if(val && val.length >= 3) {
                                                        handleUsernameBlur(val);
                                                    }
                                                }}
                                            />   
                                        </div>
                                        {checkingUsername && <span className="text-xs text-gray-500">Checking...</span>}
                                        {usernameError && <span className="text-xs text-red-500">{usernameError}</span>}
                                        {errors.username && !usernameError && <span className="text-xs text-red-500">{errors.username.message}</span>}
                                    </div>

                                    <div className="flex flex-col items-start gap-1 w-full">
                                        <label htmlFor="password" className="text-14 text-[#002f34] font-semibold">Password*</label>
                                        <div className="w-full h-[48px] border rounded-[4px] border-[#e8ecec]">
                                            <input type="password" placeholder="Enter password (min 7 characters)" {...register("password",{required:{value:true,message:"Password is required."}, minLength:{value:7,message:"Password must be at least 7 characters"}})} id="password" className="w-full outline-none h-full !px-4"/>    
                                        </div>
                                        {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                                    </div>

                                    <div className="flex flex-col items-start gap-1 w-full">
                                        <label htmlFor="confirmPassword" className="text-14 text-[#002f34] font-semibold">Confirm Password*</label>
                                        <div className="w-full h-[48px] border rounded-[4px] border-[#e8ecec]">
                                            <input type="password" placeholder="Confirm password" {...register("confirmPassword",{required:{value:true,message:"Please confirm your password."}})} id="confirmPassword" className="w-full outline-none h-full !px-4"/>    
                                        </div>
                                        {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>}
                                    </div>
                                    
                                    <div className="w-full">
                                        <button
                                            type="submit"
                                            disabled={AuthData.AuthLoading || !watch("fullname") || !watch("username") || !watch("password") || !watch("confirmPassword") || usernameError}
                                            className={`w-full !px-2.5 h-[49px] rounded-[4px]
                                                ${
                                                    watch("fullname")?.length > 0 && watch("username")?.length > 0 && watch("password")?.length > 0 && watch("confirmPassword")?.length > 0 && !AuthData.AuthLoading && !usernameError
                                                        ? "bg-[#002f34] text-white cursor-pointer"
                                                        : "bg-[#d8dfe0] text-[#7f9799] cursor-not-allowed"
                                                }
                                            `}
                                        >
                                            {AuthData.AuthLoading ? "Creating account..." : "Create account"}
                                        </button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            )}

        </>,
        document.body
    )
};

export default Auth