
import React, { useEffect, useState } from 'react';
import { PlayerStats, Language, AvatarId } from '../types';
import { Avatar } from './Avatar';
import { ArrowLeft, Trophy, Target, PieChart, Crown, BarChart3, Loader2, Medal } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { translations } from '../utils/translations';

interface StatsScreenProps {
  stats: PlayerStats;
  onBack: () => void;
  lang: Language;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  avatar: AvatarId;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ stats, onBack, lang }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('leaderboard') 
          .select('name, score, avatar')
          .gt('score', 0)
          .order('score', { ascending: false })
          .limit(20);
        
        if (error) throw error;
        if (data) {
          setLeaderboard(data as LeaderboardEntry[]);
        }
      } catch (err: any) {
        console.error("Error fetching leaderboard:", err.message || err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const accuracy = stats.totalQuestionsAnswered > 0 
    ? Math.round((stats.totalQuestionsCorrect / stats.totalQuestionsAnswered) * 100) 
    : 0;

  const winRate = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  let rankTitle = t.stats.ranks.beginner;
  if (stats.totalScore > 1000) rankTitle = t.stats.ranks.adventurer;
  if (stats.totalScore > 5000) rankTitle = t.stats.ranks.expert;
  if (stats.totalScore > 10000) rankTitle = t.stats.ranks.master;

  const levels = Array.from({length: 10}, (_, i) => i + 1);
  const unlocked = stats.selectedAge ? (stats.unlockedLevels[stats.selectedAge] || 1) : 1;

  const getRankStyle = (index: number) => {
    if (index === 0) return {
      container: "bg-candy-yellow-light border-candy-yellow-base",
      badge: "bg-candy-yellow-base text-white border-2 border-white shadow-md",
      text: "text-candy-yellow-deep",
      score: "bg-white text-candy-yellow-deep border-candy-yellow-base",
      icon: <Crown className="text-candy-yellow-dark fill-candy-yellow-base w-6 h-6 md:w-8 md:h-8" />
    };
    if (index === 1) return {
      container: "bg-candy-slate-light border-candy-slate-base",
      badge: "bg-candy-slate-base text-white border-2 border-white",
      text: "text-candy-slate-deep",
      score: "bg-white text-candy-slate-deep border-candy-slate-base",
      icon: <Medal className="text-candy-slate-dark w-5 h-5 md:w-7 md:h-7" />
    };
    const colors = ["indigo", "pink", "blue", "purple", "orange"];
    const col = colors[index % colors.length];
    return {
      container: `bg-candy-${col}-light border-candy-${col}-base`,
      badge: `bg-candy-${col}-base text-white border-2 border-white`,
      text: `text-candy-${col}-deep`,
      score: `bg-white text-candy-${col}-deep border-candy-${col}-base`,
      icon: null
    };
  };

  return (
    <div className="flex flex-col min-h-full animate-pop-in pb-24 px-4 md:px-6 -mx-4 pt-4 overflow-y-auto no-scrollbar">
      
      <div className="flex items-center mb-6 md:mb-10 shrink-0">
        <button 
          onClick={onBack}
          className="w-10 h-10 md:w-14 md:h-14 bg-candy-indigo-light rounded-xl md:rounded-2xl shadow-candy-md flex items-center justify-center text-candy-indigo-base border-b-[4px] md:border-b-8 border-x-2 border-t-2 border-candy-indigo-base hover:scale-110 active:scale-95 transition-all"
        >
          <ArrowLeft size={24} className="md:w-[32px] md:h-[32px]" strokeWidth={3} />
        </button>
        <h1 className="flex-1 text-center text-2xl md:text-5xl font-display text-white text-outline-white drop-shadow-2xl tracking-wide uppercase">
          {t.stats.title}
        </h1>
        <div className="w-10 md:w-14"></div>
      </div>

      <div className="bg-candy-indigo-light rounded-3xl md:rounded-[3rem] border-b-[8px] md:border-b-[15px] border-x-2 border-t-2 border-candy-indigo-base p-6 md:p-8 relative overflow-hidden mb-8 md:mb-12 shadow-candy-lg">
        <div className="candy-gloss opacity-50" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] mb-4 md:mb-6 shadow-candy-md border-b-[6px] md:border-b-[8px] border-candy-indigo-light">
               <Avatar type={stats.avatarId} emotion="happy" className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          
          <h2 className="text-xl md:text-3xl font-display text-candy-indigo-deep uppercase tracking-widest bg-white/90 px-6 md:px-10 py-2 md:py-3 rounded-full border-b-[3px] md:border-b-4 border-candy-indigo-base shadow-sm">
            {rankTitle}
          </h2>
          
          <div className="grid grid-cols-3 gap-2 md:gap-5 w-full mt-6 md:mt-10">
            {[
              { label: t.stats.score, val: stats.totalScore, icon: <Trophy />, col: 'blue' },
              { label: t.stats.accuracy, val: `${accuracy}%`, icon: <Target />, col: 'pink' },
              { label: t.stats.winRate, val: `${winRate}%`, icon: <PieChart />, col: 'mint' }
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col items-center p-3 md:p-5 bg-white rounded-2xl md:rounded-[2rem] border-b-[4px] md:border-b-8 border-candy-${item.col}-base shadow-inner`}>
                 <div className={`text-candy-${item.col}-base mb-1 md:mb-3`}>{React.cloneElement(item.icon as any, { size: 20, className: "md:w-8 md:h-8" })}</div>
                 <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-2 leading-none">{item.label}</span>
                 <span className="font-display text-lg md:text-2xl text-slate-800">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl md:rounded-[3rem] border-b-[8px] md:border-b-[12px] border-x-2 border-t-2 border-candy-blue-base p-6 md:p-10 shadow-candy-lg mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-display text-candy-blue-deep mb-4 md:mb-8 flex items-center gap-2 md:gap-4 uppercase tracking-widest">
            <BarChart3 className="text-candy-blue-base w-6 h-6 md:w-8 md:h-8" /> {t.stats.chartTitle}
            </h3>
            <div className="flex items-end justify-between h-40 md:h-52 gap-2 md:gap-4 pt-6 md:pt-10 border-b-[4px] md:border-b-[6px] border-candy-blue-light pb-4">
                {levels.map(lvl => {
                    const id = `age_${stats.selectedAge}_lvl_${lvl}`;
                    const stars = stats.stars[id] || 0;
                    const height = Math.max(15, (stars / 3) * 100);
                    const isUnlocked = lvl <= unlocked;
                    
                    let col = 'slate';
                    if (stars === 3) col = 'yellow';
                    else if (stars === 2) col = 'blue';
                    else if (stars === 1) col = 'mint';
                    else if (isUnlocked) col = 'purple';

                    return (
                    <div key={lvl} className="flex-1 flex flex-col items-center gap-1 md:gap-4 h-full justify-end group">
                        <div className="relative w-full h-full flex items-end">
                            <div 
                                className={`w-full rounded-t-lg md:rounded-t-2xl transition-all duration-1000 ease-out border-x border-t md:border-x-2 md:border-t-2 border-white shadow-md bg-candy-${col}-base border-candy-${col}-dark`}
                                style={{ height: `${height}%` }}
                            >
                                <div className="candy-gloss opacity-40" />
                            </div>
                        </div>
                        <span className={`text-[10px] md:text-sm font-black ${isUnlocked ? 'text-candy-blue-deep' : 'text-slate-300'}`}>{lvl}</span>
                    </div>
                    )
                })}
            </div>
      </div>

      <div className="mb-12 shrink-0">
        <h3 className="text-2xl md:text-4xl font-display text-white text-outline-white mb-6 md:mb-10 px-4 flex items-center justify-center gap-3 md:gap-5 drop-shadow-2xl">
          <Crown className="text-candy-yellow-base fill-candy-yellow-base w-10 h-10 md:w-14 md:h-14" /> {t.stats.leaderboardTitle}
        </h3>
        
        {loading ? (
           <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-white drop-shadow-lg" size={40} />
           </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-8 px-1 md:px-2"> 
            {leaderboard.map((player, index) => {
                const style = getRankStyle(index);
                return (
                    <div key={index} className="p-0.5 md:p-1">
                        <div className={`relative flex items-center gap-3 md:gap-6 p-4 md:p-5 rounded-3xl md:rounded-[2.5rem] border-b-[6px] md:border-b-[10px] border-x-2 border-t-2 transition-all shadow-candy-md ${style.container}`}>
                            <div className="candy-gloss opacity-30" />
                            <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-[1.25rem] flex items-center justify-center font-display text-lg md:text-3xl shrink-0 z-10 ${style.badge}`}>
                                {index + 1}
                            </div>
                            
                            <div className="w-10 h-10 md:w-16 md:h-16 shrink-0 bg-white rounded-xl md:rounded-2xl p-1 md:p-1.5 border-2 border-white/50 z-10 shadow-sm">
                                <Avatar type={player.avatar || 'robot'} emotion="happy" className="w-full h-full" />
                            </div>
                            
                            <div className="flex-1 min-w-0 flex items-center gap-2 md:gap-4 z-10">
                                <div className={`font-black text-lg md:text-2xl truncate tracking-wide ${style.text}`}>{player.name}</div>
                                {style.icon}
                            </div>
                            
                            <div className={`font-display text-xl md:text-3xl px-3 py-1.5 md:px-6 md:py-3 rounded-xl md:rounded-[1.5rem] border-b-[3px] md:border-b-4 shadow-inner z-10 ${style.score}`}>
                                {player.score}
                            </div>
                        </div>
                    </div>
                );
            })}
          </div>
        )}
      </div>
      <div className="h-16 md:h-24 shrink-0"></div>
    </div>
  );
};
