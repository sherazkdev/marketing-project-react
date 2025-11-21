import React from 'react';
import { ShareIcon } from '../../../../assets/svgs/Icons';

import FavoriteIcon from "../../../../assets/images/iconHeart_noinline.518fca1551ed70dd22081007ebd49f53.svg";
const AddInfo = ({add}) => {
    return (
        <div id='add-title-&-description' className='w-full flex flex-col gap-7'>

            {/* title and price section */}
            <div id="add-title-price" className='w-full flex justify-between items-center'>

                {/* add title & price */}
                <div>
                    <h1 className='text-[39px] text-[#222222] font-extrabold'>Rs {add?.price}</h1>
                    <p className='text-18 text-[#222222] font-medium'>{add?.title}</p>
                </div>

                {/* share links */}
                <div className='flex gap-2 items-center'>
                    
                    {/* fav icon */}
                    <span><img src={FavoriteIcon} /></span>

                    {/* share icon */}
                    <span><ShareIcon /></span>
                
                </div>
            </div>

            {/* description section */}
            <div id="description-section" className='flex flex-col gap-3'>
                
                <div id="topHeader" className='w-full'>
                    <h1 className='text-24 text-[#222222] font-semibold'>Description</h1>
                </div>

                <div id="descriptio-content">
                    {add?.description}
                </div>
            </div>
        </div>
    );
}

export default AddInfo;
