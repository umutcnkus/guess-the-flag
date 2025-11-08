// LocalStorage utility functions

export interface GameStats {
  success: number;
  fails: number;
  currentStreak: number;
  bestStreak: number;
  gamesPlayed: number;
  totalTime: number;
  totalScore: number;
  bestTime: number;
  averageTime: number;
}

const STORAGE_KEY = 'flag-game-stats';
const THEME_KEY = 'flag-game-theme';

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
    totalScore: 0,
    bestTime: 999999,
    averageTime: 0,
  };
};

export const resetStats = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting stats:', error);
  }
};

// Theme management
export const saveTheme = (isDark: boolean): void => {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const loadTheme = (): boolean => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
  return false; // Default to light mode
};
