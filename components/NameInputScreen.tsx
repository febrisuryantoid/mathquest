
import React, { useState } from 'react';
import { GameButton } from './GameButton';
import { Avatar } from './Avatar';
import { 
  ArrowRight, User, Music, Info, 
  X, ChartNoAxesCombined, 
  Settings, Languages, Lock, Coins, Zap,
  Volume2, Moon, Sun
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { translations } from '../utils/translations';
import { Language, AvatarId, PlayerStats } from '../types';
import { getAvatarAbilityDescription, getAvatarStats } from '../utils/gameLogic';

interface NameInputScreenProps {
  onSubmit: (name: string, avatar: AvatarId) => void;
  lang: Language;
  musicEnabled: boolean;
  sfxEnabled: boolean;
  theme: 'light' | 'dark';
  onToggleMusic: () => void;
  onToggleSfx: () => void;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  stats: PlayerStats;
  onBuyAvatar: (id: AvatarId, price: number) => boolean;
  onOpenStats: () => void;
  onOpenInfo: () => void;
}

const AVATAR_OPTIONS: AvatarId[] = [
  'robot', 'cat', 'ninja', 'alien',
  'bear', 'bunny', 'wizard', 'fairy',
  'angel', 'hero', 'dino', 'royal'
];

export const NameInputScreen: React.FC<NameInputScreenProps> = ({ 
  onSubmit, lang, musicEnabled, sfxEnabled, theme, onToggleMusic, onToggleSfx, onToggleLang, onToggleTheme, stats, onBuyAvatar, onOpenStats, onOpenInfo
}) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>(stats.avatarId || 'robot');
  const [showShop, setShowShop] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const t = translations[lang];

  const isUnlocked = (id: AvatarId) => stats.unlockedAvatars.includes(id);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const cleanName = name.trim().toUpperCase().replace(/\s+/g, ' ');
    if (cleanName.length > 0 && isUnlocked(selectedAvatar)) {
      soundManager.play('click');
      onSubmit(cleanName, selectedAvatar);
    } else {
      soundManager.play('wrong');
    }
  };

  const handleAvatarSelect = (id: AvatarId) => {
    soundManager.play('click');
    setSelectedAvatar(id);
  }

  const handleBuy = () => {
    const config = getAvatarStats(selectedAvatar);
    if (stats.coins >= config.price) {
        const success = onBuyAvatar(selectedAvatar, config.price);
        if (success) {
            soundManager.play('buy');
        }
    } else {
        soundManager.play('error');
    }
  }

  const currentAvatarConfig = getAvatarStats(selectedAvatar);
  const currentIsUnlocked = isUnlocked(selectedAvatar);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative bg-transparent overflow-y-auto no-scrollbar">
      
      {/* TOP ACTIONS - SOLID CANDY CIRCLES */}
      <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex justify-between items-start z-50 pointer-events-none">
          <div className="flex gap-2 md:gap-3 pointer-events-auto">
              <button 
                onClick={() => setShowSettings(true)}
                className="w-10 h-10 md:w-14 md:h-14 bg-candy-slate-light rounded-xl md:rounded-2xl shadow-candy-md border-b-[3px] md:border-b-8 border-x-2 border-t-2 border-candy-slate-base flex items-center justify-center text-candy-slate-deep hover:scale-110 active:scale-95 transition-all"
              >
                  <Settings size={20} className="md:w-7 md:h-7" />
              </button>
              <button 
                onClick={onToggleLang}
                className="w-10 h-10 md:w-14 md:h-14 bg-candy-yellow-light rounded-xl md:rounded-2xl shadow-candy-md border-b-[3px] md:border-b-8 border-x-2 border-t-2 border-candy-yellow-base flex items-center justify-center text-candy-yellow-deep font-black hover:scale-110 active:scale-95 transition-all"
              >
                  <Languages size={20} className="md:w-7 md:h-7" />
              </button>
          </div>
          <button 
            onClick={onOpenInfo}
            className="w-10 h-10 md:w-14 md:h-14 bg-candy-blue-light rounded-xl md:rounded-2xl shadow-candy-md border-b-[3px] md:border-b-8 border-x-2 border-t-2 border-candy-blue-base flex items-center justify-center text-candy-blue-deep hover:scale-110 active:scale-95 transition-all pointer-events-auto"
          >
              <Info size={20} className="md:w-7 md:h-7" />
          </button>
      </div>

      {/* SHOP MODAL */}
      {showShop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-candy-pink-deep/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl md:rounded-[3rem] p-1 shadow-candy-lg animate-pop-in border-[3px] md:border-4 border-white overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-candy-purple-light p-5 md:p-10 overflow-y-auto no-scrollbar flex-1 relative">
              <div className="candy-gloss opacity-40" />
              <div className="flex justify-between items-center mb-6 md:mb-8 relative z-10">
                <h2 className="text-2xl md:text-4xl font-display text-candy-purple-dark uppercase tracking-wider text-outline-white">
                  {t.ui.shopHeader}
                </h2>
                <button onClick={() => setShowShop(false)} className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full text-candy-pink-base shadow-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <X size={20} className="md:w-7 md:h-7" strokeWidth={3} />
                </button>
              </div>

              <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 md:mb-8 border-b-[6px] md:border-b-8 border-candy-yellow-base shadow-inner flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="bg-candy-yellow-base text-white p-2 md:p-2.5 rounded-full shadow-md">
                    <Coins size={20} className="md:w-7 md:h-7" fill="currentColor" />
                  </div>
                  <span className="font-display text-2xl md:text-4xl text-candy-yellow-deep">{stats.coins}</span>
                </div>
                <span className="text-[10px] md:text-xs font-black text-candy-yellow-dark uppercase tracking-widest">{t.shop.coins}</span>
              </div>

              <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-4 md:p-6 mb-6 md:mb-8 border-b-[6px] md:border-b-8 border-candy-blue-base flex items-center gap-4 md:gap-6 relative z-10">
                <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 bg-candy-blue-light rounded-2xl md:rounded-3xl p-1.5 md:p-2 border-2 border-white shadow-sm">
                  <Avatar type={selectedAvatar} emotion="happy" className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="text-[10px] font-black text-candy-blue-dark uppercase tracking-[0.2em]">{t.nameInput.abilityLabel}</span>
                    <Zap size={12} className="md:w-4 md:h-4 text-candy-yellow-base fill-candy-yellow-base" />
                  </div>
                  <p className="font-black text-slate-700 text-sm md:text-lg leading-tight">
                    {getAvatarAbilityDescription(selectedAvatar, lang)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8 relative z-10">
                {AVATAR_OPTIONS.map((id) => {
                  const unlocked = isUnlocked(id);
                  const selected = selectedAvatar === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleAvatarSelect(id)}
                      className={`
                        relative aspect-square rounded-xl md:rounded-2xl border-b-[4px] md:border-b-[6px] border-x-2 border-t-2 transition-all p-1
                        ${selected ? 'border-candy-purple-dark bg-white ring-2 md:ring-4 ring-candy-purple-base shadow-candy-md' : 'border-white bg-white hover:bg-white'}
                      `}
                    >
                      <Avatar type={id} emotion={selected ? 'happy' : 'idle'} className="w-full h-full" />
                      {!unlocked && (
                        <div className="absolute inset-0 bg-candy-slate-deep/50 rounded-lg md:rounded-xl flex items-center justify-center">
                          <Lock size={16} className="md:w-5 md:h-5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="w-full relative z-10">
                {currentIsUnlocked ? (
                  <GameButton fullWidth variant="success" size="lg" onClick={() => setShowShop(false)}>
                    {t.ui.select} <ArrowRight size={24} />
                  </GameButton>
                ) : (
                  <GameButton 
                    fullWidth 
                    variant="warning" 
                    size="lg"
                    disabled={stats.coins < currentAvatarConfig.price}
                    onClick={handleBuy}
                  >
                    {t.ui.buyFor} {currentAvatarConfig.price} <Coins size={24} />
                  </GameButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-candy-blue-deep/80 backdrop-blur-sm">
            <div className="w-full max-w-xs bg-candy-indigo-light rounded-3xl md:rounded-[3rem] p-6 md:p-8 shadow-candy-lg border-b-[8px] md:border-b-[12px] border-x-2 border-t-2 border-candy-indigo-base animate-pop-in">
                <div className="candy-gloss opacity-40" />
                <h2 className="text-2xl md:text-3xl font-display text-candy-indigo-dark text-center mb-6 md:mb-8 uppercase tracking-wider text-outline-white relative z-10">{t.settings.title}</h2>
                <div className="space-y-4 md:space-y-5 relative z-10">
                    
                    {/* Music Toggle */}
                    <div className="flex items-center justify-between bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border-b-4 border-candy-indigo-light shadow-inner">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className={`p-2 md:p-2.5 rounded-xl text-white ${musicEnabled ? 'bg-candy-purple-base' : 'bg-slate-400'}`}>
                                <Music size={20} className="md:w-6 md:h-6" />
                            </div>
                            <span className="font-black text-xs md:text-sm text-slate-700">{t.settings.music}</span>
                        </div>
                        <button onClick={onToggleMusic} className={`w-12 h-7 md:w-16 md:h-9 rounded-full relative transition-colors duration-300 shadow-inner ${musicEnabled ? 'bg-candy-mint-base' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-5 h-5 md:w-7 md:h-7 bg-white rounded-full transition-all duration-300 shadow-md ${musicEnabled ? 'left-6 md:left-8' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* SFX Toggle */}
                    <div className="flex items-center justify-between bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border-b-4 border-candy-indigo-light shadow-inner">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className={`p-2 md:p-2.5 rounded-xl text-white ${sfxEnabled ? 'bg-candy-orange-base' : 'bg-slate-400'}`}>
                                <Volume2 size={20} className="md:w-6 md:h-6" />
                            </div>
                            <span className="font-black text-xs md:text-sm text-slate-700">{t.settings.sfx}</span>
                        </div>
                        <button onClick={onToggleSfx} className={`w-12 h-7 md:w-16 md:h-9 rounded-full relative transition-colors duration-300 shadow-inner ${sfxEnabled ? 'bg-candy-mint-base' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-5 h-5 md:w-7 md:h-7 bg-white rounded-full transition-all duration-300 shadow-md ${sfxEnabled ? 'left-6 md:left-8' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border-b-4 border-candy-indigo-light shadow-inner">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className={`p-2 md:p-2.5 rounded-xl text-white ${theme === 'dark' ? 'bg-candy-blue-deep' : 'bg-candy-blue-base'}`}>
                                {theme === 'dark' ? <Moon size={20} className="md:w-6 md:h-6" /> : <Sun size={20} className="md:w-6 md:h-6" />}
                            </div>
                            <span className="font-black text-xs md:text-sm text-slate-700">{t.settings.theme}</span>
                        </div>
                        <button onClick={onToggleTheme} className={`w-12 h-7 md:w-16 md:h-9 rounded-full relative transition-colors duration-300 shadow-inner ${theme === 'dark' ? 'bg-candy-blue-deep' : 'bg-candy-blue-light'}`}>
                            <div className={`absolute top-1 w-5 h-5 md:w-7 md:h-7 bg-white rounded-full transition-all duration-300 shadow-md ${theme === 'dark' ? 'left-6 md:left-8' : 'left-1'}`} />
                        </button>
                    </div>

                </div>
                <div className="relative z-10 mt-6 md:mt-10">
                  <GameButton fullWidth variant="indigo" size="md" onClick={() => setShowSettings(false)}>{t.ui.close}</GameButton>
                </div>
            </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center px-4 md:px-6 py-6 md:py-12 gap-6 md:gap-10 relative z-10 min-h-full">
          <div className="w-full flex flex-col items-center gap-2 md:gap-4 shrink-0 mt-16 md:mt-20">
              <h1 className="text-[min(12vw,3rem)] md:text-[min(12vw,4rem)] font-display text-white text-outline-white drop-shadow-2xl tracking-wide leading-none text-center">
                {t.appTitle}
              </h1>
              <div className="inline-flex items-center gap-2 md:gap-3 bg-candy-yellow-light text-candy-yellow-deep px-4 py-2 md:px-6 md:py-2.5 rounded-full shadow-candy-md border-b-[3px] md:border-b-4 border-candy-yellow-base transform hover:scale-105 transition-transform mt-2">
                  <Coins size={18} className="md:w-6 md:h-6" fill="currentColor" />
                  <span className="font-display text-lg md:text-2xl tracking-widest">{stats.coins}</span>
              </div>
          </div>

          <div className="w-full flex flex-col items-center gap-6 md:gap-10 mb-8 md:mb-12">
              <button 
                  type="button"
                  onClick={() => setShowShop(true)}
                  className="relative group w-40 h-40 md:w-56 md:h-56 bg-white rounded-[2.5rem] md:rounded-[3.5rem] border-b-[8px] md:border-b-[12px] border-x-2 border-t-2 border-candy-blue-base shadow-candy-lg flex items-center justify-center hover:scale-105 transition-all duration-300 active:scale-95"
              >
                  <div className="candy-gloss opacity-30" />
                  <div className="w-32 h-32 md:w-44 md:h-44 drop-shadow-2xl relative z-10">
                      <Avatar type={selectedAvatar} emotion="happy" className="w-full h-full" />
                  </div>
                  <div className="absolute -bottom-3 md:-bottom-4 bg-candy-purple-base text-white text-[10px] md:text-sm font-black px-4 py-2 md:px-7 md:py-3 rounded-full shadow-candy-md border-2 border-white uppercase tracking-wider whitespace-nowrap z-20">
                      {t.nameInput.tapToShop}
                  </div>
              </button>

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 md:gap-6 max-w-[280px] md:max-w-[360px]">
                  <div className="relative group w-full">
                      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-candy-blue-dark/40 group-focus-within:text-candy-blue-dark transition-colors z-10">
                          <User size={20} className="md:w-7 md:h-7" />
                      </div>
                      <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value.toUpperCase())}
                          placeholder={t.nameInput.heroName}
                          maxLength={12}
                          className="w-full bg-white border-b-[6px] md:border-b-[10px] border-x-2 border-t-2 border-candy-blue-light rounded-full py-3 md:py-5 pl-12 md:pl-16 pr-6 md:pr-8 text-lg md:text-2xl font-display text-candy-blue-deep placeholder:text-candy-slate-base focus:outline-none focus:border-candy-blue-base transition-all text-center shadow-candy-md uppercase"
                      />
                  </div>

                  <GameButton 
                    type="submit" 
                    variant="primary" 
                    size="xl"
                    fullWidth 
                    disabled={name.trim().length === 0 || !currentIsUnlocked}
                  >
                    {t.nameInput.startQuest} <ArrowRight size={24} className="md:w-8 md:h-8" />
                  </GameButton>

                  <GameButton 
                    type="button" 
                    variant="indigo" 
                    size="lg"
                    fullWidth 
                    onClick={onOpenStats}
                  >
                    <ChartNoAxesCombined size={20} className="md:w-6 md:h-6" /> {t.nameInput.leaderboardBtn}
                  </GameButton>
              </form>
          </div>
      </div>
    </div>
  );
};
