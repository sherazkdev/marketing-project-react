import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

/** Images */
import IconMotor from "../../assets/images/iconMotors.6bf280165e43e55b173d0a53551e2bfb.png";
import IconProperty from "../../assets/images/iconProperty.d09c6d2e3621f900c17c9e8330a1a37b.png";
import IconChat from "../../assets/images/iconChat_noinline.31f5df4a6a21fc770ed6863958662677.svg";
import IconNotification from "../../assets/images/iconNotifications_noinline.4444f6b42acbe30d772d80ef1225f574 (1).svg";
import DefaultProfilePhoto from "../../assets/images/iconProfilePicture_noinline.6327fd8895807f09fafb0ad1e3d99b83.svg";
import ArrowDown from "../../assets/images/iconArrowDown_noinline.ded95e88f046d456861b914bb0993f24.svg";
import IconSellBorder from "../../assets/images/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg";
import PlusIcon from "../../assets/images/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg";
import PenIcon from "../../assets/images/iconEditProfile_noinline.86c8263cfcb0cf01159d414c1fa1057d.svg";
import IconMyAdd from "../../assets/images/iconMyAds_noinline.7b01301ec3451389504d4955892ef5b2.svg";
import IconBlog from "../../assets/images/iconBlogUpdated_noinline.3d92417cf2f3a3cf45de0b534f71860e.svg";
import IconLocation from "../../assets/images/addresses_noinline.c0e1adda1d9665cda3a85bbf743e7a43.svg";
import IconHelp from "../../assets/images/iconHelp_noinline.bbb7740d7c9e63fe0673fc7d7c29e49e.svg";
import IconSetting from "../../assets/images/iconSettings_noinline.d16f9b7532fa141768c19078642fdf00.svg";
import IconLocationGradient from "../../assets/images/iconLocationGradient_noinline.ec45db16ede268cd2719a09f0d10437f.svg";
import IconLogout from "../../assets/images/logout_noinline.ae614d258a91df474a1d0a7c93ac2344.svg";
import IconHeart from "../../assets/images/iconHeart_noinline.518fca1551ed70dd22081007ebd49f53.svg";


/** svgs */
import {OLX_LOGO,ShoppingCartIcon,BookMarkIcon,MailIcon, SearchIcon} from "../../assets/svgs/Icons";
import Auth from '../Auth/Auth';
import { AuthContext } from '../../contexts/AuthProvider';

const Header = () => {

    const [showProfile,setShowProfile] = useState(false);
    const [activeAuthModel,setActiveAuthModel] = useState(false);

    // Authentication
    const {isAuthenticated,user,logout,logoutLoading} = useContext(AuthContext);

    const profileLinks = [
        {
            icon:IconMyAdd,
            type:"IMAGE",
            title:"My Ads"
        },
        {
            type:"IMAGE",
            icon:IconHeart,
            title:"Favourites"
        },
        {
            type:"SVG",
            icon:BookMarkIcon,
            title:"My Orders"
        },
        {
            type:"SVG",
            icon:MailIcon,
            title:"Payment Options"
        },
        {
            type:"IMAGE",
            icon:IconLocation,
            title:"Addresses"
        },
        {
            type:"IMAGE",
            icon:IconBlog,
            title:"Blogs"
        },
        {
            type:"IMAGE",
            icon:IconHelp,
            title:"Help"
        },
        {
            type:"IMAGE",
            icon:IconSetting,
            title:"Settings"
        },
        {
            type:"IMAGE",
            icon:IconLogout,
            title:"Logout"
        }
    ];

    const HandleClickProfile = () => setShowProfile(!showProfile);
    const handleLogoutClick = async () => {
        if(typeof logout !== "function" || logoutLoading){
            return;
        }
        await logout();
        setShowProfile(false);
        window.location.href = "/";
    };
    
    return (
        <>
            <header id="top-header" className='w-full h-auto flex flex-col gap-2 border-b-2 sticky top-0 p-[0px_0px_10px_0px]! bg-olx_bg_white border-olx_border_gray z-9999'>
            
            <div className='w-full bg-olx_bg_lighter h-auto flex justify-center items-center px-4 sm:px-6 z-auto'>
                <div id="center-section" className='relative max-w-[1280px] w-full mx-auto flex flex-col gap-4 md:flex-row md:justify-between md:items-center py-2! z-auto'>
                    
                    <div id='left-section' className='w-full md:w-auto'>
                        <ul className='list-none flex gap-6 lg:gap-8 items-center py-[8px_0px]! overflow-hidden'>
                            
                            <li>
                                {/* Home link */}
                                <Link id="olx" to={`/`} className='relative'><OLX_LOGO className="fill-olx_fill_blue" /></Link>
                            </li>

                            <li className='group'>
                                {/* Motor link */}
                                <Link to={`/`} className='flex gap-2 items-center '>
                                    {/* icon */}
                                    <span className='w-[51px] h-6'><img src={IconMotor} className='w-full h-full object-contain' /></span>
                                    
                                    <span className='text-15 text-olx_text_black font-bold group-hover:text-olx_text_blue'>Motors</span>
                                </Link>
                            </li>

                            <li className='group'>
                                {/* Home link */}
                                <Link to={`/`} className='flex gap-1 items-center'>
                                    {/* icon */}
                                    <span className='w-[51px] h-6'><img src={IconProperty} className='w-full h-full object-contain' /></span>
                                    
                                    <span className='text-15 text-olx_text_black font-bold group-hover:text-olx_text_blue'>Property</span>
                                </Link>
                            </li>
                    </ul>
                    </div> 
                    
                    <div id='right-section' className='w-full md:w-auto flex justify-between md:justify-end items-center gap-4'>
                        {isAuthenticated && (
                            <ul className='list-none flex gap-2 sm:gap-3 items-center py-[8px_0px]! w-full md:w-auto justify-end'>
                                
                                {/* chat history icon */}
                                <li className='hover:bg-olx_hover_blue-light p-2! rounded-full'><Link to={`/`}><img src={IconChat} /></Link></li>
                                
                                {/* notification icon */}
                                <li className='hover:bg-olx_hover_blue-light p-2! rounded-full'><Link to={`/`}><img src={IconNotification} /></Link></li>
                                
                                {/* shoping icon */}
                                <li className='hover:bg-olx_hover_blue-light p-2! rounded-full'><Link to={`/`}><ShoppingCartIcon /></Link></li>

                                {/* Profile */}
                                <li className='p-2! cursor-pointer relative'>
                                    
                                    <div onClick={HandleClickProfile} id="profile-avatar" className='flex items-center gap-1'>

                                        {/* avatar */}
                                        <div id="avatar" className="w-8 h-8">
                                        <img
                                            loading="lazy"
                                            src={user?.avatar.toString() || DefaultProfilePhoto}
                                            className="w-full h-full rounded-full object-cover"
                                            onError={(e) => e.target.src = DefaultProfilePhoto}
                                        />
                                        </div>
                                                                                
                                        {/* down angle icon */}
                                        <div className={`${showProfile ? "rotate-180" : "rotate-0"}`}>
                                            <img src={ArrowDown} alt="" />
                                        </div>
                                    </div>
                                    {showProfile && (
                                        <div id='profile-info' className="absolute z-9999 w-[300px] sm:w-[340px] flex flex-col gap-2 top-[45px] right-0 p-2! bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.12),0_4px_20px_0_rgba(0,0,0,0.122)]">
                                            <header className='flex gap-2'>
                                                
                                                {/* avatar */}
                                                <div id='avatar' className='w-[52px] h-[52px] relative'>
                                                    <img loading='lazy' src={user?.avatar !== undefined ? user?.avatar.replace("=s96-c","=s50-c") : DefaultProfilePhoto} className='w-full h-full rounded-full object-contain'/>
                                                    <span className={`absolute bottom-0 right-0`}>
                                                        <Link to={`/profile/info`}> <img src={PenIcon} /> </Link>
                                                    </span>
                                                </div>
                                                
                                                {/* user info */}
                                                <div id='user-info'>
                                                    <h2 className='text-15 text-olx_text_black font-bold'>{user?.fullname}</h2>
                                                    <Link to={`/profile?id=${user?._id}`} className='text-12 underline text-olx_border_gray_dark font-semibold'>View Public Profile</Link>
                                                </div>
                                            
                                            </header>

                                            <div id="user-actions" className='border-t border-olx_border_gray'>
                                                <ul>
                                                    {profileLinks.map( (item,index) => (
                                                        <li key={index} className='p-2! hover:bg-olx_bg_lighter'>
                                                            {item.title === "Logout" ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={handleLogoutClick}
                                                                    className='flex gap-2 items-center w-full text-left'
                                                                    disabled={logoutLoading}
                                                                >
                                                                    <span>{item.type === "IMAGE" ? <img src={item.icon} title={item.title} alt={item.title} /> : <item.icon />}</span>
                                                                    <span className='text-14'>
                                                                        {logoutLoading ? "Logging out..." : item.title}
                                                                    </span>
                                                                </button>
                                                            ) : (
                                                                <Link to={item.title === "My Ads" ? "/myadds" : item.title === "Favourites" ? "/" : "/"} className='flex gap-2'>
                                                                    <span>{item.type === "IMAGE" ? <img src={item.icon} title={item.title} alt={item.title} /> : <item.icon />}</span>
                                                                    <span className='text-14'>{item.title}</span>
                                                                </Link>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </li>
                                
                                {/* Sell link */}
                                <li>
                                    <Link className='relative inline-block' to={`/post`}>
                                        <img src={IconSellBorder} alt="" />
                                        <div className='absolute top-3 left-6 flex items-center justify-center gap-1'>
                                            <span><img src={PlusIcon} /></span>
                                            <span className='text-14 text-olx_text_black font-bold'>SELL</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {!isAuthenticated && (
                            <div onClick={ () => setActiveAuthModel(!activeAuthModel)} id='login' className='flex gap-4 sm:gap-5 items-center justify-end w-full'>
                            
                                <button className='relative text-[#002f34] text-15 font-semibold border-b-2 border-b-olx_fill_black hover:border-b-transparent cursor-pointer'>
                                    <span>Login</span>
                                </button>

                                <button className='relative'>
                                    <img src={IconSellBorder} alt="" />
                                    <div className='absolute top-3 left-6 flex items-center justify-center gap-1'>
                                        <span><img src={PlusIcon} /></span>
                                        <span className='text-14 text-olx_text_black font-bold'>SELL</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <div id="search-section" className='w-full bg-olx_bg_white flex justify-center items-center px-4 sm:px-6 z-auto'>
                <div id="center-section" className='relative max-w-[1280px] w-full mx-auto flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-4 py-2! z-auto'>

                    <div id="left-select-country" className='w-full lg:w-auto'>
                        
                        <div id="selected-country" className='border border-[#406367] rounded-[6px] w-full lg:w-[362px] flex justify-between items-center p-3!'>
                            <div className='flex gap-2 items-center w-full'>
                                <span><img src={IconLocationGradient} /></span>
                                <input type="text" value={"Pakistan"} readOnly className='border-none outline-none w-full text-sm sm:text-base bg-transparent' />
                            </div>
                            <div className='ml-2'><img src={ArrowDown} /></div>
                        </div>

                    </div>

                    <div id="right-search-ad" className='w-full'>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const query = formData.get('search') || e.target.querySelector('input[type="text"]')?.value;
                            if(query && query.trim()) {
                                window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                            }
                        }}>
                            <div id="search-section" className='border border-[#406367] rounded-[6px] w-full flex flex-col sm:flex-row'>
                                
                                <div id="input" className='w-full h-full'>    
                                    <input type="text" name="search" autoComplete='off' placeholder='Find Cars, Mobile Phones and more...' className='w-full border-none outline-none h-full p-3.5! text-sm sm:text-base'/>
                                </div>

                                <button type="submit" className='bg-olx_bg_dark py-2! px-3! flex gap-1 items-center justify-center text-sm sm:text-base'>
                                    <span><SearchIcon className="fill-olx_fill_white"/></span>
                                    <span className='text-olx_text_white'>Search</span>
                                </button>
                            
                            </div>
                        </form>
                    </div>
                
                </div>
            </div>
        
            </header>

            {activeAuthModel && (<Auth onClose={() => setActiveAuthModel(false)} />)}
        </>
    );
}

export default Header;
