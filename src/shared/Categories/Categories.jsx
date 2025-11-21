import React from 'react';

// Icons
import ArrowDown from "../../assets/images/iconArrowDown_noinline.ded95e88f046d456861b914bb0993f24.svg";

const Categories = () => {

    const categoriesLinks = [
        {
            title:"All Categories",
            icon:ArrowDown
        },
        {
            title:"Mobile Phones"
        },
        {
            title:"Cars"
        },
        {
            title:"Motercycles"
        },
        {
            title:"Houses"
        },
        {
            title:"Videos-Audios"
        },
        {
            title:"Tablets"
        },
        {
            title:"Land & Plots"
        }
    ];

    return (
        <div id="categories" className='w-full'>
            <ul className='list-none flex gap-3'>
                {categoriesLinks.map( (c,index) => (
                    <li className={`flex gap-2 items-center`} key={index}>
                        <span className={`text-16 text-[#002f34] ${index === 0 && `font-bold`}`}>{c.title}</span>
                        {c.icon !== undefined && <span><img src={c.icon} alt="" /></span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
