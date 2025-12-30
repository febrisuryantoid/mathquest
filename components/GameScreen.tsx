
import React, { useState, useEffect, useCallback } from 'react';
import { LevelConfig, Question, GameResult, Language, AvatarId } from '../types';
import { generateQuestion, getAvatarStats } from '../utils/gameLogic';
import { soundManager } from '../utils/sound';
import { GameButton } from './GameButton';
import { Avatar } from './Avatar';
import { Pause, Clock, Star, Zap, XCircle } from 'lucide-react';
import { translations } from '../utils/translations';

interface GameScreenProps {
  level: LevelConfig;
  onEnd: (result: GameResult) => void;
  onExit: () => void;
  lang: Language;
}

export const GameScreen: React.FC<GameScreenProps> = ({ level, onEnd, onExit, lang }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0); 
  const [isQuestionReady, setIsQuestionReady] = useState(false); 
  const [avatarId, setAvatarId] = useState<AvatarId>('robot');
  const [avatarConfig, setAvatarConfig] = useState(getAvatarStats('robot'));

  const t = translations[lang];

  useEffect(() => {
    const saved = localStorage.getItem('mathquest_stats_v3');
    if (saved) {
        const stats = JSON.parse(saved);
        if (stats.avatarId) {
            setAvatarId(stats.avatarId);
            soundManager.setAvatarId(stats.avatarId);
            const config = getAvatarStats(stats.avatarId);
            setAvatarConfig(config);
            setStreak(config.startStreak);
        }
    }
  }, []);

  useEffect(() => {
    prepareNextQuestion();
  }, [avatarConfig]);

  const prepareNextQuestion = () => {
    setIsQuestionReady(false);
    setQuestion(generateQuestion(level));
    setTimeLeft(30 + avatarConfig.timeBonus);
    setFeedback(null);
    setSelectedAnswer(null);
    setTimeout(() => { setIsQuestionReady(true); }, 600);
  };

  const nextQuestion = () => {
    if (questionIndex >= level.questionsCount) {
      finishGame();
      return;
    }
    prepareNextQuestion();
  };

  const finishGame = useCallback(() => {
    const passed = score >= level.targetScore * 0.5; 
    onEnd({
      score: Math.round(score),
      coinsEarned: 0,
      passed,
      correctCount,
      totalQuestions: level.questionsCount
    });
  }, [score, level, correctCount, onEnd]);

  useEffect(() => {
    if (isPaused || feedback !== null || !isQuestionReady) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 5 && prev > 1) soundManager.play('tick');
        if (prev <= 1) { handleTimeOut(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused, feedback, isQuestionReady]);

  const handleTimeOut = () => { handleAnswer(-999); };

  const handleAnswer = (answer: number) => {
    if (feedback !== null || !question) return;
    soundManager.init();
    setSelectedAnswer(answer);
    setIsQuestionReady(false); 
    const isCorrect = answer === question.correctAnswer;

    if (isCorrect) {
      soundManager.play('correct');
      setFeedback('correct');
      setCorrectCount(prev => prev + 1);
      const basePoints = 100;
      const speedBonus = Math.max(0, timeLeft * 10);
      const currentStreak = streak + 1;
      const streakBonus = Math.round(currentStreak * 10 * avatarConfig.streakMultiplier);
      setStreak(currentStreak);
      const rawScore = basePoints + speedBonus + streakBonus;
      const finalRoundScore = Math.round(rawScore * avatarConfig.scoreMultiplier);
      setScore(s => s + finalRoundScore);
    } else {
      soundManager.play('wrong');
      setFeedback('wrong');
      setStreak(0); 
    }

    setTimeout(() => {
      setQuestionIndex(prev => prev + 1);
      nextQuestion();
    }, 2200);
  };

  const choiceVariants: ('orange' | 'lime' | 'ocean' | 'indigo')[] = ['ocean', 'orange', 'lime', 'indigo'];

  if (!question) return null;

  return (
    <div className={`flex flex-col h-full w-full relative overflow-hidden game-container`}>
      
      {/* 3D FEEDBACK OVERLAY - SOLID COLOR */}
      {feedback && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-pop-in bg-candy-indigo-deep/90 backdrop-blur-sm p-6">
           <div className={`
              candy-surface flex flex-col items-center justify-center p-8 md:p-12 w-full max-w-md border-white border-[6px]
              ${feedback === 'correct' ? 'bg-candy-mint-base border-candy-mint-dark' : 'bg-candy-strawberry-base border-candy-strawberry-dark'}
           `}>
              <div className="candy-gloss" />
              {feedback === 'correct' ? (
                 <>
                   <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-candy-md mb-6 md:mb-8 animate-jelly">
                        <Star size={80} className="md:w-[100px] md:h-[100px] fill-candy-yellow-base text-candy-yellow-dark animate-spin-slow" />
                   </div>
                   <h2 className="text-4xl md:text-6xl font-display text-white text-outline-white text-3d mb-4 md:mb-6 uppercase tracking-wider">{t.game.correct}</h2>
                   <div className="text-3xl md:text-5xl font-black bg-white/90 px-8 md:px-14 py-3 md:py-5 rounded-[2rem] md:rounded-[2.5rem] border-b-[8px] md:border-b-[10px] border-candy-mint-dark text-candy-mint-dark shadow-inner flex items-center gap-4">
                       <Zap size={32} className="md:w-[44px] md:h-[44px]" fill="currentColor" />
                       +{Math.round((100 + Math.max(0, timeLeft * 10) + Math.round(streak * 10 * avatarConfig.streakMultiplier)) * avatarConfig.scoreMultiplier)}
                   </div>
                 </>
              ) : (
                 <>
                   <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-candy-md mb-6 md:mb-8 animate-shake">
                        <XCircle size={80} className="md:w-[100px] md:h-[100px] text-candy-strawberry-base" />
                   </div>
                   <h2 className="text-4xl md:text-6xl font-display text-white text-outline-white text-3d mb-6 md:mb-8 uppercase tracking-wider">{t.game.oops}</h2>
                   <div className="w-full bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 border-b-[8px] md:border-b-[10px] border-candy-strawberry-dark text-center">
                     <span className="text-[10px] md:text-xs uppercase font-black text-slate-400 tracking-widest mb-2 md:mb-3 block">{t.game.correctAnswerIs}</span>
                     <p className="text-6xl md:text-8xl font-display text-candy-strawberry-dark drop-shadow-md">{question.correctAnswer}</p>
                   </div>
                 </>
              )}
           </div>
        </div>
      )}

      {/* TOP FLOATING HUD - SOLID CANDY BARS */}
      <div className="flex justify-between items-center h-20 md:h-28 mb-4 md:mb-8 relative z-40">
        <div className="bg-candy-yellow-light rounded-xl md:rounded-[2rem] border-b-[6px] md:border-b-[10px] border-x-2 border-t-2 border-candy-yellow-base px-4 py-2 md:px-8 md:py-4 shadow-candy-md flex flex-col items-center min-w-[80px] md:min-w-[140px] overflow-hidden relative">
           <div className="candy-gloss opacity-50" />
           <span className="text-[10px] md:text-[12px] font-black text-candy-yellow-dark uppercase tracking-[0.2em] relative z-10">{t.game.score}</span>
           <span className="text-xl md:text-4xl font-display text-candy-yellow-deep tracking-wider leading-none mt-1 md:mt-2 relative z-10">{score}</span>
        </div>

        <div className={`
          bg-white px-6 md:px-10 py-2 md:py-4 rounded-full shadow-candy-md border-b-[6px] md:border-b-[10px] border-x-2 border-t-2 flex items-center gap-2 md:gap-5 transition-all duration-300 overflow-hidden relative
          ${timeLeft < 10 ? 'border-candy-strawberry-base bg-candy-strawberry-light' : 'border-candy-blue-base bg-candy-blue-light'}
        `}>
          <div className="candy-gloss opacity-40" />
          <Clock size={24} className={`md:w-[36px] md:h-[36px] ${timeLeft < 10 ? 'text-candy-strawberry-base' : 'text-candy-blue-base'}`} />
          <span className={`text-2xl md:text-4xl font-black font-mono tracking-tighter relative z-10 ${timeLeft < 10 ? 'text-candy-strawberry-base' : 'text-candy-blue-deep'}`}>
            {isQuestionReady ? timeLeft : '--'}
          </span>
        </div>

        <button 
          onClick={onExit} 
          className="bg-candy-strawberry-light text-candy-strawberry-base border-b-[6px] md:border-b-[10px] border-x-2 border-t-2 border-candy-strawberry-base p-2.5 md:p-5 rounded-2xl md:rounded-[2rem] shadow-candy-md active:translate-y-2 active:border-b-0 transition-all overflow-hidden relative"
        >
          <div className="candy-gloss opacity-50" />
          <Pause size={24} fill="currentColor" className="md:w-[40px] md:h-[40px] relative z-10" />
        </button>
      </div>

      {/* QUESTION AREA - SOLID MINT/BLUE BOX */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${!isQuestionReady ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        <div className="flex-1 flex flex-col items-center justify-center py-2 md:py-6">
            <div className="w-32 h-32 md:w-56 md:h-56 relative mb-4 md:mb-10 animate-float">
                <Avatar 
                    type={avatarId}
                    emotion={feedback === 'correct' ? 'happy' : feedback === 'wrong' ? 'sad' : 'thinking'} 
                    className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] md:drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)]" 
                />
            </div>

            <div className="bg-candy-blue-light rounded-[2.5rem] md:rounded-[3.5rem] border-b-[8px] md:border-b-[15px] border-x-2 border-t-2 border-candy-blue-base w-full max-w-2xl shadow-candy-lg relative overflow-hidden">
              <div className="candy-gloss opacity-40" />
              <div className="p-6 md:p-16 flex flex-col items-center justify-center relative z-10">
                 
                 <div className="absolute top-4 right-4 md:top-6 md:right-8 bg-white/80 text-candy-blue-deep text-[10px] md:text-xs font-black px-3 py-1.5 md:px-6 md:py-2.5 rounded-full border-2 border-candy-blue-base shadow-sm z-10">
                   {questionIndex + 1} / {level.questionsCount}
                 </div>

                 {question.visual ? (
                    <div className="flex flex-col items-center gap-6 md:gap-10 w-full relative z-10 pt-4">
                       <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 w-full">
                          <div className="bg-white p-4 md:p-8 rounded-3xl md:rounded-[2.5rem] border-b-4 md:border-b-[8px] border-candy-blue-light shadow-inner min-w-[100px] md:min-w-[150px] flex items-center justify-center">
                            <div className={`grid ${question.visual.count1 > 4 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 md:gap-4`}>
                                {Array.from({length: question.visual.count1}).map((_, i) => (
                                  <span key={i} className="text-3xl md:text-5xl filter drop-shadow-md">{question.visual?.icon}</span>
                                ))}
                            </div>
                          </div>
                          <div className="text-candy-blue-deep font-display text-4xl md:text-7xl text-3d">{question.operator}</div>
                          <div className="bg-white p-4 md:p-8 rounded-3xl md:rounded-[2.5rem] border-b-4 md:border-b-[8px] border-candy-blue-light shadow-inner min-w-[100px] md:min-w-[150px] flex items-center justify-center">
                            <div className={`grid ${question.visual.count2 > 4 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 md:gap-4`}>
                                {Array.from({length: question.visual.count2}).map((_, i) => (
                                  <span key={i} className="text-3xl md:text-5xl filter drop-shadow-md">{question.visual?.icon}</span>
                                ))}
                            </div>
                          </div>
                       </div>
                       <div className="text-candy-blue-deep font-black text-xl md:text-3xl bg-white px-6 md:px-12 py-2 md:py-4 rounded-full border-b-4 border-candy-blue-light shadow-sm">
                         {question.num1} {question.operator} {question.num2} = ?
                       </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-4 md:gap-10 relative z-10 pt-4">
                        <span className="text-6xl md:text-[9rem] font-display text-candy-blue-deep text-3d text-outline-white">{question.num1}</span>
                        <span className="text-4xl md:text-8xl font-display text-candy-pink-base text-3d">{question.operator}</span>
                        <span className="text-6xl md:text-[9rem] font-display text-candy-blue-deep text-3d text-outline-white">{question.num2}</span>
                    </div>
                )}
              </div>
            </div>
        </div>

        {/* 3D CHOICES GRID */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 w-full pb-6 md:pb-12">
          {question.choices.map((choice, idx) => {
             const variant = choiceVariants[idx % choiceVariants.length];
             let isDimmed = feedback !== null && choice !== question.correctAnswer && choice !== selectedAnswer;
            return (
              <GameButton 
                key={idx}
                fullWidth
                variant={variant}
                onClick={() => handleAnswer(choice)}
                disabled={feedback !== null || !isQuestionReady}
                size="xl"
                className={`transition-all duration-300 ${isDimmed ? 'opacity-30 scale-90 grayscale' : 'hover:scale-105 active:scale-95'}`}
              >
                {choice}
              </GameButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};
