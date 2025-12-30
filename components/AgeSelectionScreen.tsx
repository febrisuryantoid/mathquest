
import React from 'react';
import { GameButton } from './GameButton';
import { Avatar } from './Avatar';
import { Baby, School, GraduationCap, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AgeSelectionScreenProps {
  onSelectAge: (age: number) => void;
  onBack: () => void;
  lang: Language;
}

export const AgeSelectionScreen: React.FC<AgeSelectionScreenProps> = ({ onSelectAge, onBack, lang }) => {
  const t = translations[lang];

  const ageGroups = [
    { label: `4 - 5 ${t.ageSelect.years}`, range: [4, 5], icon: <Baby size={32} className="md:w-10 md:h-10" />, color: 'border-candy-mint-base', text: 'text-candy-mint-dark', btn: 'success' },
    { label: `6 - 7 ${t.ageSelect.years}`, range: [6, 7], icon: <School size={32} className="md:w-10 md:h-10" />, color: 'border-candy-blue-base', text: 'text-candy-blue-dark', btn: 'primary' },
    { label: `8 - 9 ${t.ageSelect.years}`, range: [8, 9], icon: <GraduationCap size={32} className="md:w-10 md:h-10" />, color: 'border-candy-purple-base', text: 'text-candy-purple-dark', btn: 'secondary' },
    { label: `10 - 12 ${t.ageSelect.years}`, range: [10, 11, 12], icon: <GraduationCap size={32} className="md:w-10 md:h-10" />, color: 'border-candy-yellow-base', text: 'text-candy-yellow-dark', btn: 'warning' },
  ];

  return (
    <div className="game-container min-h-[100dvh] flex flex-col items-center animate-pop-in">
      
      {/* HEADER */}
      <div className="w-full flex items-center mb-6 md:mb-10 pt-4">
         <button 
            onClick={onBack}
            className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl shadow-candy-md flex items-center justify-center text-candy-blue-base border-2 border-white hover:scale-110 transition-all"
         >
            <ArrowLeft size={24} className="md:w-[30px] md:h-[30px]" />
         </button>
         <div className="flex-1 text-center pr-10 md:pr-14">
            <h1 className="text-3xl md:text-5xl font-display text-white text-outline-white drop-shadow-xl">
                {t.ageSelect.title}
            </h1>
         </div>
      </div>

      {/* GROUPS GRID */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-20">
        {ageGroups.map((group, idx) => (
          <div key={idx} className={`bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-6 border-b-[6px] md:border-b-[10px] border-x-2 border-t-2 ${group.color} shadow-candy-md flex flex-col items-center`}>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 w-full bg-slate-50/80 p-3 md:p-4 rounded-2xl md:rounded-[2rem] border-2 border-white shadow-inner">
                  <div className={`${group.text} shrink-0 transform scale-75 md:scale-100`}>
                      {group.icon}
                  </div>
                  <span className={`font-display text-xl md:text-2xl tracking-wide ${group.text}`}>{group.label}</span>
              </div>
              
              <div className="flex gap-2 md:gap-4 w-full">
                  {group.range.map(age => (
                      <GameButton 
                        key={age} 
                        onClick={() => onSelectAge(age)}
                        variant={group.btn as any}
                        size="xl"
                        fullWidth
                        className="!rounded-xl md:!rounded-[2rem]"
                      >
                        {age}
                      </GameButton>
                  ))}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};
