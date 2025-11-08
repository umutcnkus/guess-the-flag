// LocalStorage utility functions

export interface GameStats {
  success: number;
  fails: number;
  currentStreak: number;
  bestStreak: number;
  gamesPlayed: number;
  totalTime: number;
}

const STORAGE_KEY = 'flag-game-stats';

export const saveStats = (stats: GameStats): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats to localStorage:', error);
  }
};

export const loadStats = (): GameStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading stats from localStorage:', error);
  }

  // Return default stats
  return {
    success: 0,
    fails: 0,
    currentStreak: 0,
    bestStreak: 0,
    gamesPlayed: 0,
    totalTime: 0,
  };
};

export const resetStats = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting stats:', error);
  }
};
