import React, { useState } from 'react';
import { MapPin, Plus, Navigation, Truck, X } from 'lucide-react';
import LocationSelector from './LocationSelector';
import MapView from './MapView';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
}

interface AdditionalStop {
  id: string;
  location: Location | null;
}

type Coord = [number, number]; // [lng, lat]

const TransportationSection: React.FC = () => {
  /* ───────── state ───────── */
  const [startLocation, setStartLocation]   = useState<Location | null>(null);
  const [destination,   setDestination]     = useState<Location | null>(null);
  const [additionalStops, setAdditionalStops] = useState<AdditionalStop[]>([]);
  const [optimizedRoute,  setOptimizedRoute]  = useState<Coord[]>([]);
  const [showMap,       setShowMap]         = useState(false);
  const [isOptimizing,  setIsOptimizing]    = useState(false);

  /* ───────── backend call ───────── */
  const handleOptimizeRoute = async () => {
    if (!startLocation || !destination) return;

    setIsOptimizing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_ROUTE_OPTI_BACKEND_URL}/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: startLocation.name,
          end:   destination.name,
          fuel_level: 10,
          fuel_type:  'diesel'
        })
      });
      const result = await res.json();
      console.log('Backend result:', result);

      if (result.best_route && result.best_route.geometry) {
        // GeoJSON LineString → Leaflet lat/lng
        const lineCoords: Coord[] =
          result.best_route.geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lng, lat]
          );

        setOptimizedRoute(lineCoords);
        setShowMap(true);
      } else {
        alert(result.message || 'No optimized route found.');
      }
    } catch (err) {
      console.error('Optimization failed', err);
      alert('Failed to optimize route.');
    } finally {
      setIsOptimizing(false);
    }
  };

  /* ───────── add / remove extra stops (UI only for now) ───────── */
  const handleAddLocation = () => {
    setAdditionalStops(stops => [
      ...stops,
      { id: `stop-${Date.now()}`, location: null }
    ]);
  };

  const handleRemoveLocation = (stopId: string) => {
    setAdditionalStops(stops => stops.filter(s => s.id !== stopId));
  };

  const handleStopLocationChange = (stopId: string, loc: Location | null) => {
    setAdditionalStops(stops =>
      stops.map(s => (s.id === stopId ? { ...s, location: loc } : s))
    );
  };

  /* ───────── reset ───────── */
  const resetRoute = () => {
    setStartLocation(null);
    setDestination(null);
    setAdditionalStops([]);
    setOptimizedRoute([]);
    setShowMap(false);
  };

  /* ───────── UI ───────── */
  return (
    <div className="space-y-6">
      {/* ───────── form card ───────── */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Navigation className="h-6 w-6 mr-3 text-blue-600" />
            Route Optimization
          </h2>
          {showMap && (
            <button onClick={resetRoute} className="text-sm text-gray-500 hover:text-gray-700">
              Reset Route
            </button>
          )}
        </div>

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <LocationSelector
            label="Start Location"
            placeholder="Select starting point..."
            value={startLocation}
            onChange={setStartLocation}
            icon={<MapPin className="h-5 w-5 text-green-600" />}
          />
          <LocationSelector
            label="Destination"
            placeholder="Select destination..."
            value={destination}
            onChange={setDestination}
            icon={<MapPin className="h-5 w-5 text-red-600" />}
          />
        </div>

        {/* Extra stops */}
        {additionalStops.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="font-medium text-gray-700">Additional Stops</h3>
            {additionalStops.map((stop, idx) => (
              <div key={stop.id} className="flex items-end gap-3">
                <div className="flex-1">
                  <LocationSelector
                    label={`Stop ${idx + 1}`}
                    placeholder="Select stop location..."
                    value={stop.location}
                    onChange={loc => handleStopLocationChange(stop.id, loc)}
                    icon={<MapPin className="h-5 w-5 text-yellow-600" />}
                  />
                </div>
                <button
                  onClick={() => handleRemoveLocation(stop.id)}
                  className="w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center justify-center mb-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleOptimizeRoute}
            disabled={!startLocation || !destination || isOptimizing}
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isOptimizing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Optimizing...
              </>
            ) : (
              <>
                <Truck className="h-5 w-5 mr-2" />
                Optimize Route
              </>
            )}
          </button>
          <button
            onClick={handleAddLocation}
            className="flex items-center bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Location
          </button>
        </div>
      </div>

      {/* ───────── map card ───────── */}
      {showMap && optimizedRoute.length >= 2 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Optimized Route Map</h3>
          </div>
          <div className="h-96 md:h-[500px]">
            {/* MapView expects lng/lat tuples; it flips inside */}
            <MapView locations={optimizedRoute} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportationSection;
