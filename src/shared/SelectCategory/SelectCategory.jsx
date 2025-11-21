import React from 'react';
/** Category images */
import MobileImage from "../../assets/categoriesImages/mobiles.73f961c6ad58605c032eb7c2cf12aeaa.png"
import Vehiclesmage from "../../assets/categoriesImages/vehicles.354a5ebfb7f21e87991a277dd4b40f4b.png"
import PropertyRorSaleImage from "../../assets/categoriesImages/property-for-sale.69b01e8dafc182fa3bd469d0ed4fc801.png"
import PropertyRorRentImage from "../../assets/categoriesImages/property-for-rent.49f99cc528b9b88da4f33fbe1f0b3346.png"
import ElectronicsHomeAppliancesImage from "../../assets/categoriesImages/electronics-home-appliances.0a30101e6fd7d9ccc8cd6b85b9b44cee.png"
import BikesImage from "../../assets/categoriesImages/bikes.0a5064ae987f3bd72801b7bc2c3b6e02.png"
import BusinessIndustrialImage from "../../assets/categoriesImages/business-industrial-agriculture.2ec28979a1bde0183c777a0ce51b37c6.png"
import ServicesImage from "../../assets/categoriesImages/services.23d8eb1535f319324813848887961a59.png"
import JobImage from "../../assets/categoriesImages/jobs.dc882b8ff65e94850cc12f5abd605420.png"
import AnimalsImage from "../../assets/categoriesImages/animals.476fa9caaf88a12dfbcd6db4c8c6f17a.png"
import furnitureHomeDecorImage from "../../assets/categoriesImages/furniture-home-decor.47a1998de5f4a8a9e84702dcb40bb313.png"
import FashionImage from "../../assets/categoriesImages/fashion-beauty.6ef7c1f060c92b55a6b28bfcfb16a1d2.png"
import BooksImage from "../../assets/categoriesImages/books-sports-hobbies.9406daf905b451fa283048652f414054.png"
import KidsImage from "../../assets/categoriesImages/kids.5de42a58bc91f81fa22ccc401d7ac285.png"

// Icons 
import { ChevronRightIcon } from '../../assets/svgs/Icons';

const SelectCategory = ({HandleClickCategory,variant = "category",HandleClickSubCategory,subCategory,category}) => {  

    // const CategoriesList = [
    //     {
    //         title:"Mobiles",
    //         image:MobileImage
    //     },
    //     {
    //         title:"Vehicles",
    //         image:Vehiclesmage
    //     },
    //     {
    //         title:"Property for Sale",
    //         image:PropertyRorSaleImage
    //     },
    //     {
    //         title:"Property for Rent",
    //         image:PropertyRorRentImage
    //     },
    //     {
    //         title:"Electronics & Home Appliances",
    //         image:ElectronicsHomeAppliancesImage
    //     },
    //     {
    //         title:"Bikes",
    //         image:BikesImage
    //     },
    //     {
    //         title:"Business, Industrial & Agriculture",
    //         image:BusinessIndustrialImage
    //     },
    //     {
    //         title:"Services",
    //         image:ServicesImage
    //     },
    //     {
    //         title:"Jobs",
    //         image:JobImage
    //     },
    //     {
    //         title:"Animals",
    //         image:AnimalsImage
    //     },
    //     {
    //         title:"Furniture & Home Decor",
    //         image:furnitureHomeDecorImage
    //     },
    //     {
    //         title:"Fashion & Beauty",
    //         image:FashionImage
    //     },
    //     {
    //         title:"Books, Sports & Hobbies",
    //         image:BooksImage
    //     },
    //     {
    //         title:"Kids",
    //         image:KidsImage
    //     }
    // ];
    const CategoriesList = [
        {
            title: "Mobiles",
            image: MobileImage,
            subcategories: [
                "Smartphones",
                "Feature Phones",
                "Mobile Accessories",
                "Tablets",
                "Wearables"
            ]
        },
        {
            title: "Vehicles",
            image: Vehiclesmage,
            subcategories: [
                "Cars",
                "Trucks & Vans",
                "Buses & Coaches",
                "Auto Parts & Accessories",
                "Boats & Water Transport"
            ]
        },
        {
            title: "Property for Sale",
            image: PropertyRorSaleImage,
            subcategories: [
                "Houses",
                "Apartments & Flats",
                "Land & Plots",
                "Commercial Property",
                "Warehouses & Factories"
            ]
        },
        {
            title: "Property for Rent",
            image: PropertyRorRentImage,
            subcategories: [
                "Houses",
                "Apartments & Flats",
                "Rooms & Hostels",
                "Offices & Shops",
                "Warehouses"
            ]
        },
        {
            title: "Electronics & Home Appliances",
            image: ElectronicsHomeAppliancesImage,
            subcategories: [
                "TVs & Home Theater",
                "Computers & Laptops",
                "Mobile Phones & Accessories",
                "Cameras & Photography",
                "Kitchen Appliances"
            ]
        },
        {
            title: "Bikes",
            image: BikesImage,
            subcategories: [
                "Motorcycles",
                "Scooters",
                "Bicycles",
                "Spare Parts & Accessories",
                "Electric Bikes"
            ]
        },
        {
            title: "Business, Industrial & Agriculture",
            image: BusinessIndustrialImage,
            subcategories: [
                "Industrial Equipment",
                "Agricultural Equipment",
                "Business for Sale",
                "Office Supplies",
                "Construction Materials"
            ]
        },
        {
            title: "Services",
            image: ServicesImage,
            subcategories: [
                "Home Services",
                "Repair & Maintenance",
                "Education & Classes",
                "Events & Catering",
                "Health & Wellness"
            ]
        },
        {
            title: "Jobs",
            image: JobImage,
            subcategories: [
                "Full-time Jobs",
                "Part-time Jobs",
                "Freelance & Contract",
                "Internships",
                "Remote Jobs"
            ]
        },
        {
            title: "Animals",
            image: AnimalsImage,
            subcategories: [
                "Pets",
                "Livestock",
                "Pet Accessories",
                "Veterinary Services",
                "Animal Adoption"
            ]
        },
        {
            title: "Furniture & Home Decor",
            image: furnitureHomeDecorImage,
            subcategories: [
                "Living Room Furniture",
                "Bedroom Furniture",
                "Office Furniture",
                "Home Decor Items",
                "Garden & Outdoor Furniture"
            ]
        },
        {
            title: "Fashion & Beauty",
            image: FashionImage,
            subcategories: [
                "Men's Clothing",
                "Women's Clothing",
                "Footwear",
                "Accessories & Jewelry",
                "Beauty & Personal Care"
            ]
        },
        {
            title: "Books, Sports & Hobbies",
            image: BooksImage,
            subcategories: [
                "Books & Magazines",
                "Sports Equipment",
                "Musical Instruments",
                "Arts & Crafts",
                "Toys & Games"
            ]
        },
        {
            title: "Kids",
            image: KidsImage,
            subcategories: [
                "Clothing & Accessories",
                "Toys & Games",
                "Baby Care",
                "Kids Furniture",
                "Education & Learning"
            ]
        }
    ];

    return (
        <div id='category-selection' className='flex w-full flex-col gap-10'>
            
            {/* top header */}
            <div className='w-full flex justify-center items-center !py-4 !px-8'>
                <h1 className='text-[#002f34] text-[32px] font-semibold'>Post your ad</h1>
            </div>
            
            <div className='w-full h-full flex justify-center items-start'>
                <div id="center-section" className='max-w-[1280px] w-full'>
                    
                    {/* choose category title */}
                    <div className='!my-4'>
                        <p className='text-[#002f34] text-24 font-semibold'>Choose a Category</p>
                    </div>

                    {/* categories */}
                    {variant === "category" && (<div className='flex flex-wrap gap-3 !mb-10'>
                            {CategoriesList.map( (c,index) => (
                                <div id="category" onClick={ () => HandleClickCategory(c.title,index)} className='max-w-[308px] max-h-[211px] w-full h-full rounded-[6px] bg-[#f2f4f5] !p-[30px_12px] flex flex-col gap-1 items-center hover:shadow-[inset_0_0_0_1px_#3a77ff,0_1px_8px_-3px_rgba(0,0,0,0.5)] cursor-pointer transition-[box-shadow] duration-100' >
                                    <img src={c.image} className='max-h-32 max-2-32 w-full h-full object-contain' />
                                    <span className='text-[#002f34] text-15 font-semibold'>{c.title}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {variant === "subCategory" && (
                        <div id="sub-category" className='w-full grid grid-cols-[1fr_1fr_1fr] border border-[#e8ecec]'>
                            
                            <div id="parent-categories" className='w-full h-[700px] border-r border-[#e8ecec]'>
                                <ul id="categories" className='w-full h-full overflow-x-hidden overflow-y-scroll'>
                                    {CategoriesList.map( (c,index) => (
                                        <li onClick={ () => HandleClickCategory(c.title,index)} id="category" className='flex w-full border-b border-[#e8ecec] justify-between items-center max-h-[76px] h-full hover:bg-[#fafbfb] cursor-pointer'>
                                            
                                            <div id="category-name-image" className='flex items-center gap-4 !ml-3'>
                                                
                                                {/* icon */}
                                                <span className='max-w-14 max-h-14 w-full h-full'><img src={c.image} className='w-full h-full object-cover'/></span>
                                                
                                                {/* category */}
                                                <span>{c.title}</span>
                                            </div>
                                            
                                            {/* arrow right */}
                                            <span className='!mr-3'><ChevronRightIcon className="w-4 h-4"/></span>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div id="selected-category-sub-category" className='w-full h-full border-r border-[#e8ecec]'>
                                <ul id="sub-categories" className='w-full h-full overflow-x-hidden overflow-y-scroll'>
                                    {category !== "" && CategoriesList[category?.index].subcategories.map( (c) => (
                                        <li onClick={ () => HandleClickSubCategory(c)}id="sub-category" className='flex w-full border-b border-[#e8ecec] justify-between items-center max-h-[76px] h-full hover:bg-[#fafbfb] cursor-pointer'>
                                            
                                            <div id="category-name-image" className='flex items-center gap-4 !ml-3'>
                                                
                                                {/* category */}
                                                <span>{c}</span>
                                            </div>
                                            
                                            {/* arrow right */}
                                            <span className='!mr-3'><ChevronRightIcon className="w-4 h-4"/></span>

                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/*  selected subcategory to sub category*/}
                            <div id="selected-sub-category-sub-category" className='w-full h-full border-r border-[#e8ecec]'>

                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SelectCategory;
