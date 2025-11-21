import React, { useEffect, useState } from 'react';

// Slider images
import Categories from '../../shared/Categories/Categories';
import Advertize from './Components/Advertize/Advertize';
import CategoryList from './Components/CategoryList/CategoryList';
import Add from '../../shared/AddCard/Add';

/** Hook for latest adds */
import useAdds from '../../hooks/useAdds';
import ColumnTypeCardSkeleton from '../../shared/Skeletons/ColumnTypeCardSkeleton/ColumnTypeCardSkeleton';

const Home = () => {
    const [latestAdds,setLatestAdds] = useState([]);
    const [page,setPage] = useState(1);
    
    /* ads fetching **/
    const {Adds,AddsError,AddsLoading} = useAdds({page,limit:30});

    /** Fetched Adds */
    useEffect( () => {
        setLatestAdds(Adds);
    },[Adds])

    /** Error Catching */
    if(AddsError !== null){
        return console.log(AddsError);
    }

    return (
        <section id="main" className='w-full h-auto !mt-1'>
            
            <div className='w-full h-auto flex justify-evenly items-center !px-6'>
                <div id="center-section" className='max-w-[1280px] w-full mx-auto flex !py-1 flex-col'>
                    
                    {/* Categoires */}
                    <Categories />
                    
                    {/* advertize banner */}
                    <Advertize />

                    {/* category list */}
                    <CategoryList />

                    {/* Latest adds section */}
                    <div id="topHeader" className="!mt-2 !mb-5">
                        <h3 className="text-24 text-olx_text_black font-bold">Latest ads</h3>
                        
                        <div id='adds' className='flex flex-wrap gap-3 items-start justify-start'>
                            
                            {/* Loading ui Skeletons */}
                            {AddsLoading && Array(9).fill(null).map( (i,_index) => (
                                <ColumnTypeCardSkeleton />
                            ))}
                            
                            {/* After Fetched ads */}
                            {!AddsLoading && latestAdds?.length > 0 && latestAdds.map( (add) => (<Add add={add} key={add?._id} />))}

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
