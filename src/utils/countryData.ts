// Country information from REST Countries API

export interface CountryInfo {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: string;
  area: string;
  languages: string;
  currencies: string;
}

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

// Fallback country info when API is unavailable
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
  };
};

// Fetch country data from REST Countries API
// API: https://restcountries.com/v3.1/alpha/{code}
export const fetchCountryInfo = async (countryCode: string): Promise<CountryInfo | null> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);

    if (!response.ok) {
      throw new Error('Country not found');
    }

    const data = await response.json();
    const country = data[0];

    // Extract languages
    const languages = country.languages
      ? Object.values(country.languages).join(', ')
      : 'N/A';

    // Extract currencies
    const currencies = country.currencies
      ? Object.values(country.currencies).map((c: any) => `${c.name} (${c.symbol})`).join(', ')
      : 'N/A';

    // Format population
    const population = country.population
      ? country.population >= 1000000
        ? `${(country.population / 1000000).toFixed(1)} million`
        : country.population >= 1000
        ? `${(country.population / 1000).toFixed(0)} thousand`
        : country.population.toLocaleString()
      : 'N/A';

    // Format area
    const area = country.area
      ? country.area >= 1000000
        ? `${(country.area / 1000000).toFixed(2)} million km²`
        : `${country.area.toLocaleString()} km²`
      : 'N/A';

    return {
      name: country.name.common,
      capital: country.capital?.[0] || 'N/A',
      region: country.region || 'Unknown',
      subregion: country.subregion || 'Unknown',
      population,
      area,
      languages,
      currencies,
    };
  } catch (error) {
    console.error(`Error fetching country info for ${countryCode}:`, error);
    return null;
  }
};
