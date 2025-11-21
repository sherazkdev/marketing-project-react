import React from 'react';

/** Category images */
import MobileImage from "../../../../assets/categoriesImages/mobiles.73f961c6ad58605c032eb7c2cf12aeaa.png"
import Vehiclesmage from "../../../../assets/categoriesImages/vehicles.354a5ebfb7f21e87991a277dd4b40f4b.png"
import PropertyRorSaleImage from "../../../../assets/categoriesImages/property-for-sale.69b01e8dafc182fa3bd469d0ed4fc801.png"
import PropertyRorRentImage from "../../../../assets/categoriesImages/property-for-rent.49f99cc528b9b88da4f33fbe1f0b3346.png"
import ElectronicsHomeAppliancesImage from "../../../../assets/categoriesImages/electronics-home-appliances.0a30101e6fd7d9ccc8cd6b85b9b44cee.png"
import BikesImage from "../../../../assets/categoriesImages/bikes.0a5064ae987f3bd72801b7bc2c3b6e02.png"
import BusinessIndustrialImage from "../../../../assets/categoriesImages/business-industrial-agriculture.2ec28979a1bde0183c777a0ce51b37c6.png"
import ServicesImage from "../../../../assets/categoriesImages/services.23d8eb1535f319324813848887961a59.png"
import JobImage from "../../../../assets/categoriesImages/jobs.dc882b8ff65e94850cc12f5abd605420.png"
import AnimalsImage from "../../../../assets/categoriesImages/animals.476fa9caaf88a12dfbcd6db4c8c6f17a.png"
import furnitureHomeDecorImage from "../../../../assets/categoriesImages/furniture-home-decor.47a1998de5f4a8a9e84702dcb40bb313.png"
import FashionImage from "../../../../assets/categoriesImages/fashion-beauty.6ef7c1f060c92b55a6b28bfcfb16a1d2.png"
import BooksImage from "../../../../assets/categoriesImages/books-sports-hobbies.9406daf905b451fa283048652f414054.png"
import KidsImage from "../../../../assets/categoriesImages/kids.5de42a58bc91f81fa22ccc401d7ac285.png"

const CategoryList = () => {

    const CategoriesList = [
        {
            title:"Mobiles",
            image:MobileImage
        },
        {
            title:"Vehicles",
            image:Vehiclesmage
        },
        {
            title:"Property for Sale",
            image:PropertyRorSaleImage
        },
        {
            title:"Property for Rent",
            image:PropertyRorRentImage
        },
        {
            title:"Electronics & Home Appliances",
            image:ElectronicsHomeAppliancesImage
        },
        {
            title:"Bikes",
            image:BikesImage
        },
        {
            title:"Business, Industrial & Agriculture",
            image:BusinessIndustrialImage
        },
        {
            title:"Services",
            image:ServicesImage
        },
        {
            title:"Jobs",
            image:JobImage
        },
        {
            title:"Animals",
            image:AnimalsImage
        },
        {
            title:"Furniture & Home Decor",
            image:furnitureHomeDecorImage
        },
        {
            title:"Fashion & Beauty",
            image:FashionImage
        },
        {
            title:"Books, Sports & Hobbies",
            image:BooksImage
        },
        {
            title:"Kids",
            image:KidsImage
        }
    ]
    return (
        <div id='categories-list' className='flex gap-10 flex-wrap !mt-2'>
            {CategoriesList.map( (c) => (
                <div id="category" className='flex items-center flex-col gap-1 max-w-[88px] w-full'>
                    <img src={c.image} className='w-full '/>
                    <h3 className='text-16 text-[#222222] font-bold'>{c.title.length > 16 ? c.title.slice(0,16) + "..." : c.title}</h3>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
