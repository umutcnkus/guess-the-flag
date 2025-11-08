// Country information database
// This is a simplified dataset. In a production app, you'd use the REST Countries API

export interface CountryInfo {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: string;
  area: string;
  languages: string;
  currencies: string;
  funFact: string;
}

// Sample country data for major countries
export const COUNTRY_DATA: Record<string, CountryInfo> = {
  US: {
    name: 'United States',
    capital: 'Washington, D.C.',
    region: 'Americas',
    subregion: 'North America',
    population: '331 million',
    area: '9.8 million km²',
    languages: 'English',
    currencies: 'United States Dollar (USD)',
    funFact: 'The US has no official language at the federal level',
  },
  GB: {
    name: 'United Kingdom',
    capital: 'London',
    region: 'Europe',
    subregion: 'Northern Europe',
    population: '67 million',
    area: '242,495 km²',
    languages: 'English',
    currencies: 'British Pound (GBP)',
    funFact: 'The UK is made up of four countries: England, Scotland, Wales, and Northern Ireland',
  },
  FR: {
    name: 'France',
    capital: 'Paris',
    region: 'Europe',
    subregion: 'Western Europe',
    population: '67 million',
    area: '643,801 km²',
    languages: 'French',
    currencies: 'Euro (EUR)',
    funFact: 'France is the most visited country in the world with over 89 million tourists annually',
  },
  DE: {
    name: 'Germany',
    capital: 'Berlin',
    region: 'Europe',
    subregion: 'Western Europe',
    population: '83 million',
    area: '357,022 km²',
    languages: 'German',
    currencies: 'Euro (EUR)',
    funFact: 'Germany has over 1,500 different types of beer and 1,000 types of sausages',
  },
  JP: {
    name: 'Japan',
    capital: 'Tokyo',
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: '126 million',
    area: '377,975 km²',
    languages: 'Japanese',
    currencies: 'Japanese Yen (JPY)',
    funFact: 'Japan consists of over 6,800 islands',
  },
  CN: {
    name: 'China',
    capital: 'Beijing',
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: '1.4 billion',
    area: '9.6 million km²',
    languages: 'Mandarin Chinese',
    currencies: 'Chinese Yuan (CNY)',
    funFact: 'China is home to the world\'s longest wall, the Great Wall of China',
  },
  BR: {
    name: 'Brazil',
    capital: 'Brasília',
    region: 'Americas',
    subregion: 'South America',
    population: '213 million',
    area: '8.5 million km²',
    languages: 'Portuguese',
    currencies: 'Brazilian Real (BRL)',
    funFact: 'Brazil is home to the Amazon rainforest, which produces 20% of the world\'s oxygen',
  },
  IN: {
    name: 'India',
    capital: 'New Delhi',
    region: 'Asia',
    subregion: 'Southern Asia',
    population: '1.4 billion',
    area: '3.3 million km²',
    languages: 'Hindi, English',
    currencies: 'Indian Rupee (INR)',
    funFact: 'India has 22 official languages recognized by its constitution',
  },
  CA: {
    name: 'Canada',
    capital: 'Ottawa',
    region: 'Americas',
    subregion: 'North America',
    population: '38 million',
    area: '9.98 million km²',
    languages: 'English, French',
    currencies: 'Canadian Dollar (CAD)',
    funFact: 'Canada has the longest coastline in the world at 202,080 km',
  },
  AU: {
    name: 'Australia',
    capital: 'Canberra',
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    population: '26 million',
    area: '7.7 million km²',
    languages: 'English',
    currencies: 'Australian Dollar (AUD)',
    funFact: 'Australia is home to 21 of the world\'s 25 most venomous snakes',
  },
};

const LEARN_MODE_KEY = 'flag-game-learn-mode';

export const getLearnMode = (): boolean => {
  try {
    const stored = localStorage.getItem(LEARN_MODE_KEY);
    if (stored !== null) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading learn mode:', error);
  }
  return false; // Default to off
};

export const saveLearnMode = (enabled: boolean): void => {
  try {
    localStorage.setItem(LEARN_MODE_KEY, JSON.stringify(enabled));
  } catch (error) {
    console.error('Error saving learn mode:', error);
  }
};

export const getCountryInfo = (countryCode: string): CountryInfo | null => {
  return COUNTRY_DATA[countryCode] || null;
};

// Fallback country info for countries not in our database
export const getFallbackCountryInfo = (countryName: string, countryCode: string): CountryInfo => {
  return {
    name: countryName,
    capital: 'Information not available',
    region: 'Unknown',
    subregion: 'Unknown',
    population: 'N/A',
    area: 'N/A',
    languages: 'N/A',
    currencies: 'N/A',
    funFact: `The flag code for ${countryName} is ${countryCode}`,
  };
};
