
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
    sm: 'px-3 py-1.5 text-xs md:text-sm rounded-lg md:rounded-xl border-b-[3px] md:border-b-[4px]',
    md: 'px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg rounded-xl md:rounded-2xl border-b-[4px] md:border-b-[6px]',
    lg: 'px-5 py-3 md:px-8 md:py-4 text-base md:text-xl rounded-2xl md:rounded-3xl border-b-[5px] md:border-b-[8px]',
    xl: 'px-6 py-3.5 md:px-10 md:py-5 text-lg md:text-2xl lg:text-3xl rounded-2xl md:rounded-[2.5rem] border-b-[6px] md:border-b-[12px]',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    soundManager.play('click');
    if (onClick) onClick(e);
  };

  const bMap = { sm: 3, md: 4, lg: 5, xl: 6 }; // Mobile bounce values
  const bMapDesktop = { sm: 4, md: 6, lg: 8, xl: 12 }; // Desktop bounce values

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'} p-0.5 md:p-1 overflow-visible`}>
      <button
        className={`
          relative group overflow-hidden font-display tracking-wider font-black
          transition-all duration-150 ease-out border-x-2 border-t-2
          ${!disabled 
            ? `hover:-translate-y-0.5 md:hover:-translate-y-1 active:translate-y-[2px] md:active:translate-y-[4px] active:border-b-0 active:mt-[2px] md:active:mt-[4px] ${variants[variant as keyof typeof variants]}` 
            : 'bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed border-b-[4px] md:border-b-[6px]'
          }
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        style={!disabled ? { 
            // Margin bottom is handled by classes via flex/grid usually, but we can set a tiny offset if needed for strict layout
        } : {}}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {/* Gloss Top Bar */}
        <div className="absolute top-1 left-2 right-2 h-[25%] bg-white/40 rounded-full blur-[1px] pointer-events-none"></div>
        
        {/* Animated Shine Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none"></div>
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-1.5 md:gap-2 drop-shadow-md">
          {children}
        </span>
      </button>
    </div>
  );
};
