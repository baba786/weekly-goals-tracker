import React from 'react';
import { Target } from 'lucide-react';

const BrandLogo = ({ size = 'default' }) => {
  const sizes = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl'
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <Target 
          className={`text-blue-600 ${
            size === 'small' ? 'w-5 h-5' : size === 'large' ? 'w-7 h-7' : 'w-6 h-6'
          }`}
        />
        <div className="absolute inset-0 bg-blue-600/20 animate-pulse rounded-full"></div>
      </div>
      <span className={`ml-2 font-semibold tracking-tight ${sizes[size]} bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent`}>
        Mindful Goals
      </span>
    </div>
  );
};

export default BrandLogo;