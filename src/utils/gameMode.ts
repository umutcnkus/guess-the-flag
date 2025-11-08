// Game mode utilities

export type GameMode = 'classic' | 'timed' | 'speed';

export interface GameModeConfig {
  name: GameMode;
  label: string;
  description: string;
  timeLimit?: number; // in seconds, undefined for classic
  speedBonus?: boolean; // award bonus points for quick answers
}

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  classic: {
    name: 'classic',
    label: 'Classic',
    description: 'No time limit, play at your own pace',
    timeLimit: undefined,
    speedBonus: false,
  },
  timed: {
    name: 'timed',
    label: 'Timed',
    description: '15 seconds per question',
    timeLimit: 15,
    speedBonus: true,
  },
  speed: {
    name: 'speed',
    label: 'Speed',
    description: '5 seconds per question - fast pace!',
    timeLimit: 5,
    speedBonus: true,
  },
};

const GAME_MODE_KEY = 'flag-game-mode';

export const getGameMode = (): GameMode => {
  try {
    const stored = localStorage.getItem(GAME_MODE_KEY);
    if (stored && (stored === 'classic' || stored === 'timed' || stored === 'speed')) {
      return stored as GameMode;
    }
  } catch (error) {
    console.error('Error loading game mode:', error);
  }
  return 'classic'; // Default to classic
};

export const saveGameMode = (mode: GameMode): void => {
  try {
    localStorage.setItem(GAME_MODE_KEY, mode);
  } catch (error) {
    console.error('Error saving game mode:', error);
  }
};

export const calculateTimeBonus = (timeRemaining: number, maxTime: number): number => {
  if (timeRemaining <= 0) return 0;
  // Award up to 100 bonus points based on how quickly answered
  return Math.floor((timeRemaining / maxTime) * 100);
};
