// Difficulty levels and country filtering

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

// Top 50 most recognizable flags for easy mode
const EASY_COUNTRIES = [
  'US', 'GB', 'FR', 'DE', 'IT', 'ES', 'CA', 'AU', 'JP', 'CN',
  'BR', 'MX', 'AR', 'IN', 'RU', 'KR', 'ZA', 'EG', 'NG', 'KE',
  'SA', 'AE', 'TR', 'GR', 'NL', 'BE', 'CH', 'SE', 'NO', 'DK',
  'FI', 'PL', 'CZ', 'AT', 'PT', 'IE', 'NZ', 'SG', 'MY', 'TH',
  'VN', 'PH', 'ID', 'PK', 'BD', 'CL', 'CO', 'PE', 'VE', 'CU'
];

// Countries with similar flags for expert mode (challenging pairs/groups)
const EXPERT_SIMILAR_FLAGS = [
  // Red-white horizontal stripes
  'AT', 'LV', 'PL', 'MC', 'ID', 'SG',
  // Nordic crosses
  'DK', 'NO', 'SE', 'FI', 'IS',
  // Tricolor variations
  'FR', 'NL', 'RU', 'IT', 'IE', 'BE', 'RO', 'TD', 'ML', 'GN',
  // Similar color schemes
  'AE', 'KW', 'JO', 'PS', 'SD',
  // Stars and stripes variations
  'US', 'LR', 'MY',
  // Pan-Slavic colors
  'SK', 'SI', 'HR',
  // Others that are frequently confused
  'AU', 'NZ', 'LU', 'NL', 'CI', 'GH', 'CM', 'SN'
];

export const getDifficulty = (): DifficultyLevel => {
  try {
    const stored = localStorage.getItem('flag-game-difficulty');
    if (stored) {
      return stored as DifficultyLevel;
    }
  } catch (error) {
    console.error('Error loading difficulty:', error);
  }
  return 'medium'; // Default to medium
};

export const saveDifficulty = (difficulty: DifficultyLevel): void => {
  try {
    localStorage.setItem('flag-game-difficulty', difficulty);
  } catch (error) {
    console.error('Error saving difficulty:', error);
  }
};

export const filterCountriesByDifficulty = (
  allCountries: string[],
  difficulty: DifficultyLevel
): string[] => {
  switch (difficulty) {
    case 'easy':
      return allCountries.filter(code => EASY_COUNTRIES.includes(code));

    case 'medium':
      // All sovereign nations (default behavior - all countries)
      return allCountries;

    case 'hard':
      // Exclude the easiest 50 to make it more challenging
      return allCountries.filter(code => !EASY_COUNTRIES.includes(code));

    case 'expert':
      // Only countries with similar-looking flags
      return allCountries.filter(code => EXPERT_SIMILAR_FLAGS.includes(code));

    default:
      return allCountries;
  }
};

export const getDifficultyColor = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'easy':
      return '#52c41a'; // Green
    case 'medium':
      return '#1890ff'; // Blue
    case 'hard':
      return '#fa8c16'; // Orange
    case 'expert':
      return '#f5222d'; // Red
    default:
      return '#1890ff';
  }
};

export const getDifficultyLabel = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'easy':
      return 'Easy (50 common flags)';
    case 'medium':
      return 'Medium (All countries)';
    case 'hard':
      return 'Hard (Challenging flags)';
    case 'expert':
      return 'Expert (Similar flags)';
    default:
      return 'Medium';
  }
};
