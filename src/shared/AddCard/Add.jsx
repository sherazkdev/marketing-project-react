import React from "react";

import IconHeart from "../../assets/images/iconHeart_noinline.518fca1551ed70dd22081007ebd49f53.svg";
import { Link } from "react-router-dom";

const Add = ({add}) => {
    
    return (
        <>
            <article className="max-w-[309px] overflow-hidden rounded-[4px] w-full h-auto border border-[#e8ecec] bg-white">

                {/* add coverImage */}
                <div className="w-full min-h-[410px]">
                    <Link to={`/add?id=${add?._id}`}>
                        <img src={add?.coverImage?.replace("/upload","/upload/w_310,h_410,c_fill,g_auto,q_auto:best,f_auto")} alt="" className="w-full object-contain"/>
                    </Link>
                </div>

                {/* add info */}
                <div className="!p-4 w-full min-h-[122px]">

                    {/* price and add to fave */}
                    <div className="flex justify-between items-center w-full">
                        <span>Rs {add?.price}</span>
                        <span><img src={IconHeart} /></span>
                    </div>
                    
                    {/* Title */}
                    <div>
                        <p className="text-[#002f34]">{add?.title}</p>
                    </div>

                    {/* uploaded at */}
                    <div className="text-[#406367] text-12">5 days ago</div>
                </div>

            </article>
        </>
    )
};

export default Add;