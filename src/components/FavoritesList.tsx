import React from 'react';
import { Heart, MapPin, Trash2 } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoritesListProps {
  onDestinationSelect: (destination: string) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  onDestinationSelect,
}) => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No favorites yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Start exploring and save your favorite destinations!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Heart className="w-6 h-6 mr-2 text-red-500" />
        Your Favorites ({favorites.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {favorite.name}
                </h3>
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{favorite.country}</span>
                </div>
              </div>
              <button
                onClick={() => removeFromFavorites(favorite.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove from favorites"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {favorite.description}
            </p>
            <button
              onClick={() => onDestinationSelect(favorite.name)}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};