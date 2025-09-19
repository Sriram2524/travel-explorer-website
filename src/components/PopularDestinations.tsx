import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface PopularDestination {
  id: string;
  name: string;
  country: string;
  description: string;
  rating: number;
  image: string;
}

const popularDestinations: PopularDestination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light with iconic landmarks and romantic atmosphere',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&q=80',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Modern metropolis blending tradition with cutting-edge technology',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches and rich culture',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps with endless possibilities',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    description: 'Breathtaking sunsets and white-washed architecture',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    description: 'Luxury destination with futuristic skyline and desert adventures',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  },
];

interface PopularDestinationsProps {
  onDestinationSelect: (destination: string) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  onDestinationSelect,
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleFavoriteToggle = (destination: PopularDestination) => {
    if (isFavorite(destination.id)) {
      removeFromFavorites(destination.id);
    } else {
      addToFavorites({
        id: destination.id,
        name: destination.name,
        country: destination.country,
        description: destination.description,
      });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Popular Destinations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularDestinations.map((destination) => (
          <div
            key={destination.id}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => onDestinationSelect(destination.name)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(destination);
                  }}
                  className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(destination.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-sm font-medium">
                    {destination.rating}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {destination.country}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {destination.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {destination.description}
              </p>
              <button
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onDestinationSelect(destination.name);
                }}
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};