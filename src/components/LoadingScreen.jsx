import React from 'react';
import { Star } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <Star className="h-12 w-12 text-blue-600 animate-pulse mx-auto" />
        <h2 className="mt-4 text-xl font-medium text-gray-900">Loading WeeklyGoals</h2>
        <div className="mt-4">
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-blue-600 rounded-full animate-[loading_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
