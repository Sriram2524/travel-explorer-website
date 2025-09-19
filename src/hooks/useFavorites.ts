import { useState, useEffect } from 'react';
import { Destination } from '../types';

const FAVORITES_KEY = 'travel-explorer-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Destination[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      }
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
    }
  }, []);

  const saveFavorites = (newFavorites: Destination[]) => {
    setFavorites(newFavorites);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.warn('Error saving favorites:', error);
    }
  };

  const addToFavorites = (destination: Omit<Destination, 'isFavorite'>) => {
    const newDestination: Destination = { ...destination, isFavorite: true };
    const updated = [...favorites.filter(fav => fav.id !== destination.id), newDestination];
    saveFavorites(updated);
  };

  const removeFromFavorites = (id: string) => {
    const updated = favorites.filter(fav => fav.id !== id);
    saveFavorites(updated);
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};