import React from 'react';

export const PrismLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* The Prism Triangle */}
      <path d="M50 15 L85 80 H15 Z" fill="url(#prismGradient)" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
      
      {/* Incoming White Light */}
      <path d="M0 45 L38 58" stroke="white" strokeWidth="2" opacity="0.9" />
      
      {/* Internal Refraction */}
      <path d="M38 58 L62 58" stroke="white" strokeWidth="1.5" opacity="0.7" />
      
      {/* Outgoing Split Colors */}
      <path d="M62 58 L100 40" stroke="#f43f5e" strokeWidth="2" opacity="0.9" /> {/* Red */}
      <path d="M62 58 L100 58" stroke="#10b981" strokeWidth="2" opacity="0.9" /> {/* Green */}
      <path d="M62 58 L100 76" stroke="#38bdf8" strokeWidth="2" opacity="0.9" /> {/* Blue */}
    </svg>
  );
};