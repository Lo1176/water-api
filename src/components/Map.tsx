import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const mapContainer: HTMLElement | null = document.getElementById('map');
    const mapAlreadyInitialized: Element | null | undefined =
      mapContainer?.querySelector('.leaflet-map-pane');

    if (!mapAlreadyInitialized) {
      const map = L.map(mapContainer!).setView([48.8566, 2.3522], 13); // Centered on Paris, France

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([48.8584, 2.2945])
        .addTo(map)
        .bindPopup('Eiffel Tower')
        .openPopup();
    }
  }, []);

  return <div id='map' style={{ width: '100%', height: '600px' }} />;
};

export default Map;
