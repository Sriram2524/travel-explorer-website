import React from 'react';
import { Cloud, Droplets, Wind, Eye, Thermometer } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTemp = (temp: number) => Math.round(temp);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{weather.name}</h3>
          <p className="text-blue-100">{weather.sys.country}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{formatTemp(weather.main.temp)}°C</div>
          <div className="text-blue-100">Feels like {formatTemp(weather.main.feels_like)}°</div>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <img
          src={getWeatherIcon(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="w-16 h-16 mr-4"
        />
        <div>
          <div className="text-lg font-semibold capitalize">
            {weather.weather[0].description}
          </div>
          <div className="text-blue-100">{weather.weather[0].main}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-blue-200" />
          <span className="text-sm">Humidity: {weather.main.humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="w-4 h-4 text-blue-200" />
          <span className="text-sm">Wind: {weather.wind.speed} m/s</span>
        </div>
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-blue-200" />
          <span className="text-sm">Pressure: {weather.main.pressure} hPa</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-blue-200" />
          <span className="text-sm">Visibility: {Math.round(weather.visibility / 1000)} km</span>
        </div>
      </div>
    </div>
  );
};