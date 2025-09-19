const UNSPLASH_BASE_URL = 'https://api.unsplash.com';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const apiConfig = {
  unsplash: {
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    baseURL: UNSPLASH_BASE_URL,
  },
  weather: {
    apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY,
    baseURL: WEATHER_BASE_URL,
  },
};

export const checkApiKeys = () => {
  const missingKeys = [];
  
  if (!apiConfig.unsplash.accessKey) {
    missingKeys.push('VITE_UNSPLASH_ACCESS_KEY');
  }
  
  if (!apiConfig.weather.apiKey) {
    missingKeys.push('VITE_OPENWEATHER_API_KEY');
  }
  
  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
};

export const handleApiError = (error: any): string => {
  if (error?.response?.status === 401) {
    return 'Invalid API key. Please check your configuration.';
  }
  if (error?.response?.status === 403) {
    return 'API quota exceeded. Please try again later.';
  }
  if (error?.response?.status === 404) {
    return 'No results found for your search.';
  }
  if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
    return 'Network error. Please check your internet connection.';
  }
  return error?.message || 'An unexpected error occurred.';
};