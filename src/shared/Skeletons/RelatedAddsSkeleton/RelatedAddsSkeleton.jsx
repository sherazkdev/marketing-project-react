import React from 'react';
import ColumnTypeCardSkeleton from '../ColumnTypeCardSkeleton/ColumnTypeCardSkeleton';

const RelatedAddsSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      <div className="flex gap-3 flex-wrap">
        {[...Array(4)].map((_, i) => (
          <ColumnTypeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default RelatedAddsSkeleton;

