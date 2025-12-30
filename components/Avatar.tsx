
import React from 'react';
import { AvatarId } from '../types';

interface AvatarProps {
  type?: AvatarId;
  emotion: 'happy' | 'sad' | 'thinking' | 'idle';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ type = 'robot', emotion, className }) => {
  // Animation classes - we are using 'animate-float' which we redefined in index.html as a SCALE pulse.
  let animClass = 'animate-float'; 
  if (emotion === 'happy') animClass = 'animate-bounce-slow';
  if (emotion === 'sad') animClass = 'animate-pulse';
  if (emotion === 'thinking') animClass = 'animate-float'; // Also pulses

  const gradId = `bodyGrad_${type}_${Math.random().toString(36).substr(2, 9)}`;
  
  let baseColor1 = "#94A3B8";
  let baseColor2 = "#475569";
  let highlight = "#E2E8F0";
  
  let accessories = null;
  let earType = 'none'; 

  switch(type) {
    case 'robot':
      baseColor1 = "#06B6D4";
      baseColor2 = "#0891B2";
      highlight = "#A5F3FC";
      accessories = (
        <g>
           <line x1="50" y1="10" x2="50" y2="-5" stroke="#475569" strokeWidth="4" />
           <circle cx="50" cy="-5" r="5" fill="#EF4444" />
        </g>
      );
      break;

    case 'ninja':
      baseColor1 = "#334155";
      baseColor2 = "#0F172A";
      highlight = "#64748B";
      accessories = (
        <g>
          <rect x="10" y="30" width="80" height="12" fill="#EF4444" rx="2" />
          <path d="M90 36 L105 32 L105 40 Z" fill="#EF4444" />
          <rect x="20" y="55" width="60" height="15" fill="#1E293B" rx="4" />
        </g>
      );
      break;

    case 'alien':
      baseColor1 = "#84CC16";
      baseColor2 = "#3F6212";
      highlight = "#D9F99D";
      accessories = (
        <g>
          <circle cx="50" cy="25" r="7" fill="white" />
          <circle cx="50" cy="25" r="3" fill="#1E293B" />
          <line x1="30" y1="15" x2="20" y2="0" stroke="#3F6212" strokeWidth="3" />
          <circle cx="20" cy="0" r="4" fill="#FACC15" />
          <line x1="70" y1="15" x2="80" y2="0" stroke="#3F6212" strokeWidth="3" />
          <circle cx="80" cy="0" r="4" fill="#FACC15" />
        </g>
      );
      break;

    case 'angel':
      baseColor1 = "#F8FAFC"; baseColor2 = "#CBD5E1"; highlight = "#FFFFFF";
      accessories = (
        <g>
           <ellipse cx="50" cy="0" rx="22" ry="5" fill="none" stroke="#FACC15" strokeWidth="3" />
           <path d="M5 45 Q-20 10 25 30 Q15 60 15 50 Z" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="2" />
           <path d="M95 45 Q120 10 75 30 Q85 60 85 50 Z" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="2" />
        </g>
      );
      break;

    case 'fairy':
      baseColor1 = "#A3E635"; baseColor2 = "#65A30D"; highlight = "#ECFCCB";
      accessories = (
        <g>
           <path d="M10 40 Q-25 5 30 40 Q-10 80 20 60" fill="#F472B6" opacity="0.6" stroke="#FBCFE8" strokeWidth="1" />
           <path d="M90 40 Q125 5 70 40 Q110 80 80 60" fill="#F472B6" opacity="0.6" stroke="#FBCFE8" strokeWidth="1" />
        </g>
      );
      break;

    case 'wizard':
      baseColor1 = "#7C3AED"; baseColor2 = "#5B21B6"; highlight = "#A78BFA";
      accessories = (
        <g transform="translate(0,-12)">
           <path d="M25 35 L50 -20 L75 35 Z" fill="#4C1D95" />
           <ellipse cx="50" cy="35" rx="35" ry="8" fill="#5B21B6" />
        </g>
      );
      break;

    case 'royal':
      baseColor1 = "#F59E0B"; baseColor2 = "#B45309"; highlight = "#FCD34D";
      accessories = (
        <g transform="translate(0,-8)">
           <path d="M25 25 L25 5 L40 20 L50 -5 L60 20 L75 5 L75 25 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
        </g>
      );
      break;

    case 'hero':
      baseColor1 = "#EF4444"; baseColor2 = "#991B1B"; highlight = "#FCA5A5";
      accessories = (
        <g>
           <path d="M15 50 L0 95 L100 95 L85 50 Z" fill="#1E40AF" opacity="0.8" />
        </g>
      );
      break;

    case 'cat':
      baseColor1 = "#FB923C"; baseColor2 = "#C2410C"; highlight = "#FDBA74";
      earType = 'cat';
      break;

    case 'bunny':
      baseColor1 = "#F9A8D4"; baseColor2 = "#DB2777"; highlight = "#FBCFE8";
      earType = 'bunny';
      break;

    case 'bear':
      baseColor1 = "#B45309"; baseColor2 = "#78350F"; highlight = "#D97706";
      earType = 'bear';
      break;

    case 'dino':
      baseColor1 = "#22C55E"; baseColor2 = "#15803D"; highlight = "#86EFAC";
      earType = 'dino';
      break;
  }

  const Ears = () => {
    switch(earType) {
        case 'cat': 
            return <g><path d="M25 35 L15 10 L40 25 Z" fill={baseColor1} stroke={baseColor2} strokeWidth="2" /><path d="M75 35 L85 10 L60 25 Z" fill={baseColor1} stroke={baseColor2} strokeWidth="2" /></g>;
        case 'bunny':
            return <g><ellipse cx="25" cy="10" rx="6" ry="20" fill={baseColor1} stroke={baseColor2} strokeWidth="2" transform="rotate(-15 25 35)" /><ellipse cx="75" cy="10" rx="6" ry="20" fill={baseColor1} stroke={baseColor2} strokeWidth="2" transform="rotate(15 75 35)" /></g>;
        case 'bear':
            return <g><circle cx="20" cy="25" r="12" fill={baseColor1} stroke={baseColor2} strokeWidth="2" /><circle cx="80" cy="25" r="12" fill={baseColor1} stroke={baseColor2} strokeWidth="2" /></g>;
        case 'dino':
            return <g><path d="M50 0 L40 25 L60 25 Z" fill="#FACC15" /></g>;
        default: return null;
    }
  }

  const leftEye = emotion === 'happy' 
    ? <path d="M25 45 Q35 35 45 45" fill="transparent" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    : <g><circle cx="35" cy="42" r="8" fill="white" /><circle cx="35" cy="42" r="3.5" fill="#1E293B" /></g>;

  const rightEye = emotion === 'happy'
    ? <path d="M55 45 Q65 35 75 45" fill="transparent" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    : <g><circle cx="65" cy="42" r="8" fill="white" /><circle cx="65" cy="42" r="3.5" fill="#1E293B" /></g>;

  const mouthPath = emotion === 'happy' ? "M30 65 Q50 85 70 65" : "M35 68 Q50 72 65 68"; 

  return (
    <div className={`relative flex items-center justify-center overflow-visible ${className || 'w-24 h-24'}`}>
      <svg viewBox="-20 -25 140 140" className={`w-full h-full drop-shadow-2xl ${animClass}`} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id={gradId} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={highlight} /> 
            <stop offset="50%" stopColor={baseColor1} /> 
            <stop offset="100%" stopColor={baseColor2} /> 
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="95" rx="30" ry="5" fill="#000" opacity="0.2" />
        <Ears />
        <path d="M50 10 C 20 10, 10 30, 10 55 C 10 85, 30 95, 50 95 C 70 95, 90 85, 90 55 C 90 30, 80 10, 50 10 Z" fill={`url(#${gradId})`} />
        {accessories}
        <g transform="translate(0, 5)">
            <g>{leftEye}{rightEye}</g>
            <path d={mouthPath} fill="transparent" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
