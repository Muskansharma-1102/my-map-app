import { useEffect } from "react";
import { MapContainer, WMSTileLayer, useMap } from "react-leaflet";
import L from "leaflet";

// Styles
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Leaflet plugins (import only JS)
import "leaflet-draw";
import "leaflet.markercluster";
import "leaflet-control-geocoder";

// Types
import type { MapFeature } from "../types";
import { wmsUrl, wmsLayers } from "../utils/mapConfig";

interface MapProps {
  features: MapFeature[];
  onAddFeature: (feature: MapFeature) => void;
  wmsVisible: boolean;
}

/* -------------------- Custom Leaflet Plugin Component -------------------- */
const MapPlugins = ({ features, onAddFeature }: { features: MapFeature[]; onAddFeature: (f: MapFeature) => void }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    /* -------- Geocoder Control -------- */
    const geocoderControl = (L.Control as any).geocoder({
      placeholder: "Search location..."
    }).addTo(map);

    geocoderControl.on("markgeocode", (event: any) => {
      map.fitBounds(event.geocode.bbox);
    });

    /* -------- Draw Control -------- */
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItems },
      draw: {
        polygon: true,
        marker: true,
        rectangle: false,
        circle: false,
        polyline: false
      }
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);

      onAddFeature({
        id: Date.now().toString(),
        type: "polygon",
        coordinates: layer.toGeoJSON()
      });
    });

    /* -------- Marker Clustering -------- */
    const cluster = L.markerClusterGroup();

    features.forEach((feature) => {
      if (feature.type === "point") {
        cluster.addLayer(
          L.marker([feature.coordinates.lat, feature.coordinates.lng])
        );
      }
    });

    map.addLayer(cluster);

    return () => {
      map.removeLayer(cluster);
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
      map.removeControl(geocoderControl);
    };
  }, [map, features, onAddFeature]);

  return null;
};

/* -------------------- Main Map Component -------------------- */
const MapComponent = ({ features, onAddFeature, wmsVisible }: MapProps) => {
  return (
    <MapContainer
  center={[51.1657, 10.4515]}
  zoom={6}
  maxZoom={19}
  style={{ height: "calc(100vh - 64px)", width: "100%" }}
>

      {wmsVisible && (
        <WMSTileLayer
          url={wmsUrl}
          layers={wmsLayers}
          format="image/png"
          transparent
        />
      )}
      <MapPlugins features={features} onAddFeature={onAddFeature} />
    </MapContainer>
  );
};

export default MapComponent;
