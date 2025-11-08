// Achievement system

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  currentProgress?: number;
  unlocked?: boolean;
  unlockedAt?: number;
  category: 'streak' | 'accuracy' | 'speed' | 'mastery' | 'special';
}

export const ACHIEVEMENTS: Achievement[] = [
  // Streak achievements
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Get your first correct answer',
    icon: '🎯',
    requirement: 1,
    category: 'streak',
  },
  {
    id: 'perfect-3',
    title: 'Getting Warmed Up',
    description: 'Get 3 correct answers in a row',
    icon: '🔥',
    requirement: 3,
    category: 'streak',
  },
  {
    id: 'perfect-5',
    title: 'On Fire',
    description: 'Get 5 correct answers in a row',
    icon: '🔥',
    requirement: 5,
    category: 'streak',
  },
  {
    id: 'perfect-10',
    title: 'Unstoppable',
    description: 'Get 10 correct answers in a row',
    icon: '⚡',
    requirement: 10,
    category: 'streak',
  },
  {
    id: 'perfect-25',
    title: 'Legendary',
    description: 'Get 25 correct answers in a row',
    icon: '👑',
    requirement: 25,
    category: 'streak',
  },
  {
    id: 'perfect-50',
    title: 'God Mode',
    description: 'Get 50 correct answers in a row',
    icon: '🌟',
    requirement: 50,
    category: 'streak',
  },

  // Mastery achievements
  {
    id: 'beginner',
    title: 'Flag Enthusiast',
    description: 'Identify 10 flags correctly',
    icon: '🎓',
    requirement: 10,
    category: 'mastery',
  },
  {
    id: 'intermediate',
    title: 'Flag Expert',
    description: 'Identify 50 flags correctly',
    icon: '📚',
    requirement: 50,
    category: 'mastery',
  },
  {
    id: 'advanced',
    title: 'Geography Pro',
    description: 'Identify 100 flags correctly',
    icon: '🌍',
    requirement: 100,
    category: 'mastery',
  },
  {
    id: 'master',
    title: 'World Explorer',
    description: 'Identify 250 flags correctly',
    icon: '✈️',
    requirement: 250,
    category: 'mastery',
  },
  {
    id: 'grandmaster',
    title: 'Flag Master',
    description: 'Identify 500 flags correctly',
    icon: '🏆',
    requirement: 500,
    category: 'mastery',
  },
  {
    id: 'legend',
    title: 'Ultimate Champion',
    description: 'Identify 1000 flags correctly',
    icon: '💎',
    requirement: 1000,
    category: 'mastery',
  },

  // Accuracy achievements
  {
    id: 'sharpshooter',
    title: 'Sharpshooter',
    description: 'Maintain 90% accuracy over 50 questions',
    icon: '🎯',
    requirement: 90,
    category: 'accuracy',
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Maintain 95% accuracy over 100 questions',
    icon: '💯',
    requirement: 95,
    category: 'accuracy',
  },

  // Speed achievements
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete 10 questions in speed mode',
    icon: '⚡',
    requirement: 10,
    category: 'speed',
  },
  {
    id: 'lightning-fast',
    title: 'Lightning Fast',
    description: 'Complete 50 questions in speed mode',
    icon: '⚡',
    requirement: 50,
    category: 'speed',
  },

  // Special achievements
  {
    id: 'night-owl',
    title: 'Night Owl',
    description: 'Play in dark mode',
    icon: '🦉',
    requirement: 1,
    category: 'special',
  },
  {
    id: 'challenge-seeker',
    title: 'Challenge Seeker',
    description: 'Complete a game in Expert difficulty',
    icon: '🎖️',
    requirement: 1,
    category: 'special',
  },
];

const ACHIEVEMENTS_KEY = 'flag-game-achievements';

export interface AchievementProgress {
  [achievementId: string]: {
    unlocked: boolean;
    unlockedAt?: number;
    currentProgress: number;
  };
}

export const loadAchievements = (): AchievementProgress => {
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading achievements:', error);
  }
  return {};
};

export const saveAchievements = (progress: AchievementProgress): void => {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving achievements:', error);
  }
};

export const checkAchievement = (
  achievementId: string,
  currentValue: number,
  progress: AchievementProgress
): Achievement | null => {
  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!achievement) return null;

  const achievementProgress = progress[achievementId];
  if (achievementProgress?.unlocked) return null; // Already unlocked

  if (currentValue >= achievement.requirement) {
    return achievement;
  }

  return null;
};

export const unlockAchievement = (
  achievementId: string,
  progress: AchievementProgress
): AchievementProgress => {
  return {
    ...progress,
    [achievementId]: {
      unlocked: true,
      unlockedAt: Date.now(),
      currentProgress: progress[achievementId]?.currentProgress || 0,
    },
  };
};

export const getUnlockedAchievements = (progress: AchievementProgress): Achievement[] => {
  return ACHIEVEMENTS.filter(a => progress[a.id]?.unlocked);
};

export const getAchievementProgress = (
  achievementId: string,
  progress: AchievementProgress
): number => {
  return progress[achievementId]?.currentProgress || 0;
};
