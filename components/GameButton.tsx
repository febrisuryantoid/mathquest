
import React from 'react';
import { soundManager } from '../utils/sound';

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'orange' | 'lime' | 'ocean' | 'indigo' | 'strawberry' | 'peach';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GameButton: React.FC<GameButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '',
  onClick,
  disabled,
  ...props 
}) => {
  const variants = {
    primary: 'bg-candy-blue-base border-candy-blue-dark text-white shadow-candy-blue-dark/40',
    secondary: 'bg-candy-purple-base border-candy-purple-dark text-white shadow-candy-purple-dark/40',
    accent: 'bg-candy-pink-base border-candy-pink-dark text-white shadow-candy-pink-dark/40',
    success: 'bg-candy-mint-base border-candy-mint-dark text-white shadow-candy-mint-dark/40',
    warning: 'bg-candy-yellow-base border-candy-yellow-dark text-candy-yellow-deep shadow-candy-yellow-dark/40',
    danger: 'bg-candy-strawberry-base border-candy-strawberry-dark text-white shadow-candy-strawberry-dark/40',
    orange: 'bg-candy-orange-base border-candy-orange-dark text-white shadow-candy-orange-dark/40',
    lime: 'bg-candy-lime-base border-candy-lime-dark text-candy-lime-deep shadow-candy-lime-dark/40',
    ocean: 'bg-candy-ocean-base border-candy-ocean-dark text-white shadow-candy-ocean-dark/40',
    indigo: 'bg-candy-indigo-base border-candy-indigo-dark text-white shadow-candy-indigo-dark/40',
    strawberry: 'bg-candy-strawberry-base border-candy-strawberry-dark text-white shadow-candy-strawberry-dark/40',
    peach: 'bg-candy-peach-base border-candy-peach-dark text-white shadow-candy-peach-dark/40',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl border-b-[4px]',
    md: 'px-6 py-3 text-lg rounded-2xl border-b-[6px]',
    lg: 'px-8 py-4 text-xl rounded-3xl border-b-[8px]',
    xl: 'px-10 py-5 text-2xl md:text-3xl rounded-[2.5rem] border-b-[12px]',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundManager.play('click');
    if (onClick) onClick(e);
  };

  const bMap = { sm: 4, md: 6, lg: 8, xl: 12 };

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'} p-1 overflow-visible`}>
      <button
        className={`
          relative group overflow-hidden font-display tracking-wider font-black
          transition-all duration-150 ease-out border-x-2 border-t-2
          ${!disabled 
            ? `hover:-translate-y-1 active:translate-y-[${bMap[size]}px] active:border-b-0 active:mt-[${bMap[size]}px] ${variants[variant as keyof typeof variants]}` 
            : 'bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed border-b-[6px]'
          }
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        style={!disabled ? { 
            marginBottom: `${bMap[size]}px` 
        } : {}}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {/* Gloss Top Bar */}
        <div className="absolute top-1.5 left-3 right-3 h-[25%] bg-white/40 rounded-full blur-[1px] pointer-events-none"></div>
        
        {/* Animated Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"></div>
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
          {children}
        </span>
      </button>
    </div>
  );
};
