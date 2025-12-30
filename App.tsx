
import React, { useState, useEffect } from 'react';
import { GameView, LevelConfig, PlayerStats, GameResult, Language, AvatarId, Notification } from './types';
import { getLevelsForAge } from './utils/gameLogic';
import { soundManager } from './utils/sound';
import { supabase } from './utils/supabase';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { StatsScreen } from './components/StatsScreen';
import { AgeSelectionScreen } from './components/AgeSelectionScreen';
import { NameInputScreen } from './components/NameInputScreen';
import { AboutModal } from './components/AboutModal';
import { Trophy, Bell } from 'lucide-react';
import { translations } from './utils/translations';

export const App: React.FC = () => {
  const [view, setView] = useState<GameView>(GameView.NAME_INPUT);
  const [previousView, setPreviousView] = useState<GameView | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [currentLevel, setCurrentLevel] = useState<LevelConfig | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionCoins, setSessionCoins] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [activeLevels, setActiveLevels] = useState<LevelConfig[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // State for manual language control with persistence
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('mathquest_lang');
    if (savedLang === 'id' || savedLang === 'en') return savedLang as Language;
    
    // Auto-detect based on browser preference, default to ID
    const browserLang = navigator.language || (navigator as any).userLanguage || 'id';
    return browserLang.toLowerCase().startsWith('id') ? 'id' : 'en';
  });

  // State for Theme (Dark/Light)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('mathquest_theme');
    return (savedTheme === 'dark') ? 'dark' : 'light';
  });
  
  const t = translations[language];

  // Effect to handle head meta and storage on language change
  useEffect(() => {
    document.title = translations[language].meta.title;
    localStorage.setItem('mathquest_lang', language);
  }, [language]);

  // Effect to handle Theme
  useEffect(() => {
    localStorage.setItem('mathquest_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const [playerStats, setPlayerStats] = useState<PlayerStats>(() => {
    const saved = localStorage.getItem('mathquest_stats_v3');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.coins) parsed.coins = 0;
      if (!parsed.unlockedAvatars) parsed.unlockedAvatars = ['robot', 'cat', 'ninja'];
      return parsed;
    }
    return { 
      selectedAge: null,
      unlockedLevels: {}, 
      totalScore: 0, 
      coins: 0, 
      unlockedAvatars: ['robot', 'cat', 'ninja'],
      stars: {}, 
      gamesPlayed: 0,
      gamesWon: 0,
      totalQuestionsAnswered: 0,
      totalQuestionsCorrect: 0,
      avatarId: 'robot'
    };
  });

  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);

  useEffect(() => {
    if (playerStats.selectedAge) {
      setActiveLevels(getLevelsForAge(playerStats.selectedAge, language));
    }
  }, [language, playerStats.selectedAge]);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  useEffect(() => {
    if (playerStats.avatarId) {
        soundManager.setAvatarId(playerStats.avatarId);
    }
  }, [playerStats.avatarId]);

  useEffect(() => {
    localStorage.setItem('mathquest_stats_v3', JSON.stringify(playerStats));
  }, [playerStats]);

  useEffect(() => {
    soundManager.setMusicEnabled(musicEnabled);
  }, [musicEnabled]);

  useEffect(() => {
    soundManager.setSFXEnabled(sfxEnabled);
  }, [sfxEnabled]);

  const handleUserInteraction = () => {
    soundManager.init();
  };

  const handleBuyAvatar = (id: AvatarId, price: number): boolean => {
    if (playerStats.coins >= price && !playerStats.unlockedAvatars.includes(id)) {
        setPlayerStats(prev => ({
            ...prev,
            coins: prev.coins - price,
            unlockedAvatars: [...prev.unlockedAvatars, id],
            avatarId: id 
        }));
        return true;
    }
    return false;
  };

  const handleNameSubmit = (name: string, avatar: AvatarId) => {
    handleUserInteraction();
    const cleanName = name.trim().toUpperCase().replace(/\s+/g, ' ');
    setPlayerName(cleanName);
    setPlayerStats(prev => ({ ...prev, avatarId: avatar }));
    setView(GameView.AGE_SELECT);
  };

  const handleSelectAge = (age: number) => {
    handleUserInteraction();
    soundManager.play('click');
    setPlayerStats(prev => ({ ...prev, selectedAge: age }));
    setActiveLevels(getLevelsForAge(age, language));
    setView(GameView.MENU);
  };

  const handleStartLevel = (level: LevelConfig) => {
    setCurrentLevel(level);
    setSessionScore(0);
    setSessionCoins(0);
    setView(GameView.PLAYING);
  };

  const handleGameEnd = async (result: GameResult) => {
    if (!currentLevel || !playerStats.selectedAge) return;

    setSessionScore(result.score);
    setIsWin(result.passed);

    const coinsEarned = Math.floor(result.score / 10) + (result.passed ? 50 : 0);
    setSessionCoins(coinsEarned);

    let finalStats = { ...playerStats };

    setPlayerStats(prev => {
      const currentAge = prev.selectedAge!;
      let nextLevelUnlocked = prev.unlockedLevels[currentAge] || 1;
      let newStars = { ...prev.stars };
      let newTotalScore = prev.totalScore;

      if (result.passed) {
        if (currentLevel.level === nextLevelUnlocked && nextLevelUnlocked < 10) {
           nextLevelUnlocked = currentLevel.level + 1;
        }
        const starsEarned = result.score >= currentLevel.targetScore ? 3 : result.score >= currentLevel.targetScore * 0.7 ? 2 : 1;
        const currentStars = prev.stars[currentLevel.id] || 0;
        newTotalScore = prev.totalScore + result.score; 
        newStars[currentLevel.id] = Math.max(starsEarned, currentStars);
      }
      
      finalStats = {
        ...prev,
        unlockedLevels: { ...prev.unlockedLevels, [currentAge]: nextLevelUnlocked },
        totalScore: newTotalScore,
        coins: prev.coins + coinsEarned,
        stars: newStars,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: result.passed ? prev.gamesWon + 1 : prev.gamesWon,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + result.totalQuestions,
        totalQuestionsCorrect: prev.totalQuestionsCorrect + result.correctCount,
      };
      
      return finalStats;
    });

    if (playerName && result.passed && finalStats.totalScore > 0) {
      try {
        const cleanName = playerName.trim().toUpperCase().replace(/\s+/g, ' ');
        const { data: existingUsers } = await supabase.from('leaderboard').select('id, score').eq('name', cleanName).limit(1);
        const existingUser = existingUsers && existingUsers.length > 0 ? existingUsers[0] : null;

        if (existingUser) {
            if (finalStats.totalScore > existingUser.score) {
                await supabase.from('leaderboard').update({ score: finalStats.totalScore, avatar: finalStats.avatarId }).eq('id', existingUser.id);
            }
        } else {
            await supabase.from('leaderboard').insert([{ name: cleanName, score: finalStats.totalScore, avatar: finalStats.avatarId }]);
        }
      } catch (error) { console.error(error); }
    }
    setView(GameView.RESULT);
  };

  const handleBackToMenu = () => setView(GameView.MENU);
  const handleChangeAge = () => setView(GameView.AGE_SELECT);
  const handleRetry = () => currentLevel && handleStartLevel(currentLevel);

  const handleNextLevel = () => {
    if (!currentLevel) return;
    const nextLevelIdx = activeLevels.findIndex(l => l.level === currentLevel.level) + 1;
    if (nextLevelIdx < activeLevels.length) {
      handleStartLevel(activeLevels[nextLevelIdx]);
    } else {
      setView(GameView.MENU);
    }
  };

  const toggleMusic = () => setMusicEnabled(!musicEnabled);
  const toggleSfx = () => setSfxEnabled(!sfxEnabled);
  const toggleLanguage = () => {
    soundManager.play('click');
    const nextLang = language === 'id' ? 'en' : 'id';
    setLanguage(nextLang);
  };
  const toggleTheme = () => {
    soundManager.play('click');
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-[100dvh] relative font-sans overflow-x-hidden" onClick={handleUserInteraction}>
      <div className="bg-main"></div>
      
      {/* Notifications HUD */}
      <div className="fixed top-24 left-0 right-0 z-[150] flex flex-col items-center gap-2 pointer-events-none px-4">
        {notifications.map(note => (
          <div 
            key={note.id} 
            className={`
              animate-pop-in px-6 py-3 rounded-2xl shadow-xl border-b-8 border-x-2 border-t-2 border-white/50 flex items-center gap-3 min-w-[300px] justify-center
              ${note.type === 'success' ? 'bg-candy-yellow-base text-candy-yellow-deep' : 
                note.type === 'warning' ? 'bg-candy-strawberry-base text-white' : 
                'bg-candy-blue-base text-white'}
            `}
          >
             {note.type === 'success' ? <Trophy size={24} className="animate-bounce" /> : <Bell size={24} />}
             <span className="font-bold font-display tracking-wide text-center">{note.message}</span>
          </div>
        ))}
      </div>

      <div className={`relative z-10 w-full mx-auto min-h-[100dvh] flex flex-col transition-all duration-300`}>
        <div className="flex-1 flex flex-col min-h-0">
          {view === GameView.NAME_INPUT && (
            <NameInputScreen 
               onSubmit={handleNameSubmit} 
               lang={language}
               musicEnabled={musicEnabled}
               sfxEnabled={sfxEnabled}
               theme={theme}
               onToggleMusic={toggleMusic}
               onToggleSfx={toggleSfx}
               onToggleLang={toggleLanguage}
               onToggleTheme={toggleTheme}
               stats={playerStats}
               onBuyAvatar={handleBuyAvatar}
               onOpenStats={() => { setPreviousView(GameView.NAME_INPUT); setView(GameView.STATS); }}
               onOpenInfo={() => setIsAboutOpen(true)}
            />
          )}

          {view === GameView.AGE_SELECT && (
            <AgeSelectionScreen 
              onSelectAge={handleSelectAge} 
              onBack={() => setView(GameView.NAME_INPUT)}
              lang={language} 
            />
          )}

          {view === GameView.MENU && (
            <MainMenu 
              stats={playerStats}
              availableLevels={activeLevels}
              onSelectLevel={handleStartLevel} 
              onOpenStats={() => { setPreviousView(GameView.MENU); setView(GameView.STATS); }}
              onChangeAge={handleChangeAge}
              lang={language}
            />
          )}
          
          {view === GameView.STATS && (
            <StatsScreen stats={playerStats} onBack={() => setView(previousView || GameView.MENU)} lang={language} />
          )}

          {view === GameView.PLAYING && currentLevel && (
            <GameScreen level={currentLevel} onEnd={handleGameEnd} onExit={handleBackToMenu} lang={language} />
          )}

          {view === GameView.RESULT && currentLevel && (
            <ResultScreen 
              score={sessionScore} targetScore={currentLevel.targetScore} isWin={isWin}
              level={currentLevel} onRetry={handleRetry} onMenu={handleBackToMenu}
              onNext={handleNextLevel} isMaxLevel={currentLevel.level === activeLevels.length}
              lang={language} coinsEarned={sessionCoins}
            />
          )}
        </div>
      </div>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} lang={language} />
    </div>
  );
};
