import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from '../../shared/Categories/Categories';

import BarIcon from "../../assets/images/iconList_noinline.fc368d8e5a57a18cef128d2179dc9b51.svg";
import GridIcon from "../../assets/images/iconGrid_noinline.20d3115f90d4e01862afb7d21be83420.svg";
import ArrowDown from "../../assets/images/iconArrowDown_noinline.ded95e88f046d456861b914bb0993f24.svg";
import { TickBoldIcon } from '../../assets/svgs/Icons';
import ColumnTypeCard from './Components/ColumnTypeCard/ColumnTypeCard';
import RowTypeCard from './Components/RowTypeCard/RowTypeCard';
import ColumnTypeCardSkeleton from '../../shared/Skeletons/ColumnTypeCardSkeleton/ColumnTypeCardSkeleton';
import RowTypeCardSkeleton from '../../shared/Skeletons/RowTypeCardSkeleton/RowTypeCardSkeleton';
import SearchNotFound from '../../shared/SearchNotFound/SearchNotFound';
import useSearch from '../../hooks/useSearch';

const Search = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('q') || '';
    
    const sortOptions = [
        { title:"Newly listed", sortField:"createdAt", order:"DSC" },
        { title:"Most relevant", sortField:"createdAt", order:"ASC" },
        { title:"Price: Low to High", sortField:"price", order:"ASC" },
        { title:"Price: High to Low", sortField:"price", order:"DSC" }
    ];

    const [minPriceInput,setMinPriceInput] = useState("");
    const [maxPriceInput,setMaxPriceInput] = useState("");
    const [appliedPriceRange,setAppliedPriceRange] = useState({min:null,max:null});
    const [filterError,setFilterError] = useState(null);
    const [activeSortModel,setActiveSortModel] = useState(false);
    const [selectedSort,setSelectedSort] = useState(sortOptions[0]);
    const [cardType,setCardType] = useState("column");
    const [searchResults, setSearchResults] = useState([]);

    const { Data: SearchData, HandleSearch } = useSearch();

    const fetchResults = useCallback(() => {
        HandleSearch({
            query: searchQuery || "",
            sortField: selectedSort.sortField,
            order: selectedSort.order,
            page: 1,
            limit: 30,
            minPrice: appliedPriceRange.min,
            maxPrice: appliedPriceRange.max
        });
    }, [HandleSearch, searchQuery, selectedSort, appliedPriceRange]);

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    useEffect(() => {
        if(Array.isArray(SearchData.SearchResults)) {
            setSearchResults(SearchData.SearchResults);
        } else {
            setSearchResults([]);
        }
    }, [SearchData.SearchResults]);

    // change min input value
    const HandleMinInputValude = (e) => setMinPriceInput(e.target.value);

    // change max input value
    const HandleMaxInputValude = (e) => setMaxPriceInput(e.target.value);

    // change sort model updatation
    const HandleClickSortModel = () => setActiveSortModel(!activeSortModel);

    const HandleChangeSortOption = (option) => {
        setSelectedSort(option);
        setActiveSortModel(false);
    };

    const HandleShowRowTypeCard = () => setCardType("row");
    const HandleShowColumnTypeCard = () => setCardType("column");

    const handleApplyFilters = () => {
        if(minPriceInput && maxPriceInput && Number(minPriceInput) > Number(maxPriceInput)) {
            setFilterError("Minimum price cannot be greater than maximum price");
            return;
        }
        setFilterError(null);
        setAppliedPriceRange({
            min: minPriceInput ? Number(minPriceInput) : null,
            max: maxPriceInput ? Number(maxPriceInput) : null
        });
    };

    const handleResetFilters = () => {
        setMinPriceInput("");
        setMaxPriceInput("");
        setFilterError(null);
        setAppliedPriceRange({min:null,max:null});
    };

    const totalResults = Array.isArray(searchResults) ? searchResults.length : 0;
    const hasResults = totalResults > 0;
    
    return (            
        <div className='w-full flex justify-center items-start px-4 sm:px-6'>
            <div id="center-section" className='max-w-[1280px] w-full mx-auto flex py-4 flex-col gap-5'>
                <Categories />
                
                {/* search section */}
                <div id="search-section" className='flex flex-col gap-5'>
                        
                        {/* top header */}
                        <div id='top-header' className='flex flex-col gap-3'>
                            
                            {/* search queries */}
                            <div id="search-queries-and-result" className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                                
                                {/* search query */}
                                <div id='search-query' className='flex flex-col gap-2'>
                                    <h2 className='text-2xl text-[#002f34] font-semibold capitalize'>{searchQuery || "Search results"}</h2>
                                    <span className='bg-[#c8f8f6] py-[4px]! px-[7px]! text-14 text-[#002f34] rounded-[4px] font-semibold w-max'>
                                        {totalResults} Results
                                    </span>
                                </div>

                                {/* sort dropdown */}
                                <div className='relative'>
                                <button className='flex gap-2 items-center justify-between min-w-[200px] border border-olx_border_gray_light rounded-[4px] px-4 py-2 text-sm' onClick={HandleClickSortModel}>
                                        <span className='text-[#002f34] font-semibold'>Sort by</span>
                                        <span className='text-[#002f34]'>{selectedSort.title}</span>
                                        <span className={`${activeSortModel ? `transition-all delay-100 rotate-180` : `transition-all delay-100 rotate-0`}`}><img src={ArrowDown} /></span>
                                    </button>

                                    {activeSortModel && (
                                        <article className='absolute right-0 mt-3 bg-olx_bg_white z-10 shadow-[0px_1px_4px_1px_rgba(0,0,0,0.1)] rounded-[4px] overflow-hidden'>
                                            <ul className='w-full flex flex-col list-none'>
                                                {sortOptions.map( (option) => (
                                                    <li key={option.title} className={`px-6! py-3! flex items-center gap-2 cursor-pointer hover:bg-[#f4f8f9] ${option.title === selectedSort.title ? "bg-[#f4f8f9]" : ""}`} onClick={ () => HandleChangeSortOption(option)}>
                                                        {option.title === selectedSort.title && <TickBoldIcon className="w-[22px] h-[22px]" />}
                                                        <span>{option.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </article>
                                    )}
                                </div>

                            </div>

                        </div>

                        {/* search add result and categories */}
                        <div className='flex flex-col lg:flex-row gap-4 items-start'>
                            
                            {/* left section */}
                            <aside className='flex flex-col gap-3 w-full lg:max-w-[300px]'>

                                <div id="price-sorting" className='border border-olx_bg_light p-4! rounded-[4px] bg-white flex flex-col gap-4'>

                                    <div className='flex flex-col gap-1'>
                                        <span className='text-15 text-[#002f34] font-semibold'>Price</span>
                                        <span className='text-xs text-olx_text_gray'>Filter ads by price range</span>
                                    </div>
                                    
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='min-price' className='text-sm text-[#194448]'>Min price</label>
                                            <input value={minPriceInput} onChange={HandleMinInputValude} type='number' className='w-full rounded-[4px] p-[8px]! text-14 text-[#002f34] border border-[#bdbebf] outline-none' autoComplete='off' id='min-price' />
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='max-price' className='text-sm text-[#194448]'>Max price</label>
                                            <input type='number' className='w-full text-14 text-[#002f34] rounded-[4px] p-[8px]! border border-[#bdbebf] outline-none' value={maxPriceInput} onChange={HandleMaxInputValude} autoComplete='off' id='max-price'  />
                                        </div>
                                    </div>

                                    {filterError && (
                                        <span className='text-xs text-red-500'>{filterError}</span>
                                    )}

                                    <div className='flex gap-2'>
                                        <button onClick={handleApplyFilters} className='flex-1 bg-[#002f34] text-white py-2 rounded-[4px] text-sm'>Apply</button>
                                        <button onClick={handleResetFilters} className='flex-1 border border-[#002f34] text-[#002f34] py-2 rounded-[4px] text-sm'>Reset</button>
                                    </div>
                                
                                </div>
                            
                            </aside>

                            {/* right section */}
                            <section className='w-full flex-1'>

                                {/* top header */}
                                <div className='w-full h-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                                    
                                    {/* left-section */}
                                    <div>
                                        <h3 className='text-18 font-semibold text-[#002f34]'>Latest Search Ads</h3>
                                    </div>

                                    {/* view toggle */}
                                    <div className='flex gap-3 items-center text-sm text-[#002f34]'>
                                        <span>View</span>
                                        <button onClick={HandleShowRowTypeCard} className={`p-1.5 ${cardType === "row" ? `bg-olx_hover_blue-light rounded-full` : ``}`}><img src={BarIcon} /></button>
                                        <button onClick={HandleShowColumnTypeCard} className={`p-1.5 ${cardType === "column" ? `bg-olx_hover_blue-light rounded-full` : ``}`}><img src={GridIcon} /></button>
                                    </div>

                                </div>
                                
                                {/* line */}
                                <div  className='border my-3 border-olx_border_gray w-full h-0' ></div>

                                {/* Error state */}
                                {SearchData.SearchError && (
                                    <div className="w-full bg-red-50 border border-red-200 text-red-700 p-3! rounded-[4px] text-sm mb-4">
                                        {SearchData.SearchError}
                                    </div>
                                )}

                                {/* Loading state */}
                                {SearchData.SearchLoading && (
                                    <div className='flex flex-col gap-3'>
                                        {cardType === "column" ? (
                                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                                                <ColumnTypeCardSkeleton />
                                                <ColumnTypeCardSkeleton />
                                                <ColumnTypeCardSkeleton />
                                                <ColumnTypeCardSkeleton />
                                            </div>
                                        ) : (
                                            <>
                                                <RowTypeCardSkeleton />
                                                <RowTypeCardSkeleton />
                                                <RowTypeCardSkeleton />
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Results */}
                                {!SearchData.SearchLoading && hasResults && (
                                    <>
                                    {cardType === "column" && (
                                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                            {searchResults.map((add) => (
                                                <ColumnTypeCard key={add._id} add={add} />
                                            ))}
                                        </div>
                                    )}

                                    {cardType === "row" && (
                                        <div className='flex flex-col gap-3'>
                                            {searchResults.map((add) => (
                                                <RowTypeCard key={add._id} add={add} />
                                            ))}
                                        </div>
                                    )}
                                    </>
                                )}

                                {/* No results */}
                                {!SearchData.SearchLoading && !hasResults && (
                                    <SearchNotFound 
                                        message="We can't find any results for your search."
                                        subMessage="Try different keywords or browse categories"
                                    />
                                )}
                                    
                            
                            </section>

                        </div>
                    
                    </div>

                </div>
            </div>
    );
}

export default Search;
