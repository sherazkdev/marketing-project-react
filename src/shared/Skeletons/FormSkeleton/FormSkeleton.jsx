import React from 'react';

const FormSkeleton = () => {
  return (
    <div className="animate-pulse w-full max-w-6xl">
      <div className="bg-white rounded-lg shadow-md !p-8 space-y-8">
        
        {/* Header */}
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        
        {/* Category section */}
        <div className="space-y-4 border-b !pb-6">
          <div className="h-5 bg-gray-200 rounded w-1/6"></div>
          <div className="h-20 bg-gray-200 rounded w-64"></div>
        </div>

        {/* Image upload section */}
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Input fields */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-1/6"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        ))}

        {/* Button */}
        <div className="h-12 bg-gray-200 rounded w-full"></div>

      </div>
    </div>
  );
};

export default FormSkeleton;

