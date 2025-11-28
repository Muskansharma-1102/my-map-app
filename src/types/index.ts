export interface MapFeature {
  id: string;
  type: 'point' | 'polygon' | 'line';
  coordinates: any; // Leaflet-compatible
}

export interface AppState {
  features: MapFeature[];
  wmsVisible: boolean;
}