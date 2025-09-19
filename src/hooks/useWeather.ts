import { useState, useEffect } from 'react';
import { WeatherData, ApiError } from '../types';
import { apiConfig, handleApiError } from '../utils/api';
import { getMockWeatherForCity } from '../data/mockData';

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;

    // Use mock data if no API key is available
    if (!apiConfig.weather.apiKey) {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      setTimeout(() => {
        const mockWeather = getMockWeatherForCity(cityName);
        setWeather(mockWeather);
        setLoading(false);
      }, 600);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiConfig.weather.baseURL}/weather?q=${encodeURIComponent(cityName)}&appid=${apiConfig.weather.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(handleApiError(err));
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      const debounceTimer = setTimeout(() => {
        fetchWeather(city);
      }, 500);

      return () => clearTimeout(debounceTimer);
    } else {
      setWeather(null);
    }
  }, [city]);

  return { weather, loading, error, refetch: () => fetchWeather(city) };
};