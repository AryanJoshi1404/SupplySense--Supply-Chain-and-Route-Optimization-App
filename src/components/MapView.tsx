import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="3" width="15" height="13"></rect>
      <polygon points="16,8 20,8 23,11 23,16 16,16"></polygon>
      <circle cx="5.5" cy="18.5" r="2.5"></circle>
      <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Custom red pin icon for locations
const redPinIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#dc2626" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Custom green pin for start location
const greenPinIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#16a34a" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface MapViewProps {
  locations: Location[];
}

const MapView: React.FC<MapViewProps> = ({ locations }) => {
  const truckMarkerRef = useRef<L.Marker | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (locations.length < 2 || !truckMarkerRef.current) return;

    let progress = 0;
    const speed = 0.005; // Adjust speed as needed

    const animate = () => {
      progress += speed;
      if (progress > 1) progress = 0;

      // Calculate position along the route
      const totalSegments = locations.length - 1;
      const currentSegment = Math.floor(progress * totalSegments);
      const segmentProgress = (progress * totalSegments) % 1;

      if (currentSegment < totalSegments) {
        const start = locations[currentSegment];
        const end = locations[currentSegment + 1];
        
        const lat = start.coordinates[1] + (end.coordinates[1] - start.coordinates[1]) * segmentProgress;
        const lng = start.coordinates[0] + (end.coordinates[0] - start.coordinates[0]) * segmentProgress;

        if (truckMarkerRef.current) {
          truckMarkerRef.current.setLatLng([lat, lng]);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [locations]);

  if (locations.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-sm">Map will appear here after route optimization</p>
        </div>
      </div>
    );
  }

  // Calculate bounds to fit all locations
  const bounds = L.latLngBounds(locations.map(loc => [loc.coordinates[1], loc.coordinates[0]]));
  
  // Create route path coordinates
  const routeCoordinates: [number, number][] = locations.map(loc => [loc.coordinates[1], loc.coordinates[0]]);

  // Calculate center point
  const centerLat = locations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / locations.length;
  const centerLng = locations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / locations.length;

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        bounds={bounds}
        boundsOptions={{ padding: [20, 20] }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Route polyline */}
        <Polyline
          positions={routeCoordinates}
          color="#2563eb"
          weight={4}
          opacity={0.7}
          dashArray="10, 10"
        />
        
        {/* Location markers */}
        {locations.map((location, index) => {
          const isStart = index === 0;
          const isEnd = index === locations.length - 1;
          const icon = isStart ? greenPinIcon : redPinIcon;
          
          return (
            <Marker
              key={location.id}
              position={[location.coordinates[1], location.coordinates[0]]}
              icon={icon}
            >
              <Popup>
                <div className="text-center">
                  <strong>{location.name}</strong>
                  <br />
                  {isStart && <span className="text-green-600">Start Location</span>}
                  {isEnd && <span className="text-red-600">Destination</span>}
                  {!isStart && !isEnd && <span className="text-yellow-600">Stop {index}</span>}
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Animated truck marker */}
        <Marker
          position={[locations[0].coordinates[1], locations[0].coordinates[0]]}
          icon={truckIcon}
          ref={truckMarkerRef}
        >
          <Popup>
            <div className="text-center">
              <strong>🚛 Delivery Truck</strong>
              <br />
              <span className="text-blue-600">En route</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;