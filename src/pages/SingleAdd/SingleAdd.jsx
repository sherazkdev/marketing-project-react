import React, { useEffect, useState } from 'react';
import MediaSlider from './Components/MediaSlider/MediaSlider';
import AddInfo from './Components/AddInfo/AddInfo';
import AddUserProfile from './Components/AddUserProfile/AddUserProfile';
import Categories from '../../shared/Categories/Categories';
import RelatedAdds from './Components/RelatedAdds/RelatedAdds';
import { useLocation, useNavigate } from 'react-router-dom';
import useSingleAdd from '../../hooks/useSingleAdd';

// Icons
import IconNotFound from "../../assets/images/iconNotFound.3acd1674283d45836f4902bb010ff434.webp";

const Add = () => {

    /** States */
    const [add,setAdd] = useState(null);
    const [addId,setAddId] = useState("");

    /** Current location */
    const location = useLocation();

    /** Redirect */
    const Redirect = useNavigate();
    const params = new URLSearchParams(location.search);

    /** Reading url search params */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id");

        if (!id) {
            Redirect("/", { replace: true });
            return;
        }
        setAddId(id);
    }, [location.search]);
    
    /** Single add fetching hook */
    const { Data,HandleFetchSingleAddById } = useSingleAdd();

    useEffect( () => {
        if(addId !== ""){
            const HandleFetchAddUsingHook = async (payload) => {
                try {
                    const add = await HandleFetchSingleAddById(payload);
                    return true;
                } catch (e) {
                    setError(e);
                }
            };
            const cleanupFunctionTimer = setTimeout( () => HandleFetchAddUsingHook({id:addId}),100);
            return () => clearTimeout(cleanupFunctionTimer);
        }
    },[addId])


    /** Single add Fetched useEffect */
    useEffect( () => {
        if(Data.SingleAdd !== null){
            setAdd(Data.SingleAdd);
        }
    },[Data.SingleAdd])

    /** Erro handling */
    if(Data.SingleAddError !== null){
        console.log(Data.SingleAddError)
    }

    return (
            <>
                {!Data.SingleAddLoading && add && (
                    <div className='w-full h-auto flex justify-evenly items-center !px-6'>
                    <div id="center-section" className='max-w-[1280px] w-full mx-auto flex !py-1 flex-col gap-5'>
                        <Categories />
                        
                        <div id="add" className='flex w-full gap-8 !mb-5'>
                            {/* left section */}
                            <div className='w-full flex flex-col max-w-[820px] gap-3'>
                                <MediaSlider add={add}/>
                                <AddInfo add={add} />
                                <RelatedAdds relatedAdds={add?.relatedAdds} />
                            </div>

                            {/* right section */}
                            <div className='w-full max-w-[420px]'>
                                <AddUserProfile activeAdds={add?.activeAdds} owner={add?.owner} />
                            </div>
                        </div>

                    </div>
                    </div>
                )}
                {!Data.SingleAddLoading && !Data.SingleAdd && (
                    <>                    
                        <div className='w-full h-auto flex justify-evenly items-center !px-6'>
                            <div id="center-section" className='max-w-[1280px] w-full mx-auto flex !py-1 flex-col justify-between gap-5'>
                                <Categories />
                                <div id="not-found" className='!mt-10 flex justify-center gap-5 items-center !mb-5'>
                                    
                                    {/* not found label */}
                                    <div className='flex flex-col gap-2 items-start'>
                                        <h1 className='text-[120px] text-[#002f34] font-semibold'>Oops!</h1>
                                        <span className='text-[31px] text-[#002f34] leading-[3rem]'>We can't seem to find that. <br /> Try searching for it</span>
                                        <div>
                                            <span class="_73f4b791" className='text-15 text-[#002f34a3] font-light'>Error 404</span>
                                        </div>
                                    </div>

                                    {/* 404 image */}
                                    <div>
                                        <img src={IconNotFound} alt="" />
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
    );
}

export default Add;
