'use client'
import React from 'react';

const OnboardingFormSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md border rounded-md shadow-lg bg-white dark:bg-[#0A0A0A] rounded-xl shadow-lg p-6 space-y-6">

        {/* Skeleton Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
          <div className="bg-gray-300 h-2 rounded-full"></div>
        </div>

        {/* Skeleton Form Components */}
        <form className="space-y-6">
          {/* Username Skeleton */}
          <div className="space-y-4">
            <div className="skeleton w-32 h-6 bg-gray-300 rounded"></div>
            <div className="skeleton w-full h-12 bg-gray-300 rounded"></div>
          </div>

          {/* Skeleton Buttons */}
          <div className="flex justify-between pt-4">
            <div className="skeleton w-24 h-10 bg-gray-300 rounded"></div>
            <div className="skeleton w-24 h-10 bg-gray-300 rounded"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingFormSkeleton;

