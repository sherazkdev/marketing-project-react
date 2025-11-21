import React, { useEffect, useState } from 'react';
import { ChevronRightIcon,CameraIcon } from '../../../../assets/svgs/Icons';

const MediaSlider = ({add}) => {
      
    const [activeIndex,setActiveIndex] = useState(0);
    const [slides,setSlides] = useState([]);

    /** these useEffect using for get add for slides */
    useEffect( () => {
        const mappedSlides = add?.media?.map( (m) => m?.mediaUrl);
        mappedSlides?.unshift(add?.coverImage);
        setSlides(mappedSlides);
    },[add])
    const HandleChangeSlide = (index) => setActiveIndex(index);
    
    const HandlePrevSlide = () => {
        setActiveIndex(prevSlide => {
            if (prevSlide <= 0) {
                return slides.length - 1;
            }
            return prevSlide - 1;
        });
    };
    const HandleNextSlide = () => {
        setActiveIndex(prevSlide => {
            console.log(prevSlide)
            if (prevSlide >= slides.length - 1) {
                return 0;
            }
            return prevSlide + 1;
        });
    };


    return (
        <div id="add-image-slider" className='relative max-w-[820px] max-h-[480px] h-full w-full bg-black rounded-[8px]'>
            {/* prev and next buttons */}
            <button onClick={HandlePrevSlide} id='prev-slide' className='absolute top-[50%] left-3 cursor-pointer text-olx_text_white rotate-180'> <ChevronRightIcon className="w-4 h-5" /></button>
            <button onClick={HandleNextSlide} id='next-slide' className='absolute top-[50%] right-3 cursor-pointer text-olx_text_white'> <ChevronRightIcon className="w-4 h-5" /></button>
            
            <div id="current-slide" className='w-full h-full flex justify-center items-start'>
                <img src={slides[activeIndex]} className='w-full h-full object-contain' />
            </div>

            {/* dots -> dot */}
            <div id="dots" className='absolute bottom-2 left-[50%] flex gap-1 items-center'>
                {slides.map( (s,index) => (
                    <span className={`w-2 h-2 rounded-full ${activeIndex === index ? `bg-white` : `bg-[#cdc9c5]`} inline-block`}></span>
                ))}
            </div>

            {/* current slide number */}
            <div id='current-slide-number' className='absolute flex gap-1 items-center bg-white !p-[5px_10px] rounded-full bottom-2 right-2'>
                <span><CameraIcon /></span>
                <span className='text-12'>{activeIndex + 1}/{slides.length}</span>
            </div>

        </div>
    );
}

export default MediaSlider;
