import React, { lazy, useEffect, useState } from 'react';
import Categories from '../../shared/Categories/Categories';
import {ChevronRightIcon,  PhoneIcon, SearchIcon } from '../../assets/svgs/Icons';
import { Link } from 'react-router-dom';

// icons
import ChatIconWithDots from "../../assets/images/iconChatWithDots_noinline.1f0a54858c04525d65447edb5ed459f8.svg";
import ViewIcon from "../../assets/images/iconViews_noinline.33647bc99e0e174ce4970d9314977367.svg"
import useUserAdds from '../../hooks/useUserAdds';
import { DeleteAdd } from '../../api/instance';

const MyAdds = () => {

    const [myAdds,setMyAdds] = useState([]);
    const [clickedLink,setClickedLink] = useState(0);
    const [deletingId,setDeletingId] = useState(null);
    const [deleteError,setDeleteError] = useState(null);

    /** Links */
    const links = [
        {
            label:`View all (${myAdds.length})`
        },
        {
            label:`Active Ads (0)`
        },
        {
            label:`Inactive Ads (0)`
        },
        {
            label:`Pending Ads (0)`
        },
        {
            label:`Moderated Ads (0)`
        }
    ];

    const {UserAdds,UserAddsError,UserAddsLoading} = useUserAdds();

    /** Check adds is fetched */
    useEffect(() => {
        if(UserAdds !== null && Array.isArray(UserAdds)) {
            setMyAdds(UserAdds);
        }
    }, [UserAdds]);

    const handleDeleteAdd = async (addId) => {
        if(!addId || deletingId === addId) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
        if(!confirmDelete) return;
        try {
            setDeletingId(addId);
            setDeleteError(null);
            const response = await DeleteAdd({_id: addId, deleteStatus: "PERMANENTLY_DELETE"});
            if(response.data?.statusCode === 200){
                setMyAdds((prev) => prev.filter((add) => add._id !== addId));
            } else {
                setDeleteError(response.data?.message || "Failed to delete ad");
            }
        } catch (e) {
            setDeleteError(e?.response?.data?.message || e?.message || "Failed to delete ad");
        } finally {
            setDeletingId(null);
        }
    };

    return (
            <div className='w-full h-auto flex justify-evenly items-center !px-6'>
                <div id="center-section" className='max-w-[1280px] w-full mx-auto flex !py-1 flex-col gap-5'>
                    <Categories />

                    <div id="add-and-user-info" className='flex flex-col gap-2'>
                        {/* top-section */}
                        <div id='top-header' className='w-full flex flex-col gap-1'>
                            <span className='text-14 text-[#7f9799]'>Profile</span>
                            <span className='text-24 text-[#002f34] font-semibold'>Manage and view your Ads</span>
                        </div>
                        
                        {/* adds */}
                        <div className='flex flex-col w-full gap-2'>

                            {/* search section */}
                            <div className='w-full max-w-64 overflow-hidden'>
                                <form className='w-64 relative border border-[#e8ecec] !p-2 flex gap-1'>
                                    <button><SearchIcon /></button>
                                    <div id="input">    
                                        <input type='text' className="w-52 text-13 border-none outline-none" placeholder='Search by Ad Title' />
                                    </div>
                                </form>
                            </div>
                            
                            {/* links section */}
                            <div className='flex gap-2'>
                                {links.map( (link,index) => (
                                    <button className={`text-[#002f34] text-14 !p-[8px_16px] cursor-pointer rounded-full border ${index == clickedLink ? `border-[#3a77ff]`: `border-[#d8dfe0]`} `}>
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            {/* discount options */}
                            <div className='flex gap-2'>
                                <span className='text-14 text-[#7f9799]'>Heavy discount on Packages</span>
                                <span className='text-14 font-semibold flex gap-2 items-center text-[#3a77ff]'>View Packages <ChevronRightIcon className="w-2.5 h-2.5"/></span>
                            </div>

                            {/* adds list */}
                            <div>
                                {deleteError && (
                                    <div className="w-full bg-red-50 border border-red-200 text-red-700 !p-3 rounded-[4px] text-sm mb-4">
                                        {deleteError}
                                    </div>
                                )}
                                {UserAddsLoading && (
                                    <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="animate-pulse border border-[#d8dfe0] rounded-[4px] !p-4 flex items-start gap-2">
                                                <div className='w-28 h-28 bg-gray-200 rounded'></div>
                                                <div className='flex-1 space-y-2'>
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!UserAddsLoading && myAdds && myAdds.length > 0 && (
                                    <div className="space-y-4">
                                        {myAdds.map((add) => (
                                            <div key={add._id} id="my-add" className='border border-[#d8dfe0] rounded-[4px] !p-4 flex items-start gap-2'>
                                                <div className='w-28 h-28'>
                                                    <img src={add.coverImage || "https://images.olx.com.pk/thumbnails/380464644-240x180.jpeg"} className='w-full h-full object-cover rounded' alt="" />
                                                </div>
                                                <div className='w-full flex flex-col gap-3'>
                                                    <div className='flex gap-2 items-center'>
                                                        <h2 className="text-[#002f34]">{add.title}</h2>
                                                        <span id="category" className="text-gray-500">- in {add.category}</span>
                                                    </div>
                                                    <div className='flex items-center gap-10'>
                                                        <div>
                                                            <span className='text-15 text-[#002f34] font-thin'>Rs {add.price}</span>
                                                        </div>
                                                        <div className='h-5 bg-[#d8dfe0] w-[.5px]'></div>
                                                        <div>
                                                            <span className='text-12 text-[#7f9799] font-bold bg-[#d8dfe0] rounded-[4px] !p-[4px_8px]'>{add.status || "ENABLED"}</span>
                                                        </div>
                                                    </div>
                                                    <div className='w-full flex justify-between items-center'>
                                                        <div className='flex gap-5 items-center'>
                                                            <div className='flex gap-2 items-start'>
                                                                <Link className='bg-[#f2f4f5] rounded-[4px] !p-[4px]'><img src={ViewIcon} className='w-6 h-6'/></Link>
                                                                <div className='flex flex-col'>
                                                                    <span className='text-[#002f34] text-14 font-bold'>0</span>
                                                                    <span className='text-[#002f34] text-12'>Views</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <button 
                                                                className='rounded-[4px] !p-[4px_8px] border border-[#002f34]'
                                                                onClick={() => handleDeleteAdd(add._id)}
                                                                disabled={deletingId === add._id}
                                                            >
                                                                {deletingId === add._id ? "Removing..." : "Remove"}
                                                            </button>
                                                            <Link to={`/edit?id=${add._id}`} className='!p-[4px_8px] border border-[#002f34] bg-[#002f34] text-white rounded-[4px]'>Edit</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!UserAddsLoading && (!myAdds || myAdds.length === 0) && (
                                    <div className="w-full flex justify-center items-center !py-10">
                                        <div className="flex flex-col items-center gap-2">
                                            <h1 className='text-[80px] text-[#002f34] font-semibold'>Oops!</h1>
                                            <span className='text-[24px] text-[#002f34] text-center'>
                                                You haven't posted any ads yet.<br />Start selling by posting your first ad!
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {UserAddsError && (
                                    <div className="w-full bg-red-50 border border-red-200 text-red-700 !p-3 rounded-[4px] text-sm">
                                        {UserAddsError}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    );
}

export default MyAdds;
