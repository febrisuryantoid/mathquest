
import React from 'react';
import { LevelConfig, PlayerStats, Language } from '../types';
import { soundManager } from '../utils/sound';
import { Star, Lock, ChartNoAxesCombined, Baby, Trophy, Coins } from 'lucide-react';
import { Avatar } from './Avatar';
import { translations } from '../utils/translations';
import { GameButton } from './GameButton';

interface LevelCardProps {
  lvl: LevelConfig;
  isLocked: boolean;
  isNext: boolean;
  stars: number;
  t: any;
  onClick: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ lvl, isLocked, isNext, stars, t, onClick }) => {
    const assortments = [
        { base: 'bg-candy-blue-light', border: 'border-candy-blue-base', icon: 'bg-candy-blue-base', iconBorder: 'border-candy-blue-dark' },
        { base: 'bg-candy-purple-light', border: 'border-candy-purple-base', icon: 'bg-candy-purple-base', iconBorder: 'border-candy-purple-dark' },
        { base: 'bg-candy-orange-light', border: 'border-candy-orange-base', icon: 'bg-candy-orange-base', iconBorder: 'border-candy-orange-dark' },
        { base: 'bg-candy-lime-light', border: 'border-candy-lime-base', icon: 'bg-candy-lime-base', iconBorder: 'border-candy-lime-dark' },
        { base: 'bg-candy-ocean-light', border: 'border-candy-ocean-base', icon: 'bg-candy-ocean-base', iconBorder: 'border-candy-ocean-dark' },
        { base: 'bg-candy-strawberry-light', border: 'border-candy-strawberry-base', icon: 'bg-candy-strawberry-base', iconBorder: 'border-candy-strawberry-dark' },
        { base: 'bg-candy-indigo-light', border: 'border-candy-indigo-base', icon: 'bg-candy-indigo-base', iconBorder: 'border-candy-indigo-dark' },
        { base: 'bg-candy-peach-light', border: 'border-candy-peach-base', icon: 'bg-candy-peach-base', iconBorder: 'border-candy-peach-dark' },
    ];

    const currentAssort = assortments[(lvl.level - 1) % assortments.length];

     return (
        <div className="p-2 w-full">
            <button
                disabled={isLocked}
                onClick={onClick}
                className={`
                    relative group p-0 rounded-[2.5rem] transition-all duration-300 w-full text-left outline-none
                    ${isLocked 
                    ? 'opacity-60 grayscale cursor-not-allowed scale-95' 
                    : isNext 
                        ? 'scale-[1.03] z-10 animate-pulse-soft' 
                        : 'hover:scale-[1.03] hover:-translate-y-1'
                    }
                `}
                >
                <div className={`
                    relative overflow-hidden rounded-[2.5rem] border-b-[10px] border-x-2 border-t-2 shadow-candy-md h-full
                    ${isLocked ? 'bg-slate-200 border-slate-400' : 
                        isNext ? 'bg-candy-mint-base border-candy-mint-dark' : 
                        `${currentAssort.base} ${currentAssort.border}`}
                `}>
                    <div className="candy-gloss" />

                    <div className={`
                        p-6 flex items-center gap-5 h-full min-h-[110px]
                        ${isLocked ? 'bg-slate-50' : isNext ? 'bg-gradient-to-b from-candy-mint-light to-white' : ''}
                    `}>
                        <div className={`
                            w-16 h-16 rounded-[1.25rem] flex flex-col items-center justify-center shrink-0 border-b-[5px] shadow-lg z-10
                            ${isLocked 
                            ? 'bg-slate-300 border-slate-400 text-slate-500' 
                            : isNext
                                ? 'bg-candy-yellow-base border-candy-yellow-dark text-white'
                                : `${currentAssort.icon} ${currentAssort.iconBorder} text-white`}
                        `}>
                            {isLocked ? <Lock size={26} /> : <span className="font-display text-3xl drop-shadow-md">{lvl.level}</span>}
                        </div>

                        <div className="flex-1 min-w-0 z-10">
                            <h3 className={`font-display text-xl leading-tight mb-2 truncate ${isLocked ? 'text-slate-500' : 'text-slate-800'}`}>
                            {lvl.name}
                            </h3>
                            
                            {!isLocked ? (
                            <div className="flex gap-2 bg-white/60 inline-flex px-4 py-1.5 rounded-full border-2 border-white/40 shadow-inner">
                                {[1, 2, 3].map((i) => (
                                <Star 
                                    key={i} 
                                    size={16} 
                                    className={`drop-shadow-sm ${i <= stars ? "fill-candy-yellow-base text-orange-400" : "fill-slate-300 text-slate-300"}`} 
                                />
                                ))}
                            </div>
                            ) : (
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest bg-slate-300/50 px-3 py-1.5 rounded-xl border border-slate-400">{t.menu.locked}</span>
                            )}
                        </div>
                    </div>
                </div>
            </button>
        </div>
     );
};

interface MainMenuProps {
  stats: PlayerStats;
  availableLevels: LevelConfig[];
  onSelectLevel: (level: LevelConfig) => void;
  onOpenStats: () => void;
  onChangeAge: () => void;
  lang: Language;
}

export const MainMenu: React.FC<MainMenuProps> = ({ stats, availableLevels, onSelectLevel, onOpenStats, onChangeAge, lang }) => {
  const t = translations[lang];
  const currentAgeUnlocked = stats.selectedAge ? (stats.unlockedLevels[stats.selectedAge] || 1) : 1;

  return (
    <div className="game-container flex flex-col gap-10 animate-pop-in">
      
      {/* TOP HUD - SOLID 3D CAPSULE */}
      <div className="flex flex-wrap justify-between items-center gap-6">
          <button 
            onClick={onChangeAge}
            className="flex items-center gap-4 bg-candy-pink-light px-6 py-3.5 rounded-[2rem] shadow-candy-md border-b-[8px] border-x-2 border-t-2 border-candy-pink-base hover:scale-105 active:scale-95 transition-all overflow-hidden relative group"
          >
              <div className="candy-gloss opacity-60" />
              <Baby size={28} className="text-candy-pink-dark relative z-10" />
              <span className="font-black text-candy-pink-deep text-lg uppercase tracking-wide relative z-10">{t.menu.age} {stats.selectedAge}</span>
          </button>

          <div className="flex gap-4 items-center">
              <div className="flex items-center gap-4 bg-candy-yellow-light px-7 py-3.5 rounded-[2.5rem] shadow-candy-md border-b-[8px] border-x-2 border-t-2 border-candy-yellow-base overflow-hidden relative">
                  <div className="candy-gloss opacity-60" />
                  <div className="bg-candy-yellow-base p-2 rounded-full shadow-sm text-white relative z-10">
                    <Coins size={24} fill="currentColor" />
                  </div>
                  <span className="font-display text-2xl text-candy-yellow-deep tracking-wider relative z-10">{stats.coins}</span>
              </div>
              
              <div className="hidden sm:flex items-center gap-4 bg-candy-blue-light px-7 py-3.5 rounded-[2.5rem] shadow-candy-md border-b-[8px] border-x-2 border-t-2 border-candy-blue-base overflow-hidden relative">
                  <div className="candy-gloss opacity-60" />
                  <div className="bg-candy-blue-base p-2 rounded-full shadow-sm text-white relative z-10">
                    <Trophy size={24} fill="currentColor" />
                  </div>
                  <span className="font-display text-2xl text-candy-blue-deep tracking-wider relative z-10">{stats.totalScore}</span>
              </div>
          </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
          {/* SIDEBAR - SOLID 3D SIDEBAR */}
          <div className="hidden lg:flex flex-col w-80 shrink-0 gap-8">
              <div className="bg-candy-indigo-light rounded-[3rem] border-b-[12px] border-x-2 border-t-2 border-candy-indigo-base p-10 flex flex-col items-center h-full shadow-candy-lg relative overflow-hidden">
                  <div className="candy-gloss opacity-50" />
                  <div className="flex-1 flex items-center justify-center w-full mb-8 relative z-10">
                      <div className="animate-float">
                          <Avatar type={stats.avatarId} emotion="happy" className="w-56 h-56 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]" />
                      </div>
                  </div>
                  <GameButton fullWidth variant="indigo" size="lg" onClick={onOpenStats} className="relative z-10">
                      <ChartNoAxesCombined size={24} /> {t.menu.rankStats}
                  </GameButton>
              </div>
          </div>

          {/* LEVEL GRID */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto no-scrollbar max-h-[70vh] lg:max-h-none pr-3">
              {availableLevels.map((lvl) => (
                  <LevelCard 
                    key={lvl.id}
                    lvl={lvl}
                    isLocked={lvl.level > currentAgeUnlocked}
                    isNext={lvl.level === currentAgeUnlocked}
                    stars={stats.stars[lvl.id] || 0}
                    t={t}
                    onClick={() => {
                        soundManager.play('click');
                        onSelectLevel(lvl);
                    }}
                  />
              ))}
          </div>
      </div>

      {/* MOBILE FOOTER NAV - SOLID 3D */}
      <div className="lg:hidden fixed bottom-8 left-8 right-8 z-50 flex justify-between items-end pointer-events-none">
          <div className="pointer-events-auto">
              <button 
                onClick={onOpenStats}
                className="w-20 h-20 bg-candy-purple-light border-b-[10px] border-x-2 border-t-2 border-candy-purple-base text-candy-purple-dark rounded-[2rem] shadow-candy-lg flex items-center justify-center active:translate-y-2 active:border-b-0 transition-all overflow-hidden relative"
              >
                  <div className="candy-gloss opacity-60" />
                  <ChartNoAxesCombined size={40} className="relative z-10" />
              </button>
          </div>
          <div className="pointer-events-auto transform translate-y-6">
              <Avatar type={stats.avatarId} emotion="happy" className="w-36 h-36 drop-shadow-2xl animate-float" />
          </div>
      </div>
    </div>
  );
};
