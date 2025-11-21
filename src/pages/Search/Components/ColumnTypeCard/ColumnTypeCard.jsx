import React from 'react';

// Icons
import IconHeart from "../../../../assets/images/iconHeart_noinline.518fca1551ed70dd22081007ebd49f53.svg";

import { Link } from "react-router-dom";

const ColumnTypeCard = ({add}) => {
    if(!add) return null;
    return (
        <article className="max-w-[309px] w-full h-auto border border-olx_border_gray bg-white rounded-[4px] overflow-hidden flex flex-col">

            {/* add coverImage */}
            <div className="w-full h-48 sm:h-56 bg-[#f4f4f4]">
                <Link to={`/add?id=${add?._id}`}>
                    <img src={add?.coverImage || "https://images.olx.com.pk/thumbnails/575945080-800x600.webp"} alt={add?.title} className="w-full h-full object-cover"/>
                </Link>
            </div>

            {/* add info */}
            <div className="p-4! w-full flex flex-col gap-2 flex-1">

                {/* price and add to fave */}
                <div className="flex justify-between items-center w-full">
                    <span className="text-[#002f34] font-semibold text-lg">Rs {add?.price?.toLocaleString() || "0"}</span>
                    <span><img src={IconHeart} alt="favorite" /></span>
                </div>
                
                {/* description */}
                <div>
                    <p className="text-[#002f34] text-sm line-clamp-2">{add?.title || "No title"}</p>
                </div>

                {/* owner */}
                {add?.owner && (
                    <Link to={`/profile?id=${add.owner._id}`} className="text-xs text-olx_text_gray hover:text-[#002f34] transition">
                        {add.owner.username ? `@${add.owner.username}` : add.owner.fullname}
                    </Link>
                )}

                {/* uploaded at */}
                <div className="text-[#406367] text-12">
                    {add?.createdAt ? new Date(add.createdAt).toLocaleDateString() : "Recently"}
                </div>
            </div>

        </article>
    );
}

export default ColumnTypeCard;
