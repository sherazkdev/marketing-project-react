import React from 'react';
import { Link } from 'react-router-dom';
import { ChatIcon, ChevronRightIcon,DocumentIcon,PaymentIcon, PhoneIcon } from '../../../../assets/svgs/Icons';

import DefaultProfilePhoto from "../../../../assets/images/iconProfilePicture_noinline.6327fd8895807f09fafb0ad1e3d99b83.svg";
const AddUserProfile = ({owner,activeAdds}) => {
    return (
        <div id="add-uploader-profile" className='flex flex-col gap-4 w-full max-w-[420px]'>

            <div id="top-section" className='w-full h-auto border flex flex-col gap-2 !p-3 border-[#e8ecec]'>

                {/* add uploader  */}
                <Link to={`/profile?id=${owner?._id}`} className='w-full flex gap-1 items-center' aria-label="View seller profile">
                    <div id="avatar" className='w-14 h-14'>
                        <img src={owner?.avatar || DefaultProfilePhoto} onError={ (e) => e.target.src = DefaultProfilePhoto} className='w-full h-full object-cover rounded-full' alt={owner?.fullname || "Seller"} />
                    </div>
                    <div id="posted-by" className='flex items-center gap-3 justify-between w-full'>
                        <div className='flex flex-col'>
                            <span className='text-14 text-[#406367]'>Posted by</span>
                            <span className='text-15 font-medium text-[#222222]'>{owner?.fullname}</span>
                        </div>
                        <div>
                            <ChevronRightIcon className="w-3 h-3"/> 
                        </div>
                    </div>
                </Link>

                {/* line */}
                <div className='bg-[#d8dfe0] h-[1px] m-auto'></div>

                {/* add user info */}
                <div id="user-info" className='flex w-full justify-between'>
                    
                    {/* user created account year */}
                    <div className='flex items-center justify-start gap-1'>
                        
                        {/* icon */}
                        <div><PaymentIcon /></div>
                        
                        {/* member sence */}
                        <div className='flex flex-col'>
                            <span className='text-14 text-[#406367]'>Member Since</span>
                            <span className='text-15 text-[#222222] font-semibold'>{new Date(owner?.createdAt).getFullYear()}</span>
                        </div>

                    </div>
                    
                    {/* user total activated adds */}
                    <div className='flex items-center justify-start gap-1'>
                        {/* icon */}
                        <div><DocumentIcon /></div>
                        
                        {/* member sence */}
                        <div className='flex flex-col'>
                            <span className='text-14 text-[#406367]'>Active adds</span>
                            <span className='text-15 text-[#222222] font-semibold'>{activeAdds}</span>
                        </div>
                    </div>

                </div>
            
            </div>

            <div id="last-section" className='w-full h-auto flex flex-col gap-3'>
                
                <div id="show-email-button" className='w-full flex justify-center items-center'>
                    {/* show email address button */}
                    <button className='!py-2.5 flex gap-2 rounded-[4px] justify-center items-center w-full bg-[#002f34]'>
                        <span><PhoneIcon className="text-olx_text_white"/></span>
                        <span className='text-olx_text_white'>Show email address</span>
                    </button>
                </div>                
                
                <div id="show-chat-button" className='w-full flex justify-center items-center'>
                    {/* show email address button */}
                    <button className='!py-2.5 flex gap-2 rounded-[4px] justify-center items-center w-full border border-[#002f34]'>
                        <span><ChatIcon className="text-olx_text_white"/></span>
                        <span className='text-olx_text_black'>Chat</span>
                    </button>
                </div>

                <div id="show-email-button" className='w-full flex justify-start items-center'>
                    <span className='text-black'>Ad Id : {owner?._id}</span>
                </div>

            </div>
        </div>
    );
}

export default AddUserProfile;
