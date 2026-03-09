import React from 'react';

interface FlowerCloudProps {
  className?: string;
  color?: string;
}

export const FlowerCloud: React.FC<FlowerCloudProps> = ({ className, color = "#A2D2FF" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M50 0 C60 20 80 20 85 35 C95 35 100 50 85 65 C80 80 60 80 50 100 C40 80 20 80 15 65 C0 50 5 35 15 35 C20 20 40 20 50 0 Z" opacity="0.4" />
      <path d="M50 15 C56 27 68 27 71 36 C77 36 80 45 71 54 C68 63 56 63 50 75 C44 63 32 63 29 54 C20 45 23 36 29 36 C32 27 44 27 50 15 Z" fillOpacity="0.6" />
      <circle cx="50" cy="45" r="5" fillOpacity="0.8" />
    </svg>
  );
};