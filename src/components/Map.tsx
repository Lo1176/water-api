import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { regionCorseGeoJson } from '../data/regionCorseGeoJson';

const Map = () => {
  useEffect(() => {
    const mapContainer: HTMLElement | null = document.getElementById('map');
    const mapAlreadyInitialized: Element | null | undefined =
      mapContainer?.querySelector('.leaflet-map-pane');

    if (!mapAlreadyInitialized) {
      const map = L.map(mapContainer!).setView([42.3, 9.15], 8); // Centered on Paris, France

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.geoJSON(regionCorseGeoJson).addTo(map);

      // L.marker([42.3, 9.15]).addTo(map).bindPopup('Corte').openPopup();
    }
  }, []);

  return <div id='map' style={{ width: '100%', height: '600px' }} />;
};

export default Map;
