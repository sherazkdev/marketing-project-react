import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useContext } from 'react';
import DefualtGroupAvatar from "../../assets/images/iconProfilePicture_noinline.6327fd8895807f09fafb0ad1e3d99b83.svg";
import { ChevDownInput,ChevUpInput, ShareIcon } from '../../assets/svgs/Icons';
import Add from '../../shared/AddCard/Add';
import { AuthContext } from '../../contexts/AuthProvider';
import useUserProfile from '../../hooks/useUserProfile';
import ProfileSkeleton from '../../shared/Skeletons/ProfileSkeleton/ProfileSkeleton';
import SearchNotFound from '../../shared/SearchNotFound/SearchNotFound';

const Profile = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('id');
    const { user: currentUser } = useContext(AuthContext);
    const { Data, HandleFetchProfile } = useUserProfile();
    const [profileUser, setProfileUser] = useState(null);
    const [profileAdds, setProfileAdds] = useState([]);
    const isOwnProfile = !userId || (currentUser && currentUser._id === userId);

    useEffect(() => {
        const targetUserId = userId || currentUser?._id;
        if(targetUserId) {
            HandleFetchProfile(targetUserId);
        }
    }, [userId, currentUser]);

    useEffect(() => {
        if(Data.Profile && Data.User) {
            setProfileUser(Data.User);
            setProfileAdds(Array.isArray(Data.Profile) ? Data.Profile : []);
        }
    }, [Data.Profile, Data.User]);

    if(Data.ProfileLoading) {
        return (
            <div className='w-full bg-olx_bg_white flex justify-center items-center px-4 sm:px-6 z-auto'>
                <div className='max-w-6xl w-full mx-auto py-5 z-auto'>
                    <ProfileSkeleton />
                </div>
            </div>
        );
    }

    if(Data.ProfileError || !profileUser) {
        return (
            <div className='w-full bg-olx_bg_white flex justify-center items-center px-4 sm:px-6 z-auto'>
                <div className='max-w-6xl w-full mx-auto py-5 z-auto'>
                    <SearchNotFound 
                        message="User profile not found."
                        subMessage="The user you're looking for doesn't exist"
                    />
                </div>
            </div>
        );
    }

    return (
        <div id="main-section" className='w-full bg-olx_bg_white flex justify-center items-start px-4 sm:px-6 z-auto'>
            <div id="center-section" className='relative max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 py-6 z-auto'>
                
                {/* left profile section */}
                <div id="left-section" className='flex flex-col gap-4 items-center lg:items-start w-full lg:max-w-[320px]'>

                    {/* avatar */}
                    <div className='w-28 h-28 sm:w-40 sm:h-40'>
                        <img src={profileUser?.avatar || DefualtGroupAvatar} onError={ (e) => e.target.src = DefualtGroupAvatar} className='w-full h-full object-cover rounded-full' alt={profileUser?.fullname} />
                    </div>
                    
                    {/* total published adds length */}
                    <div className='text-center lg:text-left w-full'>
                        <span className='text-15 text-[#002f34] font-bold border-b-2 border-[#002f34] inline-block'>
                            {profileAdds.length} published {profileAdds.length === 1 ? 'ad' : 'ads'}
                        </span>
                        {profileUser?.username && (
                            <p className='text-olx_text_gray text-sm mt-2'>
                                @{profileUser.username}
                            </p>
                        )}
                    </div>

                    {/* Edit profile button for own profile */}
                    {isOwnProfile && (
                        <Link to="/profile/info" className='w-full border border-[#002f34] flex items-center justify-center gap-2 rounded-[4px] p-[10px]! text-[#002f34]'>
                            Edit Profile
                        </Link>
                    )}

                    {/* share profile link */}
                    <div className='w-full'>
                        <button className='w-full border border-[#002f34] flex items-center justify-center gap-2 rounded-[4px] p-[10px]!'>
                            <span><ShareIcon /></span>
                            <span>Share user profile</span>
                        </button>
                    </div>

                    {/* report and block user options */}
                    <div className='flex items-center gap-2 text-sm'>
                        <button className='text-15 text-[#3a77ff] font-bold'>Report user</button>
                        <div className='border border-olx_border_gray_light my-0 h-5'></div>
                        <button className='text-15 text-[#3a77ff] font-bold'>Block user</button>
                    </div>

                </div>

                {/* right active adds */}
                <div id="right-section" className='w-full flex flex-col gap-4'>

                    {/* top section user name */}
                    <div id='top-section' className='flex flex-col gap-1'>
                        <h2 className='text-2xl sm:text-[40px] font-black text-[#002f34]'>{profileUser?.fullname || "User"}</h2>
                        <p className='text-sm text-olx_text_gray'>{profileAdds.length} listings</p>
                    </div>
                    
                    {/* line */}
                    <div id="line" className='w-full border border-olx_border_gray'></div>

                    {/* adds & sorting */}
                    <div id='last-setion' className='flex gap-3 flex-col'>
                        
                        {/* sorting */}
                        <div className='flex flex-wrap gap-2 items-center'>
                            
                            {/* sort by label */}
                            <div>
                                <span>Sort by:</span>
                            </div>

                            {/* option sorting */}
                            <div className='w-full sm:w-auto'>
                                <div id="sort-input" className='w-full sm:w-[220px] flex justify-between p-2! h-10 rounded-[4px] border border-olx_border_gray_light relative'>
                                    <span className='text-[#999999] tex-11'>Sort by Asc</span>
                                    <span className='relative'>
                                        <button className='absolute top-0 right-0'><ChevUpInput /></button>
                                        <button className='absolute top-2 right-0'><ChevDownInput /></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* total records fetc */}
                        <div className='text-sm text-[#002f34]'>
                            Showing {profileAdds.length > 0 ? 1 : 0} - {profileAdds.length} out of {profileAdds.length} ads
                        </div>

                        {/* activated adds */}
                        {profileAdds.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {profileAdds.map((add) => (
                                    <Add key={add._id} add={add} />
                                ))}
                            </div>
                        ) : (
                            <div className='mt-6'>
                                <SearchNotFound 
                                    message="No ads posted yet."
                                    subMessage="This user hasn't posted any ads"
                                />
                            </div>
                        )}
                    </div>
                
                </div>

            </div>
        </div>

    );
}

export default Profile;
