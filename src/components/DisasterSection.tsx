import React, { useState } from 'react';
import { MapPin, ArrowLeft, Building2 } from 'lucide-react';

interface DisasterData {
  region: string;
  calamity: string;
  stores: { name: string; address: string; image: string }[];
  items: { 
    name: string; 
    description: string; 
    image: string;
    category: string;
  }[];
}

const DisasterSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const disasters: Record<string, DisasterData> = {
    coastal: {
      region: 'Coastal Region',
      calamity: 'Flooding',
      stores: [
        {
          name: 'Mumbai Supply Co.',
          address: '123 Marine Drive, Mumbai',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
        },
        {
          name: 'Coastal Gear Emporium',
          address: '456 Beach Road, Goa',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
          name: 'Emergency Essentials',
          address: '789 Port Street, Chennai',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
        }
      ],
      items: [
        {
          name: 'First Aid Kit',
          description: 'Comprehensive kit for minor injuries',
          image: 'https://images.unsplash.com/photo-1603398938235-f0de2b4c5b8b?w=300&h=300&fit=crop',
          category: 'Medical'
        },
        {
          name: 'Water Purification Tablets',
          description: 'Purifies water for safe drinking',
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop',
          category: 'Water'
        },
        {
          name: 'Emergency Radio',
          description: 'Receives emergency broadcasts',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
          category: 'Communication'
        },
        {
          name: 'Portable Charger',
          description: 'Keeps devices charged',
          image: 'https://images.unsplash.com/photo-1609592806596-7c8e0e2b7b7e?w=300&h=300&fit=crop',
          category: 'Electronics'
        },
        {
          name: 'Flashlight',
          description: 'Provides light in dark conditions',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
          category: 'Lighting'
        },
        {
          name: 'Multi-Tool',
          description: 'Versatile tool for various tasks',
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
          category: 'Tools'
        }
      ]
    },
    mountain: {
      region: 'Mountain Area',
      calamity: 'Landslides',
      stores: [
        {
          name: 'Himalayan Supplies',
          address: '321 Hill Station Road, Shimla',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
        },
        {
          name: 'Alpine Emergency Store',
          address: '654 Mountain View, Manali',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
          name: 'Peak Safety Supplies',
          address: '987 Valley Road, Darjeeling',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
        }
      ],
      items: [
        {
          name: 'Emergency Shelter Kit',
          description: 'Portable shelter for emergencies',
          image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop',
          category: 'Shelter'
        },
        {
          name: 'Thermal Blankets',
          description: 'Retains body heat in cold conditions',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
          category: 'Warmth'
        },
        {
          name: 'Mountain Rescue Kit',
          description: 'Essential tools for mountain rescue',
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
          category: 'Rescue'
        },
        {
          name: 'High-Energy Food',
          description: 'Nutrient-dense emergency food',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
          category: 'Food'
        },
        {
          name: 'Weather Radio',
          description: 'Weather updates and alerts',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
          category: 'Communication'
        },
        {
          name: 'Emergency Beacon',
          description: 'GPS distress signal device',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
          category: 'Safety'
        }
      ]
    },
    desert: {
      region: 'Desert Zone',
      calamity: 'Drought',
      stores: [
        {
          name: 'Desert Survival Store',
          address: '111 Sand Dune Ave, Jaisalmer',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
        },
        {
          name: 'Arid Zone Supplies',
          address: '222 Oasis Road, Bikaner',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
          name: 'Drought Relief Center',
          address: '333 Mirage Street, Jodhpur',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
        }
      ],
      items: [
        {
          name: 'Water Storage Containers',
          description: 'Large capacity water storage',
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop',
          category: 'Water'
        },
        {
          name: 'Solar Water Purifier',
          description: 'Solar-powered water purification',
          image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=300&fit=crop',
          category: 'Purification'
        },
        {
          name: 'Electrolyte Supplements',
          description: 'Prevents dehydration',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
          category: 'Health'
        },
        {
          name: 'Cooling Towels',
          description: 'Provides cooling relief',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
          category: 'Cooling'
        },
        {
          name: 'Portable Shade',
          description: 'Emergency shade structure',
          image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop',
          category: 'Shelter'
        },
        {
          name: 'Desert Survival Guide',
          description: 'Essential survival information',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
          category: 'Information'
        }
      ]
    },
    volcanic: {
      region: 'Volcanic Island',
      calamity: 'Eruptions',
      stores: [
        {
          name: 'Island Safety Store',
          address: '444 Volcano View, Andaman',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
        },
        {
          name: 'Eruption Emergency',
          address: '555 Lava Lane, Nicobar',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
          name: 'Volcanic Preparedness',
          address: '666 Ash Road, Lakshadweep',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
        }
      ],
      items: [
        {
          name: 'Dust Masks',
          description: 'Protection from volcanic ash',
          image: 'https://images.unsplash.com/photo-1584362917165-526f080a4d84?w=300&h=300&fit=crop',
          category: 'Protection'
        },
        {
          name: 'Emergency Evacuation Kit',
          description: 'Quick evacuation essentials',
          image: 'https://images.unsplash.com/photo-1603398938235-f0de2b4c5b8b?w=300&h=300&fit=crop',
          category: 'Evacuation'
        },
        {
          name: 'Air Purifier',
          description: 'Filters harmful particles',
          image: 'https://images.unsplash.com/photo-1609592806596-7c8e0e2b7b7e?w=300&h=300&fit=crop',
          category: 'Air Quality'
        },
        {
          name: 'Emergency Communication',
          description: 'Satellite communication device',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
          category: 'Communication'
        },
        {
          name: 'Protective Goggles',
          description: 'Eye protection from ash',
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
          category: 'Protection'
        },
        {
          name: 'Emergency Food Rations',
          description: 'Long-lasting food supplies',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
          category: 'Food'
        }
      ]
    },
    forest: {
      region: 'Forest Area',
      calamity: 'Wildfires',
      stores: [
        {
          name: 'Forest Safety Depot',
          address: '777 Pine Tree Lane, Dehradun',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
        },
        {
          name: 'Wildfire Prevention Co.',
          address: '888 Oak Street, Nainital',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
          name: 'Forest Emergency Hub',
          address: '999 Cedar Road, Mussoorie',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
        }
      ],
      items: [
        {
          name: 'Fire Extinguisher',
          description: 'Portable fire suppression',
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
          category: 'Fire Safety'
        },
        {
          name: 'Smoke Masks',
          description: 'Protection from smoke inhalation',
          image: 'https://images.unsplash.com/photo-1584362917165-526f080a4d84?w=300&h=300&fit=crop',
          category: 'Protection'
        },
        {
          name: 'Emergency Escape Ladder',
          description: 'Quick escape from elevated areas',
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
          category: 'Escape'
        },
        {
          name: 'Fire Blanket',
          description: 'Smothers small fires',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
          category: 'Fire Safety'
        },
        {
          name: 'Emergency Whistle',
          description: 'Signal for help',
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
          category: 'Signaling'
        },
        {
          name: 'Fireproof Document Bag',
          description: 'Protects important documents',
          image: 'https://images.unsplash.com/photo-1603398938235-f0de2b4c5b8b?w=300&h=300&fit=crop',
          category: 'Protection'
        }
      ]
    },
    earthquake: {
      region: 'Earthquake Zone',
      calamity: 'Tremors',
      stores: [
        {
          name: 'Seismic Safety Store',
          address: '101 Fault Line Road, Delhi',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
        },
        {
          name: 'Earthquake Preparedness',
          address: '202 Tremor Street, Guwahati',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        {
          name: 'Disaster Relief Center',
          address: '303 Shake Avenue, Shimla',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
        }
      ],
      items: [
        {
          name: 'Emergency Shelter',
          description: 'Temporary housing solution',
          image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop',
          category: 'Shelter'
        },
        {
          name: 'Structural Assessment Kit',
          description: 'Tools to assess building damage',
          image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
          category: 'Assessment'
        },
        {
          name: 'Emergency Water',
          description: 'Clean drinking water supply',
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop',
          category: 'Water'
        },
        {
          name: 'Rescue Tools',
          description: 'Tools for search and rescue',
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
          category: 'Rescue'
        },
        {
          name: 'Emergency Generator',
          description: 'Backup power supply',
          image: 'https://images.unsplash.com/photo-1609592806596-7c8e0e2b7b7e?w=300&h=300&fit=crop',
          category: 'Power'
        },
        {
          name: 'Medical Supplies',
          description: 'First aid and medical equipment',
          image: 'https://images.unsplash.com/photo-1603398938235-f0de2b4c5b8b?w=300&h=300&fit=crop',
          category: 'Medical'
        }
      ]
    }
  };

  const handleRegionClick = (regionKey: string) => {
    setSelectedRegion(regionKey);
    setIsExpanded(true);
  };

  const handleBack = () => {
    setIsExpanded(false);
    setSelectedRegion(null);
  };

  if (isExpanded && selectedRegion) {
    const regionData = disasters[selectedRegion];
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h3 className="text-xl font-bold text-gray-800">
            {regionData.region} - {regionData.calamity}
          </h3>
        </div>

        {/* Nearest Stores */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Nearest Stores</h4>
          <div className="space-y-3">
            {regionData.stores.map((store, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />
                <div>
                  <h5 className="font-medium text-gray-800">{store.name}</h5>
                  <p className="text-sm text-gray-600">{store.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Items */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Recommended Items</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {regionData.items.map((item, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h5 className="font-medium text-gray-800 mb-1">{item.name}</h5>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800 mb-4">Calamity Regions</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(disasters).map(([key, disaster]) => (
          <button
            key={key}
            onClick={() => handleRegionClick(key)}
            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border border-gray-200 hover:border-gray-300"
          >
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-gray-800 text-sm">{disaster.region}</h5>
                <p className="text-xs text-gray-600 mt-1">{disaster.calamity}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DisasterSection;