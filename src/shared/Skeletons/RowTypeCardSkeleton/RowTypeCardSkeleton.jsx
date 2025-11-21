import React from 'react';

const RowTypeCardSkeleton = () => {
  return (
    <div className="animate-pulse w-full min-h-[200px] bg-white border border-[#e8ecec] rounded-[4px] overflow-hidden flex gap-4 !p-4">
      
      {/* Image skeleton */}
      <div className="w-48 h-48 bg-gray-200 rounded"></div>

      <div className="flex-1 flex flex-col gap-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        
        {/* Price skeleton */}
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        
        {/* Description skeleton */}
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        
        {/* Date skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/5"></div>
      </div>

    </div>
  );
};

export default RowTypeCardSkeleton;

