
import React, { useState } from 'react';
import { GameButton } from './GameButton';
import { Avatar } from './Avatar';
import { 
  ArrowRight, User, Music, Info, 
  X, ChartNoAxesCombined, 
  Settings, Languages, Lock, Coins, Zap
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
  onToggleMusic: () => void;
  onToggleSfx: () => void;
  onToggleLang: () => void;
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
  onSubmit, lang, musicEnabled, onToggleMusic, onToggleLang, stats, onBuyAvatar, onOpenStats, onOpenInfo
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
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-50 pointer-events-none">
          <div className="flex gap-3 pointer-events-auto">
              <button 
                onClick={() => setShowSettings(true)}
                className="w-14 h-14 bg-candy-slate-light rounded-2xl shadow-candy-md border-b-8 border-x-2 border-t-2 border-candy-slate-base flex items-center justify-center text-candy-slate-deep hover:scale-110 active:scale-95 transition-all"
              >
                  <Settings size={28} />
              </button>
              <button 
                onClick={onToggleLang}
                className="w-14 h-14 bg-candy-yellow-light rounded-2xl shadow-candy-md border-b-8 border-x-2 border-t-2 border-candy-yellow-base flex items-center justify-center text-candy-yellow-deep font-black hover:scale-110 active:scale-95 transition-all"
              >
                  <Languages size={28} />
              </button>
          </div>
          <button 
            onClick={onOpenInfo}
            className="w-14 h-14 bg-candy-blue-light rounded-2xl shadow-candy-md border-b-8 border-x-2 border-t-2 border-candy-blue-base flex items-center justify-center text-candy-blue-deep hover:scale-110 active:scale-95 transition-all pointer-events-auto"
          >
              <Info size={28} />
          </button>
      </div>

      {/* SHOP MODAL - SOLID CANDY THEME */}
      {showShop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-candy-pink-deep/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-[3rem] p-1 shadow-candy-lg animate-pop-in border-4 border-white overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-candy-purple-light p-6 md:p-10 overflow-y-auto no-scrollbar flex-1 relative">
              <div className="candy-gloss opacity-40" />
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-3xl md:text-4xl font-display text-candy-purple-dark uppercase tracking-wider text-outline-white">
                  {t.ui.shopHeader}
                </h2>
                <button onClick={() => setShowShop(false)} className="w-12 h-12 bg-white rounded-full text-candy-pink-base shadow-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <X size={28} strokeWidth={3} />
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 mb-8 border-b-8 border-candy-yellow-base shadow-inner flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="bg-candy-yellow-base text-white p-2.5 rounded-full shadow-md">
                    <Coins size={28} fill="currentColor" />
                  </div>
                  <span className="font-display text-4xl text-candy-yellow-deep">{stats.coins}</span>
                </div>
                <span className="text-xs font-black text-candy-yellow-dark uppercase tracking-widest">{t.shop.coins}</span>
              </div>

              <div className="bg-white rounded-[2.5rem] p-6 mb-8 border-b-8 border-candy-blue-base flex items-center gap-6 relative z-10">
                <div className="w-24 h-24 shrink-0 bg-candy-blue-light rounded-3xl p-2 border-2 border-white shadow-sm">
                  <Avatar type={selectedAvatar} emotion="happy" className="w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-candy-blue-dark uppercase tracking-[0.2em]">{t.nameInput.abilityLabel}</span>
                    <Zap size={14} className="text-candy-yellow-base fill-candy-yellow-base" />
                  </div>
                  <p className="font-black text-slate-700 text-lg leading-tight">
                    {getAvatarAbilityDescription(selectedAvatar, lang)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8 relative z-10">
                {AVATAR_OPTIONS.map((id) => {
                  const unlocked = isUnlocked(id);
                  const selected = selectedAvatar === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleAvatarSelect(id)}
                      className={`
                        relative aspect-square rounded-2xl border-b-[6px] border-x-2 border-t-2 transition-all p-1
                        ${selected ? 'border-candy-purple-dark bg-white ring-4 ring-candy-purple-base shadow-candy-md' : 'border-white bg-white hover:bg-white'}
                      `}
                    >
                      <Avatar type={id} emotion={selected ? 'happy' : 'idle'} className="w-full h-full" />
                      {!unlocked && (
                        <div className="absolute inset-0 bg-candy-slate-deep/50 rounded-xl flex items-center justify-center">
                          <Lock size={20} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="w-full relative z-10">
                {currentIsUnlocked ? (
                  <GameButton fullWidth variant="success" size="xl" onClick={() => setShowShop(false)}>
                    {t.ui.select} <ArrowRight size={32} />
                  </GameButton>
                ) : (
                  <GameButton 
                    fullWidth 
                    variant="warning" 
                    size="xl"
                    disabled={stats.coins < currentAvatarConfig.price}
                    onClick={handleBuy}
                  >
                    {t.ui.buyFor} {currentAvatarConfig.price} <Coins size={32} />
                  </GameButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL - SOLID CANDY THEME */}
      {showSettings && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-candy-blue-deep/80 backdrop-blur-sm">
            <div className="w-full max-w-xs bg-candy-indigo-light rounded-[3rem] p-8 shadow-candy-lg border-b-[12px] border-x-2 border-t-2 border-candy-indigo-base animate-pop-in">
                <div className="candy-gloss opacity-40" />
                <h2 className="text-3xl font-display text-candy-indigo-dark text-center mb-8 uppercase tracking-wider text-outline-white relative z-10">{t.settings.title}</h2>
                <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between bg-white p-5 rounded-3xl border-b-4 border-candy-indigo-light shadow-inner">
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl text-white ${musicEnabled ? 'bg-candy-purple-base' : 'bg-slate-400'}`}>
                                <Music size={24} />
                            </div>
                            <span className="font-black text-slate-700">{t.settings.music}</span>
                        </div>
                        <button onClick={onToggleMusic} className={`w-16 h-9 rounded-full relative transition-colors duration-300 shadow-inner ${musicEnabled ? 'bg-candy-mint-base' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-7 h-7 bg-white rounded-full transition-all duration-300 shadow-md ${musicEnabled ? 'left-8' : 'left-1'}`} />
                        </button>
                    </div>
                </div>
                <div className="relative z-10 mt-10">
                  <GameButton fullWidth variant="indigo" size="lg" onClick={() => setShowSettings(false)}>{t.ui.close}</GameButton>
                </div>
            </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center px-6 py-12 gap-10 relative z-10 min-h-full">
          <div className="w-full flex flex-col items-center gap-4 shrink-0 mt-20">
              <h1 className="text-[min(12vw,4rem)] font-display text-white text-outline-white drop-shadow-2xl tracking-wide leading-none text-center">
                MATH QUEST
              </h1>
              <div className="inline-flex items-center gap-3 bg-candy-yellow-light text-candy-yellow-deep px-6 py-2.5 rounded-full shadow-candy-md border-b-4 border-candy-yellow-base transform hover:scale-105 transition-transform mt-2">
                  <Coins size={24} fill="currentColor" />
                  <span className="font-display text-2xl tracking-widest">{stats.coins}</span>
              </div>
          </div>

          <div className="w-full flex flex-col items-center gap-10 mb-12">
              <button 
                  type="button"
                  onClick={() => setShowShop(true)}
                  className="relative group w-56 h-56 bg-white rounded-[3.5rem] border-b-[12px] border-x-2 border-t-2 border-candy-blue-base shadow-candy-lg flex items-center justify-center hover:scale-105 transition-all duration-300 active:scale-95"
              >
                  <div className="candy-gloss opacity-30" />
                  <div className="w-44 h-44 drop-shadow-2xl relative z-10">
                      <Avatar type={selectedAvatar} emotion="happy" className="w-full h-full" />
                  </div>
                  <div className="absolute -bottom-4 bg-candy-purple-base text-white text-sm font-black px-7 py-3 rounded-full shadow-candy-md border-2 border-white uppercase tracking-wider whitespace-nowrap z-20">
                      {t.nameInput.tapToShop}
                  </div>
              </button>

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 max-w-[360px]">
                  <div className="relative group w-full">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-candy-blue-dark/40 group-focus-within:text-candy-blue-dark transition-colors z-10">
                          <User size={28} />
                      </div>
                      <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value.toUpperCase())}
                          placeholder={t.nameInput.heroName}
                          maxLength={12}
                          className="w-full bg-white border-b-[10px] border-x-2 border-t-2 border-candy-blue-light rounded-full py-5 pl-16 pr-8 text-2xl font-display text-candy-blue-deep placeholder:text-candy-slate-base focus:outline-none focus:border-candy-blue-base transition-all text-center shadow-candy-md uppercase"
                      />
                  </div>

                  <GameButton 
                    type="submit" 
                    variant="primary" 
                    size="xl"
                    fullWidth 
                    disabled={name.trim().length === 0 || !currentIsUnlocked}
                  >
                    {t.nameInput.startQuest} <ArrowRight size={32} />
                  </GameButton>

                  <GameButton 
                    type="button" 
                    variant="indigo" 
                    size="lg"
                    fullWidth 
                    onClick={onOpenStats}
                  >
                    <ChartNoAxesCombined size={24} /> {t.stats.leaderboardTitle}
                  </GameButton>
              </form>
          </div>
      </div>
    </div>
  );
};
