import React from 'react';
import IconNotFound from "../../assets/images/iconNotFound.3acd1674283d45836f4902bb010ff434.webp";

const SearchNotFound = ({ message = "We can't seem to find that.", subMessage = "Try searching for it" }) => {
    return (
        <div className='w-full flex justify-center items-center !py-10'>
            <div className='flex flex-col md:flex-row gap-5 items-center justify-center'>
                
                {/* not found label */}
                <div className='flex flex-col gap-2 items-start'>
                    <h1 className='text-[80px] md:text-[120px] text-[#002f34] font-semibold'>Oops!</h1>
                    <span className='text-[24px] md:text-[31px] text-[#002f34] leading-[2rem] md:leading-[3rem]'>
                        {message} <br /> {subMessage}
                    </span>
                    <div>
                        <span className='text-15 text-[#002f34a3] font-light'>No results found</span>
                    </div>
                </div>

                {/* 404 image */}
                <div>
                    <img src={IconNotFound} alt="Not found" className="w-[200px] md:w-auto" />
                </div>
            
            </div>
        </div>
    );
};

export default SearchNotFound;

