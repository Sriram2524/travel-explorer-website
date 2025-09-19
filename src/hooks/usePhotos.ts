import { useState, useEffect } from 'react';
import { Photo, ApiError } from '../types';
import { apiConfig, handleApiError } from '../utils/api';
import { getPhotosForDestination } from '../data/mockData';

export const usePhotos = (query: string) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Use mock data if no API key is available
    if (!apiConfig.unsplash.accessKey) {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      setTimeout(() => {
        setPhotos(getPhotosForDestination(searchQuery, 9));
        setLoading(false);
      }, 600);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiConfig.unsplash.baseURL}/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=12&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${apiConfig.unsplash.accessKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPhotos(data.results || []);
    } catch (err: any) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      const debounceTimer = setTimeout(() => {
        fetchPhotos(query);
      }, 500);

      return () => clearTimeout(debounceTimer);
    } else {
      setPhotos([]);
    }
  }, [query]);

  return { photos, loading, error, refetch: () => fetchPhotos(query) };
};