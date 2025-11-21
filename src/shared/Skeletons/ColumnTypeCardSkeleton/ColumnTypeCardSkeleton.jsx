import React from 'react';

const ColumnTypeCardSkeleton = () => {
  return (
    <div className="animate-pulse max-w-[309px] min-h-[533px] w-full bg-white shadow rounded-lg overflow-hidden">

      {/* Cover Image */}
      <div className="w-full h-[400px] bg-gray-200"></div>

      <div className="!p-4 flex gap-3 flex-col">

        <div id="title-skeleton" className="flex justify-between items-center">
                
            {/* Title */}
            <div className="h-5 bg-gray-200 rounded w-3/7"></div>

            {/* Add to fav */}
            <div className="w-7 h-5 bg-gray-200"></div>
        </div>

        {/* Price */}
        <div className="h-4 bg-gray-200 rounded w-1/1"></div>

        {/* Date */}
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>

      </div>
    </div>
  );
}

export default ColumnTypeCardSkeleton;
