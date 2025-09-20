import React, { useState } from 'react';
import { Photo } from '../types';
import { User, Heart, Download, ExternalLink, X } from 'lucide-react';

interface PhotoGalleryProps {
  photos: Photo[];
  loading?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, loading }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <User className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No photos found. Try searching for a destination!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.urls.small}
              alt={photo.alt_description || 'Travel destination'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{photo.user.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.urls.regular}
              alt={selectedPhoto.alt_description || 'Travel destination'}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedPhoto.user.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    @{selectedPhoto.user.username}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(selectedPhoto.urls.full, '_blank')}
                    className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    title="View full size"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};