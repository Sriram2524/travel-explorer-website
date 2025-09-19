import React, { useState, useEffect } from 'react';
import { Plane, Heart, Home, ArrowLeft } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { PhotoGallery } from './components/PhotoGallery';
import { PopularDestinations } from './components/PopularDestinations';
import { FavoritesList } from './components/FavoritesList';
import { ThemeToggle } from './components/ThemeToggle';
import { ErrorBoundary } from './components/ErrorBoundary';
import { usePhotos } from './hooks/usePhotos';
import { useWeather } from './hooks/useWeather';

type TabType = 'explore' | 'favorites';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('explore');

  const { photos, loading: photosLoading, error: photosError } = usePhotos(searchQuery);
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('explore');
    // Scroll to top when searching
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDestinationSelect = (destination: string) => {
    setSearchQuery(destination);
    setActiveTab('explore');
    // Scroll to top when selecting a destination
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSearchQuery('');
    setActiveTab('explore');
    // Scroll to top when going back to home
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Travel Explorer
                </h1>
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto space-x-4">
                <nav className="flex space-x-1 flex-1 sm:flex-initial">
                  <button
                    onClick={() => setActiveTab('explore')}
                    className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-colors text-sm sm:text-base ${
                      activeTab === 'explore'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    <Home className="w-4 h-4 inline mr-1 sm:mr-2" />
                    Explore
                  </button>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`px-3 sm:px-4 py-2 rounded-xl font-medium transition-colors text-sm sm:text-base ${
                      activeTab === 'favorites'
                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    <Heart className="w-4 h-4 inline mr-1 sm:mr-2" />
                    Favorites
                  </button>
                </nav>
                <div className="flex-shrink-0">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'explore' && (
            <>
              {/* Hero Section */}
              <div className={`text-center mb-12 ${searchQuery ? 'hidden' : ''}`}>
                <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Discover Your Next
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    {' '}Adventure
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Explore breathtaking destinations with stunning photography and real-time weather information to plan your perfect trip.
                </p>
                <SearchBar
                  onSearch={handleSearch}
                  isLoading={photosLoading || weatherLoading}
                />
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="mb-12">
                  {/* Back Button and Search Bar */}
                  <div className="flex items-center justify-between mb-8">
                    <button
                      onClick={handleBackToHome}
                      className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors duration-200 shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Back to Home</span>
                    </button>
                    <div className="flex-1 max-w-md ml-8">
                      <SearchBar
                        onSearch={handleSearch}
                        isLoading={photosLoading || weatherLoading}
                        placeholder="Search another destination..."
                      />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Exploring {searchQuery}
                  </h2>
                  
                  {/* Weather Section */}
                  <div className="mb-8">
                    {weatherLoading && (
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-48 animate-pulse" />
                    )}
                    {weatherError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
                        <p className="text-red-600 dark:text-red-400">{weatherError}</p>
                      </div>
                    )}
                    {weather && <WeatherCard weather={weather} />}
                  </div>

                  {/* Photos Section */}
                  <div>
                    {photosError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center mb-8">
                        <p className="text-red-600 dark:text-red-400">{photosError}</p>
                      </div>
                    )}
                    <PhotoGallery photos={photos} loading={photosLoading} />
                  </div>
                </div>
              )}

              {/* Popular Destinations */}
              {!searchQuery && (
                <PopularDestinations onDestinationSelect={handleDestinationSelect} />
              )}
            </>
          )}

          {activeTab === 'favorites' && (
            <FavoritesList onDestinationSelect={handleDestinationSelect} />
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Plane className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-gray-900 dark:text-white">Travel Explorer</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Discover the world with stunning visuals and real-time weather updates.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;