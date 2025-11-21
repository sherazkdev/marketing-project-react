import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="flex flex-col gap-5">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>

        {/* Profile card */}
        <div className="border border-[#e8ecec] rounded-[4px] !p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex-1 border border-[#e8ecec] rounded-[4px] !p-4 space-y-2">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProfileSkeleton;

