import React, { useState } from 'react';
import { MapPin, Plus, Navigation, Truck, X } from 'lucide-react';
import LocationSelector from './LocationSelector';
import MapView from './MapView';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface AdditionalStop {
  id: string;
  location: Location | null;
}

const TransportationSection: React.FC = () => {
  const [startLocation, setStartLocation] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [additionalStops, setAdditionalStops] = useState<AdditionalStop[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimizeRoute = () => {
    if (!startLocation || !destination) return;
    
    setIsOptimizing(true);
    // Simulate optimization delay
    setTimeout(() => {
      setShowMap(true);
      setIsOptimizing(false);
    }, 1500);
  };

  const handleAddLocation = () => {
    const newStop: AdditionalStop = {
      id: `stop-${Date.now()}`,
      location: null
    };
    setAdditionalStops([...additionalStops, newStop]);
  };

  const handleRemoveLocation = (stopId: string) => {
    setAdditionalStops(additionalStops.filter(stop => stop.id !== stopId));
    // Update map if it's showing
    if (showMap) {
      setShowMap(true); // This will trigger a re-render of the map
    }
  };

  const handleStopLocationChange = (stopId: string, location: Location | null) => {
    setAdditionalStops(additionalStops.map(stop => 
      stop.id === stopId ? { ...stop, location } : stop
    ));
    // Update map if it's showing
    if (showMap) {
      setShowMap(true); // This will trigger a re-render of the map
    }
  };

  const allLocations = [
    startLocation, 
    ...additionalStops.map(stop => stop.location).filter(Boolean), 
    destination
  ].filter(Boolean) as Location[];

  const resetRoute = () => {
    setShowMap(false);
    setStartLocation(null);
    setDestination(null);
    setAdditionalStops([]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Navigation className="h-6 w-6 mr-3 text-blue-600" />
            Route Optimization
          </h2>
          {showMap && (
            <button
              onClick={resetRoute}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Reset Route
            </button>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Location Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          {/* Additional Stops */}
          {additionalStops.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Additional Stops</h3>
              <div className="space-y-3">
                {additionalStops.map((stop, index) => (
                  <div key={stop.id} className="flex items-end gap-3">
                    <div className="flex-1">
                      <LocationSelector
                        label={`Stop ${index + 1}`}
                        placeholder="Select stop location..."
                        value={stop.location}
                        onChange={(location) => handleStopLocationChange(stop.id, location)}
                        icon={<MapPin className="h-5 w-5 text-yellow-600" />}
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveLocation(stop.id)}
                      className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors mb-2"
                      title="Remove stop"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleOptimizeRoute}
              disabled={!startLocation || !destination || isOptimizing}
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="flex items-center bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Location
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      {showMap && allLocations.length >= 2 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Optimized Route Map</h3>
            <p className="text-sm text-gray-600 mt-1">
              Route with {allLocations.length} locations • Distance: ~{Math.floor(Math.random() * 500 + 200)} km • ETA: ~{Math.floor(Math.random() * 8 + 4)}h {Math.floor(Math.random() * 60)}m
            </p>
          </div>
          <div className="h-96 md:h-[500px]">
            <MapView locations={allLocations} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportationSection;