import React from 'react';

export const Bubble: React.FC = () => {
  // Randomize initial properties
  const size = Math.random() * 40 + 20; // 20px to 60px
  const left = Math.random() * 100; // 0% to 100%
  const duration = Math.random() * 5 + 5; // 5s to 10s
  const delay = Math.random() * 5; // 0s to 5s

  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animation: `bubble-rise ${duration}s ease-in infinite`,
    animationDelay: `${delay}s`,
    bottom: '-10vh'
  };

  return <div className="bubble z-0" style={style} />;
};