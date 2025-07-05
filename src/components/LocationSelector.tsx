import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface LocationSelectorProps {
  label: string;
  placeholder: string;
  value: Location | null;
  onChange: (location: Location | null) => void;
  icon?: React.ReactNode;
}

const indianCities: Location[] = [
  { id: '1', name: 'Mumbai', coordinates: [72.8777, 19.0760] },
  { id: '2', name: 'Delhi', coordinates: [77.1025, 28.7041] },
  { id: '3', name: 'Bengaluru', coordinates: [77.5946, 12.9716] },
  { id: '4', name: 'Hyderabad', coordinates: [78.4867, 17.3850] },
  { id: '5', name: 'Chennai', coordinates: [80.2707, 13.0827] },
  { id: '6', name: 'Kolkata', coordinates: [88.3639, 22.5726] },
  { id: '7', name: 'Pune', coordinates: [73.8567, 18.5204] },
  { id: '8', name: 'Ahmedabad', coordinates: [72.5714, 23.0225] },
  { id: '9', name: 'Jaipur', coordinates: [75.7873, 26.9124] },
  { id: '10', name: 'Surat', coordinates: [72.8311, 21.1702] },
  { id: '11', name: 'Lucknow', coordinates: [80.9462, 26.8467] },
  { id: '12', name: 'Kanpur', coordinates: [80.3319, 26.4499] },
  { id: '13', name: 'Nagpur', coordinates: [79.0882, 21.1458] },
  { id: '14', name: 'Indore', coordinates: [75.8577, 22.7196] },
  { id: '15', name: 'Thane', coordinates: [72.9781, 19.2183] },
  { id: '16', name: 'Bhopal', coordinates: [77.4126, 23.2599] },
  { id: '17', name: 'Visakhapatnam', coordinates: [83.2185, 17.6868] },
  { id: '18', name: 'Pimpri-Chinchwad', coordinates: [73.8067, 18.6298] },
  { id: '19', name: 'Patna', coordinates: [85.1376, 25.5941] },
  { id: '20', name: 'Vadodara', coordinates: [73.1812, 22.3072] }
];

const LocationSelector: React.FC<LocationSelectorProps> = ({
  label,
  placeholder,
  value,
  onChange,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCities = indianCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: Location) => {
    onChange(location);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-lg bg-white hover:border-blue-500 transition-colors">
          {icon && <span className="mr-2">{icon}</span>}
          <span className="flex-1 text-left">
            {value ? value.name : placeholder}
          </span>
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCities.map((city) => (
              <div
                key={city.id}
                className="flex items-center px-3 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelect(city)}
              >
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span>{city.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;