
import React, { useEffect, useState } from 'react';
import { LevelConfig, Language, AvatarId } from '../types';
import { GameButton } from './GameButton';
import { soundManager } from '../utils/sound';
import { Avatar } from './Avatar';
import { Star, RotateCcw, Menu, ArrowRight, Coins } from 'lucide-react';
import { translations } from '../utils/translations';

interface ResultScreenProps {
  score: number;
  targetScore: number;
  isWin: boolean;
  level: LevelConfig;
  onRetry: () => void;
  onMenu: () => void;
  onNext: () => void;
  isMaxLevel: boolean;
  lang: Language;
  coinsEarned: number;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ 
  score, targetScore, isWin, level, onRetry, onMenu, onNext, isMaxLevel, lang, coinsEarned
}) => {
  const stars = isWin ? (score >= level.targetScore ? 3 : score >= level.targetScore * 0.7 ? 2 : 1) : 0;
  const t = translations[lang];
  const [avatarId, setAvatarId] = useState<AvatarId>('robot');

  useEffect(() => {
    const saved = localStorage.getItem('mathquest_stats_v3');
    if (saved) {
        const stats = JSON.parse(saved);
        if (stats.avatarId) setAvatarId(stats.avatarId);
    }
    soundManager.play(isWin ? 'win' : 'lose');
  }, [isWin]);

  return (
    <div className="game-container flex flex-col items-center justify-center animate-pop-in">
      
      <div className="mb-10 relative animate-float">
        <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-150"></div>
        <Avatar type={avatarId} emotion={isWin ? 'happy' : 'sad'} className="w-48 h-48 md:w-64 md:h-64 relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)]" />
      </div>

      <div className="text-center mb-10">
        <h2 className={`text-6xl md:text-8xl font-display text-outline-white drop-shadow-2xl mb-6 tracking-wider ${isWin ? "text-candy-mint-base" : "text-candy-pink-base"}`}>
            {isWin ? (stars === 3 ? t.result.amazing : t.result.good) : t.result.oops}
        </h2>
        <div className="inline-block bg-white/80 backdrop-blur-md px-10 py-3 rounded-[2rem] border-b-[6px] border-x-2 border-t-2 border-slate-200 shadow-candy-md">
            <p className="text-slate-700 font-black text-xl uppercase tracking-widest">
                {isWin ? t.result.levelComplete : t.result.tryAgain}
            </p>
        </div>
      </div>

      <div className={`
          card-3d p-8 w-full max-w-lg mb-12 border-white border-[6px]
          ${isWin ? 'border-candy-mint-base shadow-candy-mint-dark/30' : 'border-candy-pink-base shadow-candy-pink-dark/30'}
      `}>
        {/* 3D Stars Zone */}
        <div className="flex justify-center gap-6 mb-10 bg-slate-50/50 p-8 rounded-[2.5rem] border-2 border-white shadow-candy-inner">
          {[1, 2, 3].map((i) => (
            <Star 
              key={i} 
              size={56} 
              fill="currentColor"
              className={`
                transition-all duration-700 delay-${i * 300} filter drop-shadow-md
                ${i <= stars ? "text-candy-yellow-base animate-jelly scale-125" : "text-slate-200"}
              `} 
            />
          ))}
        </div>

        <div className="flex justify-between items-end border-b-4 border-slate-100 pb-8 mb-6 px-4">
             <div className="text-left">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.result.score}</div>
                <div className="text-6xl font-display text-candy-blue-base tracking-widest">{score}</div>
             </div>
             <div className="text-right">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.result.target}</div>
                <div className="text-3xl font-display text-slate-400">{targetScore}</div>
             </div>
        </div>

        <div className="bg-candy-yellow-base/10 px-8 py-4 rounded-[2rem] border-2 border-candy-yellow-base/30 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="bg-candy-yellow-base text-white p-2 rounded-full shadow-sm"><Coins size={28} fill="currentColor" /></div>
                <span className="font-black text-candy-yellow-deep text-2xl">+{coinsEarned}</span>
             </div>
             <span className="text-xs font-black text-candy-yellow-dark uppercase tracking-widest">{t.shop.coins}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-lg pb-20">
        {isWin && !isMaxLevel && (
          <GameButton onClick={onNext} variant="success" size="xl" fullWidth className="animate-pulse">
             {t.result.next} <ArrowRight size={40} />
          </GameButton>
        )}
        
        <div className="grid grid-cols-2 gap-6">
          <GameButton onClick={onRetry} variant="warning" size="lg" fullWidth>
            <RotateCcw size={28} /> {t.retry}
          </GameButton>
          <GameButton onClick={onMenu} variant="primary" size="lg" fullWidth>
            <Menu size={28} /> {t.menu}
          </GameButton>
        </div>
      </div>
    </div>
  );
};
