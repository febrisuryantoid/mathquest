
export type Language = 'id' | 'en';

export type AvatarId = 
  | 'robot' 
  | 'cat' 
  | 'bear' 
  | 'bunny' 
  | 'wizard' 
  | 'fairy' 
  | 'angel' 
  | 'hero' 
  | 'dino' 
  | 'royal'
  | 'ninja'
  | 'alien';

export enum GameView {
  NAME_INPUT = 'NAME_INPUT',
  AGE_SELECT = 'AGE_SELECT',
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
  STATS = 'STATS',
}

export enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = 'x',
  DIVIDE = '÷',
}

export interface Question {
  id: string;
  num1: number;
  num2: number;
  operator: Operator;
  correctAnswer: number;
  choices: number[];
  visual?: {
    icon: string; // Emoji
    count1: number;
    count2: number;
  };
}

export interface LevelConfig {
  id: string; // Unique ID combining age and level
  level: number;
  name: string;
  description: string;
  operators: Operator[];
  numberRange: [number, number]; // Min, Max
  questionsCount: number;
  targetScore: number;
  isVisual: boolean; // If true, show fruits
}

export interface PlayerStats {
  selectedAge: number | null;
  unlockedLevels: Record<number, number>; // Age -> MaxLevel
  totalScore: number;
  coins: number; // New: Currency
  unlockedAvatars: AvatarId[]; // New: Inventory
  stars: Record<string, number>; // LevelID -> stars (0-3)
  gamesPlayed: number;
  gamesWon: number;
  totalQuestionsAnswered: number;
  totalQuestionsCorrect: number;
  avatarId: AvatarId; 
}

export interface GameResult {
  score: number;
  coinsEarned: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
