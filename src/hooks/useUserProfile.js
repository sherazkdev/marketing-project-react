import { useState } from "react";
import { GetUserProfileById, GetUserById } from "../api/instance";

const useUserProfile = () => {
    const [Data, SetData] = useState({
        ProfileLoading: false,
        ProfileError: null,
        Profile: null,
        User: null
    });

    const HandleFetchProfile = async (userId) => {
        try {
            SetData(prev => ({...prev, ProfileLoading: true, ProfileError: null}));
            
            const userResponse = await GetUserById({userId: userId});
            
            if(userResponse.data?.statusCode === 200 && userResponse.data?.success === true) {
                const user = userResponse.data?.data;
                
                const profileResponse = await GetUserProfileById({_id: userId});
                
                SetData(prev => ({
                    ...prev, 
                    Profile: profileResponse.data?.data || [],
                    User: user,
                    ProfileLoading: false
                }));
                return { success: true, profile: profileResponse.data?.data || [], user: user };
            } else {
                SetData(prev => ({...prev, ProfileLoading: false, ProfileError: "Failed to load profile"}));
                return { success: false, error: "Failed to load profile" };
            }
        } catch (e) {
            const errorMsg = e?.response?.data?.message || e?.message || "An error occurred";
            SetData(prev => ({...prev, ProfileLoading: false, ProfileError: errorMsg}));
            return { success: false, error: errorMsg };
        }
    };

    return { Data, HandleFetchProfile };
};

export default useUserProfile;

