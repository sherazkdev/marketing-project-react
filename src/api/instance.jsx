import axios from "axios";

// Backend server
const baseUrl = import.meta.env.VITE_SERVER;

/** Verify user */
export const VerifyUserAccessToken = async () => {
    const user = await axios.get(`${baseUrl}/api/v1/users/current-user`,{withCredentials:true});
    return user;
};

/** Post add */
export const PostNewAdd = async (payload) => {
    const postedAdd = await axios.post(`${baseUrl}/api/v1/adds/create-add`,payload,{withCredentials:true});
    console.log(postedAdd);
    return postedAdd;
};

/** Ai Based Description */
export const AiBasedDescription = async (payload) => {
    console.log("isWorking",payload);
    const description = await axios.get(`${baseUrl}/api/v1/adds/generate-description?title=${payload?.title}`,{withCredentials:true})
    console.log(description)
    return description;
}
/** Ai Based Hashtags */
export const AiBasedHashtags = async (payload) => {
    const hashtags = await axios.get(`${baseUrl}/api/v1/adds/generate-hashtags?title=${payload?.title}`,{withCredentials:true})
    return hashtags;
}

/** Latest ads for home page */
export const LastestAdds = async (payload) => {
    const adds = await axios.get(`${baseUrl}/api/v1/adds/get-latest-adds?page=${payload?.page || 1}&limit=${payload?.limit || 30}&sort=${payload?.sort || "DSC"}`,{withCredentials:true});
    return adds;
}

/** Get single add by id */
export const GetSingleAddById = async (payload) => {
    const add = await axios.get(`${baseUrl}/api/v1/adds/get-add?id=${payload?.id}`,{withCredentials:true});
    
    return add;
};

/** Logged in user adds */
export const GetLoggedInUserAdds = async (payload) => {
    const adds = await axios.get(`${baseUrl}/api/v1/adds/get-user-adds`,{withCredentials:true});
    console.log(adds)
    return adds;
};

/** Update add */
export const UpdateAdd = async (payload) => {
    const updatedAdd = await axios.patch(`${baseUrl}/api/v1/adds/update-add`,payload,{withCredentials:true});
    console.log(updatedAdd)
    return updatedAdd;
};

/** Sign in user */
export const SignInUser = async (payload) => {
    const response = await axios.patch(`${baseUrl}/api/v1/users/sign-in`,payload,{withCredentials:true});
    return response;
};

/** Sign up user */
export const SignUpUser = async (payload) => {
    const response = await axios.patch(`${baseUrl}/api/v1/users/sign-up`,payload,{withCredentials:true});
    return response;
};

/** Sign out user */
export const SignOutUser = async () => {
    const response = await axios.post(`${baseUrl}/api/v1/users/sign-out`,{}, {withCredentials:true});
    return response;
};

/** Check unique username */
export const CheckUniqueUsername = async (payload) => {
    const response = await axios.get(`${baseUrl}/api/v1/users/unique-username?username=${payload?.username}`,{withCredentials:true});
    return response;
};

/** Check unique email */
export const CheckUniqueEmail = async (payload) => {
    const response = await axios.get(`${baseUrl}/api/v1/users/check-email?email=${payload?.email}`,{withCredentials:true});
    return response;
};

/** Send OTP */
export const SendOtp = async (payload) => {
    const response = await axios.post(`${baseUrl}/api/v1/users/send-otp`,payload,{withCredentials:true});
    return response;
};

/** Verify OTP */
export const VerifyOtp = async (payload) => {
    const response = await axios.patch(`${baseUrl}/api/v1/users/verify-otp`,payload,{withCredentials:true});
    return response;
};

/** Search adds */
export const SearchAdds = async (payload) => {
    const response = await axios.post(`${baseUrl}/api/v1/adds/search-add`,payload,{withCredentials:true});
    return response;
};

/** Get user profile by id */
export const GetUserProfileById = async (payload) => {
    const response = await axios.post(`${baseUrl}/api/v1/adds/get-user-profile`,payload,{withCredentials:true});
    return response;
};

/** Get user by id */
export const GetUserById = async (payload) => {
    const response = await axios.get(`${baseUrl}/api/v1/users/find-user-by-id?userId=${payload?.userId}`,{withCredentials:true});
    return response;
};


/** Update user avatar */
export const UpdateUserAvatar = async (payload) => {
    const response = await axios.patch(`${baseUrl}/api/v1/users/update-user-avatar`,{avatar: payload.avatar},{withCredentials:true});
    return response;
};

/** Update user fullname */
export const UpdateUserFullname = async (payload) => {
    const response = await axios.patch(`${baseUrl}/api/v1/users/update-user-fullname`,{fullname: payload.fullname},{withCredentials:true});
    return response;
};

/** Update user username */
export const UpdateUserUsername = async (payload) => {
    const response = await axios.patch(`${baseUrl}/api/v1/users/update-user-username`,{username: payload.username},{withCredentials:true});
    return response;
};

/** Delete add */
export const DeleteAdd = async (payload) => {
    const response = await axios.delete(`${baseUrl}/api/v1/adds/delete-add`,{
        data: payload,
        withCredentials:true
    });
    return response;
};