import { useState, useEffect } from 'react';

/**
 * Custom hook to preload images
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {object} - { isLoading, progress }
 */
export const useImagePreloader = (imageUrls) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve(url);
        };
        img.onerror = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          console.warn(`Failed to preload image: ${url}`);
          resolve(url); // Resolve anyway to not block other images
        };
      });
    };

    Promise.all(imageUrls.map(loadImage))
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      });
  }, [imageUrls]);

  return { isLoading, progress };
};

/**
 * Preload a single image
 * @param {string} url - Image URL to preload
 */
export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
};

/**
 * Preload multiple images
 * @param {string[]} urls - Array of image URLs to preload
 */
export const preloadImages = (urls) => {
  return Promise.all(urls.map(preloadImage));
};
