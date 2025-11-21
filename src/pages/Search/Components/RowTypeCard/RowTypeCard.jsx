import React from 'react';
import { Link } from 'react-router-dom';

// Icons
import HeartIcon from "../../../../assets/images/iconHeart_noinline.518fca1551ed70dd22081007ebd49f53.svg";
import { PhoneIcon,ChatIcon } from '../../../../assets/svgs/Icons';

const RowTypeCard = ({add}) => {
    return (
        <article className='w-full h-[235px] border border-olx_border_gray bg-white rounded-[4px] overflow-hidden flex gap-2 items-start'>

            {/* Left section: Add cover image */}
            <div id='left-section' className='w-full max-w-[320px] h-full'>
                <Link to={`/add?id=${add?._id}`}>
                    <img 
                        id='add-cover-image' 
                        src={add?.coverImage || 'https://images.olx.com.pk/thumbnails/575945080-800x600.webp'} 
                        className='w-full h-full object-cover' 
                        alt={add?.title}
                    />
                </Link>
            </div>

            {/* Right section for add info */}
            <div id='right-section' className='flex-1 h-full p-3! flex flex-col justify-between'>
                
                {/* top title and price section */}
                <div className='flex items-start justify-between'>
                    
                    {/* left section */}
                    <div className='flex flex-col'>
                        <h3 className='text-[20px] text-[#002f34] font-semibold'>Rs {add?.price || "0"}</h3>
                        <p className='text-16 font-extralight'>{add?.title || "No title"}</p>
                    </div>
                    
                    {/* heart icon */}
                    <div>
                        <button><img src={HeartIcon} alt="favorite" /></button>
                    </div>
                
                </div>

                {/* last section */}
                <div className='flex flex-col gap-1'>
                    
                    {/* uploaded date */}
                    <div className='flex gap-2 items-center flex-wrap text-sm'>
                        
                        <span className='text-[#406367] font-extralight text-16'>{add?.location || "Location not specified"}</span>
                        <div className='text-[#406367] text-12 font-normal'>•</div>
                        <span className='text-[#406367] text-16 font-extralight'>
                            {add?.createdAt ? new Date(add.createdAt).toLocaleDateString() : "Recently"}
                        </span>

                    </div>

                    {/*  */}
                    <div className='flex gap-1 w-full'>
                        <div id="call-button" className='max-w-[104px] w-full max-h-[40px] h-full'>
                            <button className='flex gap-1 items-center justify-center  text-[#002f34] fill-[#002f34] bg-white border-0 shadow-[inset_0_0_0_var(--btn-border-thickness,.1rem)_var(--btn-border-color,#002f34)] w-full h-full'>
                                <span><PhoneIcon /></span>
                                <span>Call</span>
                            </button>
                        </div>
                        <div id="chat-button" className='max-w-[104px] w-full max-h-[40px] h-full'>
                            <button className='bg-[#002f34] text-white  p-[5px_16px]! w-full h-full flex justify-center items-center gap-1'>
                                <span><ChatIcon /></span>
                                <span>Chat</span>
                            </button>
                        </div>
                    </div>
                
                </div>
            
            </div>

        </article>

    );
}

export default RowTypeCard;
