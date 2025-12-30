
import React from 'react';
import { X, Globe, User, History, Library, Heart, MapPin } from 'lucide-react';
import { translations } from '../utils/translations';
import { Language } from '../types';
import { GameButton } from './GameButton';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const t = translations[lang];
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-candy-blue-deep/90 backdrop-blur-md animate-pop-in">
      <div className="candy-surface bg-white w-full max-w-2xl max-h-[85vh] flex flex-col shadow-candy-lg border-[6px] border-white">
        <div className="candy-gloss opacity-30" />
        
        {/* Header */}
        <div className="bg-candy-blue-light p-6 md:p-8 flex justify-between items-center relative z-10">
          <h2 className="text-3xl font-display text-candy-blue-dark uppercase tracking-wider text-outline-white">
            {t.about.title}
          </h2>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white rounded-full text-candy-pink-base shadow-candy-sm border-2 border-candy-pink-light flex items-center justify-center active:scale-90 transition-transform"
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar relative z-10">
          
          {/* Section: Game Info */}
          <div className="bg-candy-mint-light rounded-3xl p-6 border-b-8 border-candy-mint-base">
             <div className="flex items-center gap-3 mb-4 text-candy-mint-dark">
                <Globe size={24} />
                <h3 className="font-black text-lg uppercase tracking-widest">{t.about.sectionGame}</h3>
             </div>
             <p className="text-slate-700 leading-relaxed font-medium">
                {t.about.gameDescription}
             </p>
          </div>

          {/* Section: Developer */}
          <div className="bg-candy-purple-light rounded-3xl p-6 border-b-8 border-candy-purple-base flex flex-col md:flex-row gap-6">
             <div className="shrink-0 flex justify-center">
                <div className="w-24 h-24 bg-white rounded-[2rem] p-1 border-4 border-candy-purple-base shadow-md">
                   <img 
                      src="https://khncsblrkszxmkuqkyyy.supabase.co/storage/v1/object/public/images/avatar-febri.png" 
                      alt="Febri Suryanto"
                      className="w-full h-full object-cover rounded-[1.5rem]"
                      onError={(e) => (e.currentTarget.src = "https://ui-avatars.com/api/?name=Febri+Suryanto&background=A855F7&color=fff")}
                   />
                </div>
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 text-candy-purple-dark">
                   <User size={24} />
                   <h3 className="font-black text-lg uppercase tracking-widest">{t.about.sectionDev}</h3>
                </div>
                <h4 className="font-display text-xl text-slate-800 mb-1">{t.about.developerName}</h4>
                <p className="text-xs font-black text-candy-purple-dark uppercase tracking-widest mb-2 opacity-70">{t.about.developerTitle}</p>
                <div className="flex items-center gap-1.5 text-xs text-candy-purple-dark/80 font-bold mb-3">
                   <MapPin size={12} /> {t.about.developerLocation}
                </div>
                <p className="text-sm text-slate-600 mb-4">{t.about.developerBio}</p>
                <a 
                   href="https://febrisuryanto.com" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full border-2 border-candy-purple-base text-candy-purple-dark font-black text-xs hover:bg-candy-purple-base hover:text-white transition-colors"
                >
                   {t.about.visit} <Globe size={14} />
                </a>
             </div>
          </div>

          {/* Section: Changelog */}
          <div className="bg-candy-orange-light rounded-3xl p-6 border-b-8 border-candy-orange-base">
             <div className="flex items-center gap-3 mb-4 text-candy-orange-dark">
                <History size={24} />
                <h3 className="font-black text-lg uppercase tracking-widest">{t.about.sectionChangelog}</h3>
             </div>
             <div className="space-y-3">
                {t.about.changes.map((change, i) => (
                    <div key={i} className="flex gap-3 bg-white/50 p-3 rounded-2xl border border-white">
                        <div className="w-2 h-2 rounded-full bg-candy-orange-base mt-1.5 shrink-0" />
                        <span className="text-sm text-slate-700 font-medium">{change}</span>
                    </div>
                ))}
             </div>
          </div>

          {/* Section: Credits */}
          <div className="bg-candy-indigo-light rounded-3xl p-6 border-b-8 border-candy-indigo-base">
             <div className="flex items-center gap-3 mb-4 text-candy-indigo-dark">
                <Library size={24} />
                <h3 className="font-black text-lg uppercase tracking-widest">{t.about.sectionCredits}</h3>
             </div>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.about.assets.map((asset, i) => (
                    <li key={i} className="bg-white/60 px-4 py-2 rounded-xl text-xs font-black text-slate-600 border border-white">
                        {asset}
                    </li>
                ))}
             </ul>
          </div>

          <div className="flex flex-col items-center justify-center py-6 gap-2">
             <div className="flex items-center gap-2 text-candy-pink-base font-black uppercase text-sm">
                {t.about.madeWith} <Heart size={20} fill="currentColor" /> {t.about.inLocation}
             </div>
             <span className="text-xs text-slate-400 font-medium tracking-tighter text-center">
               Copyright © {currentYear} MathQuest by {t.about.developerName}<br/>
               <span className="opacity-50 text-[10px] uppercase font-bold tracking-widest">{t.about.fromBanten}</span>
             </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 md:p-8 bg-slate-50 border-t-2 border-slate-100 shrink-0 relative z-10">
           <GameButton fullWidth variant="primary" size="lg" onClick={onClose}>
              {t.about.close}
           </GameButton>
        </div>
      </div>
    </div>
  );
};
