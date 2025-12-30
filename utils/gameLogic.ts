
import { LevelConfig, Operator, Question, Language, AvatarId } from '../types';
import { translations } from './translations';

// Expanded emoji sets for variety in visual questions
const VISUAL_ICONS = [
  '🍎', '🍌', '🍇', '🍊', '🍓', '🍍', '🥥', '🍉', // Fruits
  '🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🦁', // Animals
  '🚗', '🚕', '🚙', '🚌', '🚓', '🚑', '🚒', '🚐', // Vehicles
  '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', // Sports
  '🌟', '🎈', '🎁', '🎀', '🧸', '🎵', '🍄', '🌸'  // Objects
];

export interface AvatarConfig {
  price: number;
  scoreMultiplier: number;
  timeBonus: number; // Seconds added to timer
  streakMultiplier: number; // Multiplier for streak points
  startStreak: number; // Starting streak count
}

// BALANCED & SORTED BY PRICE/TIER
export const getAvatarStats = (id: AvatarId): AvatarConfig => {
  switch (id) {
    // TIER 1: FREE (Starters)
    case 'robot': return { price: 0, scoreMultiplier: 1.05, timeBonus: 0, streakMultiplier: 1.0, startStreak: 0 }; 
    case 'cat': return { price: 0, scoreMultiplier: 1.0, timeBonus: 0, streakMultiplier: 1.0, startStreak: 1 };
    case 'ninja': return { price: 0, scoreMultiplier: 1.0, timeBonus: 0, streakMultiplier: 1.0, startStreak: 2 };

    // TIER 2: CHEAP (500 Coins)
    case 'bear': return { price: 500, scoreMultiplier: 1.0, timeBonus: 3, streakMultiplier: 1.0, startStreak: 0 }; 
    case 'bunny': return { price: 500, scoreMultiplier: 1.0, timeBonus: 5, streakMultiplier: 1.0, startStreak: 0 }; 
    case 'alien': return { price: 500, scoreMultiplier: 1.0, timeBonus: 4, streakMultiplier: 1.1, startStreak: 0 };

    // TIER 3: MID (1500 Coins)
    case 'wizard': return { price: 1500, scoreMultiplier: 1.1, timeBonus: 2, streakMultiplier: 1.0, startStreak: 0 }; 
    case 'fairy': return { price: 1500, scoreMultiplier: 1.0, timeBonus: 0, streakMultiplier: 1.2, startStreak: 0 }; 

    // TIER 4: HIGH (3000 Coins)
    case 'angel': return { price: 3000, scoreMultiplier: 1.05, timeBonus: 5, streakMultiplier: 1.0, startStreak: 0 }; 
    case 'hero': return { price: 3000, scoreMultiplier: 1.15, timeBonus: 0, streakMultiplier: 1.1, startStreak: 0 }; 

    // TIER 5: PREMIUM (5000 Coins)
    case 'dino': return { price: 5000, scoreMultiplier: 1.0, timeBonus: 0, streakMultiplier: 1.5, startStreak: 0 }; 
    case 'royal': return { price: 5000, scoreMultiplier: 1.25, timeBonus: 0, streakMultiplier: 1.0, startStreak: 0 }; 

    default: return { price: 0, scoreMultiplier: 1.0, timeBonus: 0, streakMultiplier: 1.0, startStreak: 0 };
  }
};

export const getAvatarAbilityDescription = (id: AvatarId, lang: Language): string => {
  return translations[lang].abilities[id];
};

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate 10 levels dynamically based on Age and Language
export const getLevelsForAge = (age: number, lang: Language = 'id'): LevelConfig[] => {
  const levels: LevelConfig[] = [];
  
  const isEn = lang === 'en';

  for (let i = 1; i <= 10; i++) {
    let config: Partial<LevelConfig> = {
      level: i,
      questionsCount: 10, // Standard 10 questions per level
      id: `age_${age}_lvl_${i}`,
    };

    // Age 4-5: Introduction to counting and simple addition (Visual)
    if (age >= 4 && age <= 5) {
      config.isVisual = true;
      config.operators = [Operator.ADD];
      config.numberRange = [1, Math.min(10, 2 + i)]; 
      config.name = isEn ? `Happy Garden ${i}` : `Kebun Ceria ${i}`;
      config.description = isEn ? "Count the items!" : "Hitung gambar lucu!";
      config.targetScore = 500 + (i * 50);
    }
    // Age 6-7: Addition and Subtraction (Visual -> Numbers)
    else if (age >= 6 && age <= 7) {
      config.isVisual = i <= 5; // First 5 levels visual, then numbers
      config.operators = i <= 5 ? [Operator.ADD] : [Operator.ADD, Operator.SUBTRACT];
      
      if (config.isVisual) {
        config.numberRange = [1, Math.min(10, 4 + i)];
      } else {
        config.numberRange = [1, 5 + (i * 2)];
      }

      config.name = isEn ? `Adventure ${i}` : `Petualangan ${i}`;
      config.description = config.isVisual 
        ? (isEn ? "Counting Pictures" : "Berhitung Gambar") 
        : (isEn ? "Fun Numbers" : "Angka Seru");
      config.targetScore = 600 + (i * 60);
    }
    // Age 8-9: Intro to Multiplication
    else if (age >= 8 && age <= 9) {
      config.isVisual = false;
      if (i <= 3) config.operators = [Operator.ADD, Operator.SUBTRACT];
      else if (i <= 7) config.operators = [Operator.MULTIPLY];
      else config.operators = [Operator.ADD, Operator.SUBTRACT, Operator.MULTIPLY];
      
      config.numberRange = [2, 10 + (i * 3)];
      config.name = isEn ? `Challenge ${i}` : `Tantangan ${i}`;
      config.description = i <= 3 
        ? (isEn ? "Add & Subtract" : "Tambah Kurang") 
        : (isEn ? "Basic Multiplication" : "Perkalian Dasar");
      config.targetScore = 800 + (i * 80);
    }
    // Age 10-12: Advanced (All operators)
    else {
      config.isVisual = false;
      if (i <= 3) config.operators = [Operator.MULTIPLY];
      else if (i <= 6) config.operators = [Operator.DIVIDE];
      else config.operators = [Operator.ADD, Operator.SUBTRACT, Operator.MULTIPLY, Operator.DIVIDE];
      
      config.numberRange = [5, 20 + (i * 5)];
      config.name = isEn ? `Master ${i}` : `Master ${i}`;
      config.description = isEn ? "Mixed Operations" : "Operasi Campuran";
      config.targetScore = 1000 + (i * 100);
    }

    levels.push(config as LevelConfig);
  }
  return levels;
};

const generateChoices = (correct: number, min: number, max: number): number[] => {
  const choices = new Set<number>([correct]);
  
  if (Math.random() > 0.5) choices.add(correct + 1);
  if (Math.random() > 0.5 && correct > 0) choices.add(correct - 1);

  while (choices.size < 4) {
    const offset = getRandomInt(-5, 5);
    const candidate = correct + offset;
    if (candidate >= 0 && candidate !== correct) { 
      choices.add(candidate);
    } else {
      choices.add(getRandomInt(0, max + 5));
    }
  }
  return Array.from(choices).sort(() => Math.random() - 0.5);
};

export const generateQuestion = (config: LevelConfig): Question => {
  const operator = config.operators[Math.floor(Math.random() * config.operators.length)];
  let num1 = getRandomInt(config.numberRange[0], config.numberRange[1]);
  let num2 = getRandomInt(config.numberRange[0], config.numberRange[1]);
  let correctAnswer = 0;
  let visualData = undefined;

  if (config.isVisual) {
    const icon = VISUAL_ICONS[Math.floor(Math.random() * VISUAL_ICONS.length)];
    const maxVisual = 10; 
    num1 = getRandomInt(1, Math.min(config.numberRange[1], maxVisual));
    num2 = getRandomInt(1, Math.min(config.numberRange[1], maxVisual));
    
    if (operator === Operator.ADD) {
      correctAnswer = num1 + num2;
    } else if (operator === Operator.SUBTRACT) {
      if (num1 < num2) [num1, num2] = [num2, num1];
      correctAnswer = num1 - num2;
    } else {
      correctAnswer = num1 + num2; 
    }
    
    visualData = {
      icon: icon,
      count1: num1,
      count2: num2
    };
  } else {
    switch (operator) {
      case Operator.ADD:
        correctAnswer = num1 + num2;
        break;
      case Operator.SUBTRACT:
        if (num1 < num2) [num1, num2] = [num2, num1];
        correctAnswer = num1 - num2;
        break;
      case Operator.MULTIPLY:
        num1 = getRandomInt(1, 10); 
        num2 = getRandomInt(1, 10);
        correctAnswer = num1 * num2;
        break;
      case Operator.DIVIDE:
        if (num2 === 0) num2 = 1;
        correctAnswer = num1; 
        num1 = num1 * num2;   
        break;
    }
  }

  const choices = generateChoices(correctAnswer, config.numberRange[0], Math.max(config.numberRange[1] * 2, correctAnswer + 10));

  return {
    id: Math.random().toString(36).substr(2, 9),
    num1,
    num2,
    operator,
    correctAnswer,
    choices,
    visual: visualData
  };
};
