import React, { useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ───────── default marker fix ───────── */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/* ───────── custom icons ───────── */
const svgToIcon = (svg: string, size = 24) =>
  new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / (svg.includes('pin') ? 1 : 2)],
    popupAnchor: [0, -size / 2],
  });

const greenPinIcon = svgToIcon(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#16a34a" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
);
const redPinIcon = svgToIcon(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dc2626" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
);
const truckIcon = svgToIcon(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  24
);

/* ───────── types ───────── */
interface MapViewProps {
  /** array of [lng, lat] tuples from backend */
  locations: [number, number][];
}

/* ───────── component ───────── */
const MapView: React.FC<MapViewProps> = ({ locations }) => {
  const truckRef = useRef<L.Marker | null>(null);
  const animRef  = useRef<number>();

  /* ------------ truck animation ------------ */
 useEffect(() => {
  if (locations.length < 2 || !truckRef.current) return;

  let t = 0;
  const speed = 0.005;          // 0 → 1 over time
  let rafId: number;            // local—not in a ref

  const step = () => {
    t += speed;
    if (t > 1) t = 0;

    const segCount = locations.length - 1;
    const i = Math.floor(t * segCount);
    const p = (t * segCount) % 1;

    const [lng1, lat1] = locations[i];
    const [lng2, lat2] = locations[i + 1];

    const lat = lat1 + (lat2 - lat1) * p;
    const lng = lng1 + (lng2 - lng1) * p;

    truckRef.current!.setLatLng([lat, lng]);
    rafId = requestAnimationFrame(step);
  };

  rafId = requestAnimationFrame(step);

  // cleanup — always returns void
  return () => cancelAnimationFrame(rafId);
}, [locations]);

  /* ------------ empty state ------------ */
  if (!locations.length)
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-sm">Map will appear here after optimization</p>
        </div>
      </div>
    );

  /* ------------ helpers ------------ */
  const bounds = L.latLngBounds(
    locations.map(([lng, lat]) => [lat, lng] as [number, number])
  );
  const routeLatLng = locations.map(([lng, lat]) => [lat, lng]) as [
    number,
    number
  ][];
  const center: [number, number] = [
    routeLatLng.reduce((s, [, lat]) => s + lat, 0) / routeLatLng.length,
    routeLatLng.reduce((s, [lng]) => s + lng, 0) / routeLatLng.length,
  ];

  /* ------------ JSX ------------ */
  return (
    <MapContainer
      center={center}
      zoom={6}
      bounds={bounds}
      boundsOptions={{ padding: [20, 20] }}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* route line */}
      <Polyline positions={routeLatLng} color="#4285F4" weight={4} opacity={0.8} dashArray="none" />

      {/* start / end / stops */}
      {routeLatLng.map(([lat, lng], idx) => {
        const isStart = idx === 0;
        const isEnd   = idx === routeLatLng.length - 1;
        if (!isStart && !isEnd) return null;

        return (
          <Marker
            key={idx}
            position={[lat, lng]}
            icon={isStart ? greenPinIcon : redPinIcon}
          >
            <Popup>
              <div className="text-center">
                {isStart && <strong>Start location</strong>}
                {isEnd   && <strong>Destination</strong>}
                {!isStart && !isEnd && <strong>Stop&nbsp;{idx}</strong>}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* animated truck */}
      <Marker
        position={[routeLatLng[0][0], routeLatLng[0][1]]}
        icon={truckIcon}
        ref={truckRef}
      >
        <Popup>
          <div className="text-center">
            <strong>🚛 Delivery truck</strong>
            <br />
            <span className="text-blue-600">En&nbsp;route</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
