import { useState, useEffect } from 'react';
import type { MapFeature } from '../types';  // Changed to type-only import

export const useMap = () => {
  const [features, setFeatures] = useState<MapFeature[]>(() => {
    // Persistence bonus: Load from localStorage
    const saved = localStorage.getItem('mapFeatures');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save to localStorage on change
    localStorage.setItem('mapFeatures', JSON.stringify(features));
  }, [features]);

  const addFeature = (feature: MapFeature) => setFeatures([...features, feature]);
  const toggleWms = (_visible: boolean) => {}; // Renamed to _visible to indicate unused (handled in Map component)

  return { features, addFeature, toggleWms };
};