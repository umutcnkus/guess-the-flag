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
  US: { name: 'United States', capital: 'Washington, D.C.', region: 'Americas', subregion: 'North America', population: '331 million', area: '9.8 million km²', languages: 'English', currencies: 'US Dollar (USD)', funFact: 'The US has no official language at the federal level' },
  GB: { name: 'United Kingdom', capital: 'London', region: 'Europe', subregion: 'Northern Europe', population: '67 million', area: '242,495 km²', languages: 'English', currencies: 'Pound Sterling (GBP)', funFact: 'The UK is made up of England, Scotland, Wales, and Northern Ireland' },
  FR: { name: 'France', capital: 'Paris', region: 'Europe', subregion: 'Western Europe', population: '67 million', area: '643,801 km²', languages: 'French', currencies: 'Euro (EUR)', funFact: 'France is the most visited country in the world' },
  DE: { name: 'Germany', capital: 'Berlin', region: 'Europe', subregion: 'Western Europe', population: '83 million', area: '357,022 km²', languages: 'German', currencies: 'Euro (EUR)', funFact: 'Germany has over 1,500 types of beer' },
  JP: { name: 'Japan', capital: 'Tokyo', region: 'Asia', subregion: 'Eastern Asia', population: '126 million', area: '377,975 km²', languages: 'Japanese', currencies: 'Yen (JPY)', funFact: 'Japan consists of over 6,800 islands' },
  CN: { name: 'China', capital: 'Beijing', region: 'Asia', subregion: 'Eastern Asia', population: '1.4 billion', area: '9.6 million km²', languages: 'Mandarin', currencies: 'Yuan (CNY)', funFact: 'Home to the Great Wall of China' },
  BR: { name: 'Brazil', capital: 'Brasília', region: 'Americas', subregion: 'South America', population: '213 million', area: '8.5 million km²', languages: 'Portuguese', currencies: 'Real (BRL)', funFact: 'Home to the Amazon rainforest' },
  IN: { name: 'India', capital: 'New Delhi', region: 'Asia', subregion: 'Southern Asia', population: '1.4 billion', area: '3.3 million km²', languages: 'Hindi, English', currencies: 'Rupee (INR)', funFact: 'India has 22 official languages' },
  CA: { name: 'Canada', capital: 'Ottawa', region: 'Americas', subregion: 'North America', population: '38 million', area: '9.98 million km²', languages: 'English, French', currencies: 'Canadian Dollar (CAD)', funFact: 'Has the world\'s longest coastline' },
  AU: { name: 'Australia', capital: 'Canberra', region: 'Oceania', subregion: 'Australia and New Zealand', population: '26 million', area: '7.7 million km²', languages: 'English', currencies: 'Australian Dollar (AUD)', funFact: 'Home to unique wildlife like kangaroos' },
  RU: { name: 'Russia', capital: 'Moscow', region: 'Europe', subregion: 'Eastern Europe', population: '144 million', area: '17.1 million km²', languages: 'Russian', currencies: 'Ruble (RUB)', funFact: 'Largest country in the world by area' },
  IT: { name: 'Italy', capital: 'Rome', region: 'Europe', subregion: 'Southern Europe', population: '60 million', area: '301,340 km²', languages: 'Italian', currencies: 'Euro (EUR)', funFact: 'Has more UNESCO World Heritage Sites than any other country' },
  ES: { name: 'Spain', capital: 'Madrid', region: 'Europe', subregion: 'Southern Europe', population: '47 million', area: '505,990 km²', languages: 'Spanish', currencies: 'Euro (EUR)', funFact: 'Spanish is spoken by over 500 million people worldwide' },
  MX: { name: 'Mexico', capital: 'Mexico City', region: 'Americas', subregion: 'Central America', population: '129 million', area: '1.96 million km²', languages: 'Spanish', currencies: 'Peso (MXN)', funFact: 'Chocolate, chili peppers, and corn originated here' },
  AR: { name: 'Argentina', capital: 'Buenos Aires', region: 'Americas', subregion: 'South America', population: '45 million', area: '2.78 million km²', languages: 'Spanish', currencies: 'Peso (ARS)', funFact: 'Birthplace of tango dance' },
  ZA: { name: 'South Africa', capital: 'Pretoria', region: 'Africa', subregion: 'Southern Africa', population: '60 million', area: '1.22 million km²', languages: 'Zulu, Xhosa, Afrikaans, English', currencies: 'Rand (ZAR)', funFact: 'Has three capital cities' },
  EG: { name: 'Egypt', capital: 'Cairo', region: 'Africa', subregion: 'Northern Africa', population: '102 million', area: '1 million km²', languages: 'Arabic', currencies: 'Pound (EGP)', funFact: 'Home to the ancient pyramids' },
  NG: { name: 'Nigeria', capital: 'Abuja', region: 'Africa', subregion: 'Western Africa', population: '206 million', area: '923,768 km²', languages: 'English', currencies: 'Naira (NGN)', funFact: 'Most populous country in Africa' },
  KE: { name: 'Kenya', capital: 'Nairobi', region: 'Africa', subregion: 'Eastern Africa', population: '54 million', area: '580,367 km²', languages: 'Swahili, English', currencies: 'Shilling (KES)', funFact: 'Famous for safari wildlife' },
  SA: { name: 'Saudi Arabia', capital: 'Riyadh', region: 'Asia', subregion: 'Western Asia', population: '35 million', area: '2.15 million km²', languages: 'Arabic', currencies: 'Riyal (SAR)', funFact: 'Largest oil exporter in the world' },
  AE: { name: 'United Arab Emirates', capital: 'Abu Dhabi', region: 'Asia', subregion: 'Western Asia', population: '10 million', area: '83,600 km²', languages: 'Arabic', currencies: 'Dirham (AED)', funFact: 'Home to the world\'s tallest building' },
  TR: { name: 'Turkey', capital: 'Ankara', region: 'Asia', subregion: 'Western Asia', population: '84 million', area: '783,562 km²', languages: 'Turkish', currencies: 'Lira (TRY)', funFact: 'Straddles two continents' },
  GR: { name: 'Greece', capital: 'Athens', region: 'Europe', subregion: 'Southern Europe', population: '11 million', area: '131,957 km²', languages: 'Greek', currencies: 'Euro (EUR)', funFact: 'Birthplace of democracy' },
  NL: { name: 'Netherlands', capital: 'Amsterdam', region: 'Europe', subregion: 'Western Europe', population: '17 million', area: '41,543 km²', languages: 'Dutch', currencies: 'Euro (EUR)', funFact: 'Over 25% of land is below sea level' },
  BE: { name: 'Belgium', capital: 'Brussels', region: 'Europe', subregion: 'Western Europe', population: '11 million', area: '30,528 km²', languages: 'Dutch, French, German', currencies: 'Euro (EUR)', funFact: 'Produces over 220,000 tons of chocolate per year' },
  CH: { name: 'Switzerland', capital: 'Bern', region: 'Europe', subregion: 'Western Europe', population: '9 million', area: '41,285 km²', languages: 'German, French, Italian', currencies: 'Franc (CHF)', funFact: 'Has four official languages' },
  SE: { name: 'Sweden', capital: 'Stockholm', region: 'Europe', subregion: 'Northern Europe', population: '10 million', area: '450,295 km²', languages: 'Swedish', currencies: 'Krona (SEK)', funFact: 'Home to IKEA and Nobel Prize' },
  NO: { name: 'Norway', capital: 'Oslo', region: 'Europe', subregion: 'Northern Europe', population: '5 million', area: '323,802 km²', languages: 'Norwegian', currencies: 'Krone (NOK)', funFact: 'Land of the midnight sun' },
  DK: { name: 'Denmark', capital: 'Copenhagen', region: 'Europe', subregion: 'Northern Europe', population: '6 million', area: '42,933 km²', languages: 'Danish', currencies: 'Krone (DKK)', funFact: 'Happiest country in the world' },
  FI: { name: 'Finland', capital: 'Helsinki', region: 'Europe', subregion: 'Northern Europe', population: '6 million', area: '338,455 km²', languages: 'Finnish, Swedish', currencies: 'Euro (EUR)', funFact: 'Has the most saunas per capita' },
  PL: { name: 'Poland', capital: 'Warsaw', region: 'Europe', subregion: 'Eastern Europe', population: '38 million', area: '312,696 km²', languages: 'Polish', currencies: 'Złoty (PLN)', funFact: 'Birthplace of Marie Curie and Copernicus' },
  CZ: { name: 'Czech Republic', capital: 'Prague', region: 'Europe', subregion: 'Eastern Europe', population: '11 million', area: '78,871 km²', languages: 'Czech', currencies: 'Koruna (CZK)', funFact: 'Drinks more beer per capita than any other nation' },
  AT: { name: 'Austria', capital: 'Vienna', region: 'Europe', subregion: 'Western Europe', population: '9 million', area: '83,871 km²', languages: 'German', currencies: 'Euro (EUR)', funFact: 'Home to Mozart and Beethoven' },
  PT: { name: 'Portugal', capital: 'Lisbon', region: 'Europe', subregion: 'Southern Europe', population: '10 million', area: '92,212 km²', languages: 'Portuguese', currencies: 'Euro (EUR)', funFact: 'One of the oldest nations in Europe' },
  IE: { name: 'Ireland', capital: 'Dublin', region: 'Europe', subregion: 'Northern Europe', population: '5 million', area: '70,273 km²', languages: 'Irish, English', currencies: 'Euro (EUR)', funFact: 'Shamrocks and leprechauns originated here' },
  NZ: { name: 'New Zealand', capital: 'Wellington', region: 'Oceania', subregion: 'Australia and New Zealand', population: '5 million', area: '268,021 km²', languages: 'English, Maori', currencies: 'New Zealand Dollar (NZD)', funFact: 'Filmed location for Lord of the Rings' },
  SG: { name: 'Singapore', capital: 'Singapore', region: 'Asia', subregion: 'South-Eastern Asia', population: '6 million', area: '728 km²', languages: 'English, Malay, Chinese, Tamil', currencies: 'Dollar (SGD)', funFact: 'One of the cleanest cities in the world' },
  MY: { name: 'Malaysia', capital: 'Kuala Lumpur', region: 'Asia', subregion: 'South-Eastern Asia', population: '32 million', area: '330,803 km²', languages: 'Malay', currencies: 'Ringgit (MYR)', funFact: 'Home to the Petronas Twin Towers' },
  TH: { name: 'Thailand', capital: 'Bangkok', region: 'Asia', subregion: 'South-Eastern Asia', population: '70 million', area: '513,120 km²', languages: 'Thai', currencies: 'Baht (THB)', funFact: 'Only SE Asian country never colonized' },
  VN: { name: 'Vietnam', capital: 'Hanoi', region: 'Asia', subregion: 'South-Eastern Asia', population: '97 million', area: '331,212 km²', languages: 'Vietnamese', currencies: 'Dong (VND)', funFact: 'World\'s largest producer of cashews' },
  PH: { name: 'Philippines', capital: 'Manila', region: 'Asia', subregion: 'South-Eastern Asia', population: '110 million', area: '300,000 km²', languages: 'Filipino, English', currencies: 'Peso (PHP)', funFact: 'Made up of over 7,600 islands' },
  ID: { name: 'Indonesia', capital: 'Jakarta', region: 'Asia', subregion: 'South-Eastern Asia', population: '274 million', area: '1.9 million km²', languages: 'Indonesian', currencies: 'Rupiah (IDR)', funFact: 'Largest archipelago with 17,000 islands' },
  PK: { name: 'Pakistan', capital: 'Islamabad', region: 'Asia', subregion: 'Southern Asia', population: '221 million', area: '881,913 km²', languages: 'Urdu, English', currencies: 'Rupee (PKR)', funFact: 'Home to K2, world\'s second highest peak' },
  BD: { name: 'Bangladesh', capital: 'Dhaka', region: 'Asia', subregion: 'Southern Asia', population: '165 million', area: '148,460 km²', languages: 'Bengali', currencies: 'Taka (BDT)', funFact: 'Most densely populated large country' },
  CL: { name: 'Chile', capital: 'Santiago', region: 'Americas', subregion: 'South America', population: '19 million', area: '756,102 km²', languages: 'Spanish', currencies: 'Peso (CLP)', funFact: 'Longest north-south country in the world' },
  CO: { name: 'Colombia', capital: 'Bogotá', region: 'Americas', subregion: 'South America', population: '51 million', area: '1.14 million km²', languages: 'Spanish', currencies: 'Peso (COP)', funFact: 'World leader in biodiversity' },
  PE: { name: 'Peru', capital: 'Lima', region: 'Americas', subregion: 'South America', population: '33 million', area: '1.29 million km²', languages: 'Spanish', currencies: 'Sol (PEN)', funFact: 'Home to Machu Picchu' },
  VE: { name: 'Venezuela', capital: 'Caracas', region: 'Americas', subregion: 'South America', population: '28 million', area: '916,445 km²', languages: 'Spanish', currencies: 'Bolívar (VES)', funFact: 'Has the world\'s highest waterfall' },
  CU: { name: 'Cuba', capital: 'Havana', region: 'Americas', subregion: 'Caribbean', population: '11 million', area: '109,884 km²', languages: 'Spanish', currencies: 'Peso (CUP)', funFact: 'Largest island in the Caribbean' },
  KR: { name: 'South Korea', capital: 'Seoul', region: 'Asia', subregion: 'Eastern Asia', population: '52 million', area: '100,210 km²', languages: 'Korean', currencies: 'Won (KRW)', funFact: 'K-pop and Korean BBQ originated here' },
  IL: { name: 'Israel', capital: 'Jerusalem', region: 'Asia', subregion: 'Western Asia', population: '9 million', area: '22,145 km²', languages: 'Hebrew, Arabic', currencies: 'Shekel (ILS)', funFact: 'Most museums per capita in the world' },
  UA: { name: 'Ukraine', capital: 'Kyiv', region: 'Europe', subregion: 'Eastern Europe', population: '44 million', area: '603,500 km²', languages: 'Ukrainian', currencies: 'Hryvnia (UAH)', funFact: 'Largest country entirely in Europe' },
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
