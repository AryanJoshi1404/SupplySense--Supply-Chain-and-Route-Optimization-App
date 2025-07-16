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
      region: 'Konkan - Coastal Region',
      calamity: 'Flooding',
      stores: [
        {
          name: 'Mumbai Supply Co.',
          address: 'Marine Drive, Mumbai',
          image: 'https://images.unsplash.com/photo-1607977027972-e2aae2b5b1e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VwcGx5JTIwc3RvcmVzfGVufDB8fDB8fHww'
        },
        {
          name: 'Coastal Gear Emporium',
          address: 'Beach Road, Goa',
          image: 'https://images.unsplash.com/photo-1687203920859-c87cb0955630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        },
        {
          name: 'Emergency Essentials',
          address: 'Raigad',
          image: 'https://images.unsplash.com/photo-1633185953534-82d329bce7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        }
      ],
      items: [
        {
          name: 'First Aid Kit',
          description: 'Comprehensive kit for minor injuries',
          image: 'https://images.unsplash.com/photo-1624638760852-8ede1666ab07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmlyc3QlMjBhaWQlMjBraXR8ZW58MHx8MHx8fDA%3Dhttps://images.unsplash.com/photo-1603398938235-f0de2b4c5b8b?w=300&h=300&fit=crop',
          category: 'Medical'
        },
        {
          name: 'Water Purification Tablets',
          description: 'Purifies water for safe drinking',
          image: 'https://images.unsplash.com/photo-1643114455894-d7a4cd35c395?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGVyJTIwcHVyaWZpY2F0aW9uJTIwdGFibGV0c3xlbnwwfHwwfHx8MA%3D%3D',
          category: 'Water'
        },
        {
          name: 'Emergency Radio',
          description: 'Receives emergency broadcasts',
          image: 'https://images.unsplash.com/photo-1670234192944-5d5d06b762be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW1lcmdlbmN5JTIwcmFkaW98ZW58MHx8MHx8fDA%3D',
          category: 'Communication'
        },
        {
          name: 'Portable Charger',
          description: 'Keeps devices charged',
          image: 'https://images.unsplash.com/photo-1619489646924-b4fce76b1db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydGFibGUlMjBjaGFyZ2VyfGVufDB8fDB8fHww',
          category: 'Electronics'
        },
        {
          name: 'Flashlight',
          description: 'Provides light in dark conditions',
          image: 'https://images.unsplash.com/photo-1561916960-dea3b9b0355a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxhc2hsaWdodHxlbnwwfHwwfHx8MA%3D%3D',
          category: 'Lighting'
        },
        {
          name: 'Multi-Tool',
          description: 'Versatile tool for various tasks',
          image: 'https://images.unsplash.com/photo-1713114344703-bf4fb0be30bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVsdGklMjB0b29sfGVufDB8fDB8fHww',
          category: 'Tools'
        }
      ]
    },
    mountain: {
      region: 'Himanchal - Mountain Area',
      calamity: 'Landslides',
      stores: [
        {
          name: 'Himalayan Supplies',
          address: 'Hill Station Road, Shimla',
          image: 'https://images.unsplash.com/photo-1673784327991-00132d915b08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        },
        {
          name: 'Alpine Emergency Store',
          address: '28 Mall Road, Manali',
          image: 'https://images.unsplash.com/photo-1577374559080-cb697b79d8f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        },
        {
          name: 'Peak Safety Supplies',
          address: 'Parvati Valley Road, Kasol',
          image: 'https://images.unsplash.com/photo-1687203920859-c87cb0955630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
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
          image: 'https://images.unsplash.com/photo-1699797467199-6bdf301649e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHRoZXJtYWwlMjBibGFua2V0c3xlbnwwfHwwfHx8MA%3D%3D',
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
          image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpbm9hJTIwYm93bHxlbnwwfHwwfHx8MA%3D%3D',
          category: 'Food'
        },
        {
          name: 'Weather Radio',
          description: 'Weather updates and alerts',
          image: 'https://images.unsplash.com/photo-1670234192944-5d5d06b762be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW1lcmdlbmN5JTIwcmFkaW98ZW58MHx8MHx8fDA%3D',
          category: 'Communication'
        },
        {
          name: 'Emergency Beacon',
          description: 'GPS distress signal device',
          image: 'https://images.unsplash.com/photo-1735875593780-6fb12617ece1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW1lcmdlbmN5JTIwYmVhY29ufGVufDB8fDB8fHww',
          category: 'Safety'
        }
      ]
    },
    desert: {
      region: 'Chtr Sambhajinagar - Arid Zone',
      calamity: 'Drought',
      stores: [
        {
          name: 'Survival Supplies Store',
          address: '11 MG Road, Nashik',
          image: 'https://images.unsplash.com/photo-1673784327991-00132d915b08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        },
        {
          name: 'Arid Zone Supplies',
          address: '53 RK Road, Ahmednagar',
          image: 'https://images.unsplash.com/photo-1577374559080-cb697b79d8f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        },
        {
          name: 'Drought Relief Center',
          address: 'Mirage Street, Sambhajinagar',
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
        }
      ],
      items: [
        {
          name: 'Water Storage Containers',
          description: 'Large capacity water storage',
          image: 'https://images.unsplash.com/photo-1597159059345-30248a18b087?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2F0ZXIlMjBzdG9yYWdlJTIwY29udGFpbmVyc3xlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop',
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
          image: 'https://images.unsplash.com/photo-1670850757263-6efc07d410f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpdGFtaW4lMjBzdXBwbGVtZW50c3xlbnwwfHwwfHx8MA%3D%3D',
          category: 'Health'
        },
        {
          name: 'Cooling Towels',
          description: 'Provides cooling relief',
          image: 'https://images.unsplash.com/photo-1558505780-1e584fab3ede?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvd2Vsc3xlbnwwfHwwfHx8MA%3D%3D',
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
          image: 'https://images.unsplash.com/photo-1513181059492-05ae995a16f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzZXJ0JTIwc3Vydml2YWwlMjBndWlkZXxlbnwwfHwwfHx8MA%3D%3D',
          category: 'Information'
        }
      ]
    },
    // volcanic: {
    //   region: 'Volcanic Island',
    //   calamity: 'Eruptions',
    //   stores: [
    //     {
    //       name: 'Island Safety Store',
    //       address: '444 Volcano View, Andaman',
    //       image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
    //     },
    //     {
    //       name: 'Eruption Emergency',
    //       address: '555 Lava Lane, Nicobar',
    //       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    //     },
    //     {
    //       name: 'Volcanic Preparedness',
    //       address: '666 Ash Road, Lakshadweep',
    //       image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
    //     }
    //   ],
    //   items: [
    //     {
    //       name: 'Dust Masks',
    //       description: 'Protection from volcanic ash',
    //       image: 'https://images.unsplash.com/photo-1584362917165-526f080a4d84?w=300&h=300&fit=crop',
    //       category: 'Protection'
    //     },
    //     {
    //       name: 'Emergency Evacuation Kit',
    //       description: 'Quick evacuation essentials',
    //       image: 'https://images.unsplash.com/photo-1603398938235-f0de2b4c5b8b?w=300&h=300&fit=crop',
    //       category: 'Evacuation'
    //     },
    //     {
    //       name: 'Air Purifier',
    //       description: 'Filters harmful particles',
    //       image: 'https://images.unsplash.com/photo-1609592806596-7c8e0e2b7b7e?w=300&h=300&fit=crop',
    //       category: 'Air Quality'
    //     },
    //     {
    //       name: 'Emergency Communication',
    //       description: 'Satellite communication device',
    //       image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    //       category: 'Communication'
    //     },
    //     {
    //       name: 'Protective Goggles',
    //       description: 'Eye protection from ash',
    //       image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    //       category: 'Protection'
    //     },
    //     {
    //       name: 'Emergency Food Rations',
    //       description: 'Long-lasting food supplies',
    //       image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    //       category: 'Food'
    //     }
    //   ]
    // },
    forest: {
      region: 'Jalna - Forest Area',
      calamity: 'Wildfires',
      stores: [
        {
          name: 'Forest Safety Depot',
          address: '283 Junagadh, Jalna',
          image: 'https://images.unsplash.com/photo-1633185953534-82d329bce7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        },
        {
          name: 'Wildfire Prevention Co.',
          address: '8 Oak Street, Beed',
          image: 'https://images.unsplash.com/photo-1673784327991-00132d915b08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        },
        {
          name: 'Forest Emergency Hub',
          address: '76 Railway Station Road, Shegaon',
          image: 'https://images.unsplash.com/photo-1687203920859-c87cb0955630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
        }
      ],
      items: [
        {
          name: 'Fire Extinguisher',
          description: 'Portable fire suppression',
          image: 'https://images.unsplash.com/photo-1649836215936-41c76a724233?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmlyZSUyMGV4dGluZ3Vpc2Vyc3xlbnwwfHwwfHx8MA%3D%3D',
          category: 'Fire Safety'
        },
        {
          name: 'Smoke Masks',
          description: 'Protection from smoke inhalation',
          image: 'https://tse1.mm.bing.net/th/id/OIP.ZyuKPs1HT4dw_rHz_aa46QHaF2?pid=Api&P=0&h=180',
          category: 'Protection'
        },
        {
          name: 'Emergency Escape Ladder',
          description: 'Quick escape from elevated areas',
          image: 'https://images.unsplash.com/photo-1595236435815-6558ddf29efe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFkZGVyc3xlbnwwfHwwfHx8MA%3D%3D',
          category: 'Escape'
        },
        {
          name: 'Fire Blanket',
          description: 'Smothers small fires',
          image: 'https://images.unsplash.com/photo-1599933345241-2d01fe8d06ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmlyZSUyMGJsYW5rZXR8ZW58MHx8MHx8fDA%3D',
          category: 'Fire Safety'
        },
        {
          name: 'Emergency Whistle',
          description: 'Signal for help',
          image: 'https://tse2.mm.bing.net/th/id/OIP.J32vATposYhRP9IGMqHZYgHaHD?pid=Api&P=0&h=180',
          category: 'Signaling'
        },
        {
          name: 'Fireproof Document Bag',
          description: 'Protects important documents',
          image: 'https://tse4.mm.bing.net/th/id/OIP.QyhXlwCACSJbZNFt2IQ2OQHaHa?pid=Api&P=0&h=180',
          category: 'Protection'
        }
      ]
    },
    // earthquake: {
    //   region: 'Earthquake Zone',
    //   calamity: 'Tremors',
    //   stores: [
    //     {
    //       name: 'Seismic Safety Store',
    //       address: '101 Fault Line Road, Delhi',
    //       image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
    //     },
    //     {
    //       name: 'Earthquake Preparedness',
    //       address: '202 Tremor Street, Guwahati',
    //       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    //     },
    //     {
    //       name: 'Disaster Relief Center',
    //       address: '303 Shake Avenue, Shimla',
    //       image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
    //     }
    //   ],
    //   items: [
    //     {
    //       name: 'Emergency Shelter',
    //       description: 'Temporary housing solution',
    //       image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop',
    //       category: 'Shelter'
    //     },
    //     {
    //       name: 'Structural Assessment Kit',
    //       description: 'Tools to assess building damage',
    //       image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    //       category: 'Assessment'
    //     },
    //     {
    //       name: 'Emergency Water',
    //       description: 'Clean drinking water supply',
    //       image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop',
    //       category: 'Water'
    //     },
    //     {
    //       name: 'Rescue Tools',
    //       description: 'Tools for search and rescue',
    //       image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
    //       category: 'Rescue'
    //     },
    //     {
    //       name: 'Emergency Generator',
    //       description: 'Backup power supply',
    //       image: 'https://images.unsplash.com/photo-1609592806596-7c8e0e2b7b7e?w=300&h=300&fit=crop',
    //       category: 'Power'
    //     },
    //     {
    //       name: 'Medical Supplies',
    //       description: 'First aid and medical equipment',
    //       image: 'https://images.unsplash.com/photo-1603398938235-f0de2b4c5b8b?w=300&h=300&fit=crop',
    //       category: 'Medical'
    //     }
    //   ]
    // }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {regionData.items.map((item, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2">
                  <h5 className="font-medium text-gray-800 mb-1 text-sm">{item.name}</h5>
                  <p className="text-xs text-gray-600 mb-2">{item.description}</p>
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



// import React, { useState } from 'react';
// import { MapPin, ArrowLeft, Building2, ShoppingCart, Heart, Star, Clock, Phone, Navigation } from 'lucide-react';

// interface DisasterData {
//   region: string;
//   calamity: string;
//   stores: { name: string; address: string; image: string; rating?: number; distance?: string; phone?: string }[];
//   items: { 
//     name: string; 
//     description: string; 
//     image: string;
//     category: string;
//     price?: string;
//     rating?: number;
//     inStock?: boolean;
//   }[];
// }

// const DisasterSection: React.FC = () => {
//   const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState<number | null>(null);
//   const [hoveredStore, setHoveredStore] = useState<number | null>(null);
//   const [cart, setCart] = useState<string[]>([]);
//   const [favorites, setFavorites] = useState<string[]>([]);

//   const disasters: Record<string, DisasterData> = {
//     coastal: {
//       region: 'Konkan - Coastal Region',
//       calamity: 'Flooding',
//       stores: [
//         {
//           name: 'Mumbai Supply Co.',
//           address: 'Marine Drive, Mumbai',
//           image: 'https://images.unsplash.com/photo-1607977027972-e2aae2b5b1e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VwcGx5JTIwc3RvcmVzfGVufDB8fDB8fHww',
//           rating: 4.5,
//           distance: '2.3 km',
//           phone: '+91 98765 43210'
//         },
//         {
//           name: 'Coastal Gear Emporium',
//           address: 'Beach Road, Goa',
//           image: 'https://images.unsplash.com/photo-1687203920859-c87cb0955630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D',
//           rating: 4.2,
//           distance: '5.1 km',
//           phone: '+91 98765 43211'
//         },
//         {
//           name: 'Emergency Essentials',
//           address: 'Raigad',
//           image: 'https://images.unsplash.com/photo-1633185953534-82d329bce7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D',
//           rating: 4.8,
//           distance: '1.7 km',
//           phone: '+91 98765 43212'
//         }
//       ],
//       items: [
//         {
//           name: 'First Aid Kit',
//           description: 'Comprehensive kit for minor injuries',
//           image: 'https://images.unsplash.com/photo-1624638760852-8ede1666ab07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmlyc3QlMjBhaWQlMjBraXR8ZW58MHx8MHx8fDA%3D',
//           category: 'Medical',
//           price: '₹1,299',
//           rating: 4.6,
//           inStock: true
//         },
//         {
//           name: 'Water Purification Tablets',
//           description: 'Purifies water for safe drinking',
//           image: 'https://images.unsplash.com/photo-1643114455894-d7a4cd35c395?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGVyJTIwcHVyaWZpY2F0aW9uJTIwdGFibGV0c3xlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Water',
//           price: '₹499',
//           rating: 4.3,
//           inStock: true
//         },
//         {
//           name: 'Emergency Radio',
//           description: 'Receives emergency broadcasts',
//           image: 'https://images.unsplash.com/photo-1670234192944-5d5d06b762be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW1lcmdlbmN5JTIwcmFkaW98ZW58MHx8MHx8fDA%3D',
//           category: 'Communication',
//           price: '₹2,899',
//           rating: 4.7,
//           inStock: false
//         },
//         {
//           name: 'Portable Charger',
//           description: 'Keeps devices charged',
//           image: 'https://images.unsplash.com/photo-1619489646924-b4fce76b1db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydGFibGUlMjBjaGFyZ2VyfGVufDB8fDB8fHww',
//           category: 'Electronics',
//           price: '₹1,999',
//           rating: 4.4,
//           inStock: true
//         },
//         {
//           name: 'Flashlight',
//           description: 'Provides light in dark conditions',
//           image: 'https://images.unsplash.com/photo-1561916960-dea3b9b0355a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxhc2hsaWdodHxlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Lighting',
//           price: '₹799',
//           rating: 4.5,
//           inStock: true
//         },
//         {
//           name: 'Multi-Tool',
//           description: 'Versatile tool for various tasks',
//           image: 'https://images.unsplash.com/photo-1713114344703-bf4fb0be30bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVsdGklMjB0b29sfGVufDB8fDB8fHww',
//           category: 'Tools',
//           price: '₹1,599',
//           rating: 4.8,
//           inStock: true
//         }
//       ]
//     },
//     mountain: {
//       region: 'Himanchal - Mountain Area',
//       calamity: 'Landslides',
//       stores: [
//         {
//           name: 'Himalayan Supplies',
//           address: 'Hill Station Road, Shimla',
//           image: 'https://images.unsplash.com/photo-1673784327991-00132d915b08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D',
//           rating: 4.3,
//           distance: '3.2 km',
//           phone: '+91 98765 43213'
//         },
//         {
//           name: 'Alpine Emergency Store',
//           address: '28 Mall Road, Manali',
//           image: 'https://images.unsplash.com/photo-1577374559080-cb697b79d8f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D',
//           rating: 4.6,
//           distance: '1.8 km',
//           phone: '+91 98765 43214'
//         },
//         {
//           name: 'Peak Safety Supplies',
//           address: 'Parvati Valley Road, Kasol',
//           image: 'https://images.unsplash.com/photo-1687203920859-c87cb0955630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D',
//           rating: 4.1,
//           distance: '4.5 km',
//           phone: '+91 98765 43215'
//         }
//       ],
//       items: [
//         {
//           name: 'Emergency Shelter Kit',
//           description: 'Portable shelter for emergencies',
//           image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop',
//           category: 'Shelter',
//           price: '₹4,999',
//           rating: 4.7,
//           inStock: true
//         },
//         {
//           name: 'Thermal Blankets',
//           description: 'Retains body heat in cold conditions',
//           image: 'https://images.unsplash.com/photo-1699797467199-6bdf301649e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHRoZXJtYWwlMjBibGFua2V0c3xlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Warmth',
//           price: '₹899',
//           rating: 4.4,
//           inStock: true
//         },
//         {
//           name: 'Mountain Rescue Kit',
//           description: 'Essential tools for mountain rescue',
//           image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
//           category: 'Rescue',
//           price: '₹7,999',
//           rating: 4.9,
//           inStock: false
//         },
//         {
//           name: 'High-Energy Food',
//           description: 'Nutrient-dense emergency food',
//           image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpbm9hJTIwYm93bHxlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Food',
//           price: '₹1,299',
//           rating: 4.2,
//           inStock: true
//         },
//         {
//           name: 'Weather Radio',
//           description: 'Weather updates and alerts',
//           image: 'https://images.unsplash.com/photo-1670234192944-5d5d06b762be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW1lcmdlbmN5JTIwcmFkaW98ZW58MHx8MHx8fDA%3D',
//           category: 'Communication',
//           price: '₹3,499',
//           rating: 4.6,
//           inStock: true
//         },
//         {
//           name: 'Emergency Beacon',
//           description: 'GPS distress signal device',
//           image: 'https://images.unsplash.com/photo-1735875593780-6fb12617ece1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW1lcmdlbmN5JTIwYmVhY29ufGVufDB8fDB8fHww',
//           category: 'Safety',
//           price: '₹12,999',
//           rating: 4.8,
//           inStock: true
//         }
//       ]
//     },
//     desert: {
//       region: 'Chtr Sambhajinagar - Arid Zone',
//       calamity: 'Drought',
//       stores: [
//         {
//           name: 'Survival Supplies Store',
//           address: '11 MG Road, Nashik',
//           image: 'https://images.unsplash.com/photo-1673784327991-00132d915b08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D',
//           rating: 4.4,
//           distance: '2.1 km',
//           phone: '+91 98765 43216'
//         },
//         {
//           name: 'Arid Zone Supplies',
//           address: '53 RK Road, Ahmednagar',
//           image: 'https://images.unsplash.com/photo-1577374559080-cb697b79d8f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D',
//           rating: 4.7,
//           distance: '6.3 km',
//           phone: '+91 98765 43217'
//         },
//         {
//           name: 'Drought Relief Center',
//           address: 'Mirage Street, Sambhajinagar',
//           image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
//           rating: 4.0,
//           distance: '3.8 km',
//           phone: '+91 98765 43218'
//         }
//       ],
//       items: [
//         {
//           name: 'Water Storage Containers',
//           description: 'Large capacity water storage',
//           image: 'https://images.unsplash.com/photo-1597159059345-30248a18b087?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2F0ZXIlMjBzdG9yYWdlJTIwY29udGFpbmVyc3xlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Water',
//           price: '₹2,499',
//           rating: 4.5,
//           inStock: true
//         },
//         {
//           name: 'Solar Water Purifier',
//           description: 'Solar-powered water purification',
//           image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=300&fit=crop',
//           category: 'Purification',
//           price: '₹8,999',
//           rating: 4.6,
//           inStock: true
//         },
//         {
//           name: 'Electrolyte Supplements',
//           description: 'Prevents dehydration',
//           image: 'https://images.unsplash.com/photo-1670850757263-6efc07d410f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpdGFtaW4lMjBzdXBwbGVtZW50c3xlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Health',
//           price: '₹699',
//           rating: 4.3,
//           inStock: true
//         },
//         {
//           name: 'Cooling Towels',
//           description: 'Provides cooling relief',
//           image: 'https://images.unsplash.com/photo-1558505780-1e584fab3ede?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvd2Vsc3xlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Cooling',
//           price: '₹399',
//           rating: 4.1,
//           inStock: true
//         },
//         {
//           name: 'Portable Shade',
//           description: 'Emergency shade structure',
//           image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop',
//           category: 'Shelter',
//           price: '₹3,999',
//           rating: 4.4,
//           inStock: false
//         },
//         {
//           name: 'Desert Survival Guide',
//           description: 'Essential survival information',
//           image: 'https://images.unsplash.com/photo-1513181059492-05ae995a16f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzZXJ0JTIwc3Vydml2YWwlMjBndWlkZXxlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Information',
//           price: '₹299',
//           rating: 4.7,
//           inStock: true
//         }
//       ]
//     },
//     forest: {
//       region: 'Jalna - Forest Area',
//       calamity: 'Wildfires',
//       stores: [
//         {
//           name: 'Forest Safety Depot',
//           address: '283 Junagadh, Jalna',
//           image: 'https://images.unsplash.com/photo-1633185953534-82d329bce7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
//         },
//         {
//           name: 'Wildfire Prevention Co.',
//           address: '8 Oak Street, Beed',
//           image: 'https://images.unsplash.com/photo-1673784327991-00132d915b08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
//         },
//         {
//           name: 'Forest Emergency Hub',
//           address: '76 Railway Station Road, Shegaon',
//           image: 'https://images.unsplash.com/photo-1687203920859-c87cb0955630?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1cHBseSUyMHN0b3Jlc3xlbnwwfHwwfHx8MA%3D%3D'
//         }
//       ],
//       items: [
//         {
//           name: 'Fire Extinguisher',
//           description: 'Portable fire suppression',
//           image: 'https://images.unsplash.com/photo-1649836215936-41c76a724233?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmlyZSUyMGV4dGluZ3Vpc2Vyc3xlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Fire Safety'
//         },
//         {
//           name: 'Smoke Masks',
//           description: 'Protection from smoke inhalation',
//           image: 'https://images.unsplash.com/photo-1584362917165-526f080a4d84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVzdCUyMG1hc2t8ZW58MHx8MHx8fDA%3D',
//           category: 'Protection'
//         },
//         {
//           name: 'Emergency Escape Ladder',
//           description: 'Quick escape from elevated areas',
//           image: 'https://images.unsplash.com/photo-1595236435815-6558ddf29efe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFkZGVyc3xlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Escape'
//         },
//         {
//           name: 'Fire Blanket',
//           description: 'Smothers small fires',
//           image: 'https://images.unsplash.com/photo-1599933345241-2d01fe8d06ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmlyZSUyMGJsYW5rZXR8ZW58MHx8MHx8fDA%3D',
//           category: 'Fire Safety'
//         },
//         {
//           name: 'Emergency Whistle',
//           description: 'Signal for help',
//           image: 'https://images.unsplash.com/photo-1564442038901-4f9a19d3d456?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpc3RsZXxlbnwwfHwwfHx8MA%3D%3D',
//           category: 'Signaling'
//         },
//         {
//           name: 'Fireproof Document Bag',
//           description: 'Protects important documents',
//           image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdW1lbnQlMjBiYWd8ZW58MHx8MHx8fDA%3D',
//           category: 'Protection'
//         }
//       ]
//     },
    // earthquake: {
    //   region: 'Earthquake Zone',
    //   calamity: 'Tremors',
    //   stores: [
    //     {
    //       name: 'Seismic Safety Store',
    //       address: '101 Fault Line Road, Delhi',
    //       image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'
    //     },
    //     {
    //       name: 'Earthquake Preparedness',
    //       address: '202 Tremor Street, Guwahati',
    //       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    //     },
    //     {
    //       name: 'Disaster Relief Center',
    //       address: '303 Shake Avenue, Shimla',
    //       image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
    //     }
    //   ],
    //   items: [
    //     {
    //       name: 'Emergency Shelter',
    //       description: 'Temporary housing solution',
    //       image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop',
    //       category: 'Shelter'
    //     },
    //     {
    //       name: 'Structural Assessment Kit',
    //       description: 'Tools to assess building damage',
    //       image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    //       category: 'Assessment'
    //     },
    //     {
    //       name: 'Emergency Water',
    //       description: 'Clean drinking water supply',
    //       image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop',
    //       category: 'Water'
    //     },
    //     {
    //       name: 'Rescue Tools',
    //       description: 'Tools for search and rescue',
    //       image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
    //       category: 'Rescue'
    //     },
    //     {
    //       name: 'Emergency Generator',
    //       description: 'Backup power supply',
    //       image: 'https://images.unsplash.com/photo-1609592806596-7c8e0e2b7b7e?w=300&h=300&fit=crop',
    //       category: 'Power'
    //     },
    //     {
    //       name: 'Medical Supplies',
    //       description: 'First aid and medical equipment',
    //       image: 'https://images.unsplash.com/photo-1603398938235-f0de2b4c5b8b?w=300&h=300&fit=crop',
    //       category: 'Medical'
    //     }
    //   ]
    // }
  // };

//   const handleRegionClick = (regionKey: string) => {
//     setSelectedRegion(regionKey);
//     setIsExpanded(true);
//   };

//   const handleBack = () => {
//     setIsExpanded(false);
//     setSelectedRegion(null);
//   };

//   const addToCart = (itemName: string) => {
//     setCart(prev => prev.includes(itemName) ? prev : [...prev, itemName]);
//   };

//   const toggleFavorite = (itemName: string) => {
//     setFavorites(prev => 
//       prev.includes(itemName) 
//         ? prev.filter(item => item !== itemName)
//         : [...prev, itemName]
//     );
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//       />
//     ));
//   };

//   if (isExpanded && selectedRegion) {
//     const regionData = disasters[selectedRegion];
//     return (
//       <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
//         {/* Header with back button */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <button
//               onClick={handleBack}
//               className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 mr-6 hover:scale-105"
//             >
//               <ArrowLeft className="h-5 w-5 mr-2" />
//               Back
//             </button>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 {regionData.region}
//               </h3>
//               <p className="text-red-600 font-medium">{regionData.calamity}</p>
//             </div>
//           </div>
//           <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
//             <p className="text-red-600 font-medium text-sm">Emergency Alert Active</p>
//           </div>
//         </div>

//         {/* Nearest Stores */}
//         <div className="mb-8">
//           <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//             <Building2 className="h-5 w-5 mr-2 text-blue-600" />
//             Nearest Emergency Stores
//           </h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {regionData.stores.map((store, index) => (
//               <div 
//                 key={index} 
//                 className={`group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
//                   hoveredStore === index 
//                     ? 'border-blue-300 shadow-lg scale-105' 
//                     : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//                 }`}
//                 onMouseEnter={() => setHoveredStore(index)}
//                 onMouseLeave={() => setHoveredStore(null)}
//               >
//                 <div className="relative">
//                   <img
//                     src={store.image}
//                     alt={store.name}
//                     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
//                     <Star className="h-4 w-4 text-yellow-400 mr-1" />
//                     <span className="text-xs font-semibold text-gray-700">{store.rating ?? '-'}</span>
//                   </div>
//                 </div>
//                 <div className="p-3">
//                   <h5 className="font-semibold text-gray-800 mb-1">{store.name}</h5>
//                   <p className="text-xs text-gray-600 mb-1 flex items-center">
//                     <Navigation className="h-3 w-3 mr-1" />
//                     {store.address}
//                   </p>
//                   <div className="flex items-center text-xs text-gray-500 space-x-3 mt-1">
//                     {store.distance && (
//                       <span className="flex items-center">
//                         <Clock className="h-3 w-3 mr-1" />
//                         {store.distance}
//                       </span>
//                     )}
//                     {store.phone && (
//                       <span className="flex items-center">
//                         <Phone className="h-3 w-3 mr-1" />
//                         {store.phone}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recommended Items */}
//         <div>
//           <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//             <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
//             Recommended Emergency Items
//           </h4>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {regionData.items.map((item, index) => (
//               <div
//                 key={index}
//                 className={`relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all duration-200 group hover:shadow-lg hover:border-blue-300 ${
//                   hoveredItem === index ? 'scale-105' : ''
//                 }`}
//                 onMouseEnter={() => setHoveredItem(index)}
//                 onMouseLeave={() => setHoveredItem(null)}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-28 object-cover"
//                 />
//                 <div className="p-3">
//                   <div className="flex items-center justify-between mb-1">
//                     <h5 className="font-medium text-gray-800 text-sm">{item.name}</h5>
//                     <button
//                       className={`ml-2 ${favorites.includes(item.name) ? 'text-red-500' : 'text-gray-400'} hover:text-red-600`}
//                       onClick={() => toggleFavorite(item.name)}
//                       title="Add to favorites"
//                       type="button"
//                     >
//                       <Heart className="h-4 w-4" fill={favorites.includes(item.name) ? 'currentColor' : 'none'} />
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-600 mb-2">{item.description}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                       {item.category}
//                     </span>
//                     {item.price && (
//                       <span className="text-xs font-semibold text-green-700">{item.price}</span>
//                     )}
//                   </div>
//                   <div className="flex items-center mt-2">
//                     {item.rating && renderStars(item.rating)}
//                     {item.inStock === false && (
//                       <span className="ml-2 text-xs text-red-500 font-medium">Out of Stock</span>
//                     )}
//                   </div>
//                   <button
//                     className={`mt-3 w-full py-1 rounded-md text-xs font-semibold transition-colors ${
//                       cart.includes(item.name)
//                         ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                         : 'bg-blue-600 text-white hover:bg-blue-700'
//                     }`}
//                     onClick={() => addToCart(item.name)}
//                     disabled={cart.includes(item.name) || item.inStock === false}
//                   >
//                     {cart.includes(item.name)
//                       ? 'Added to Cart'
//                       : item.inStock === false
//                       ? 'Unavailable'
//                       : 'Add to Cart'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <h4 className="font-medium text-gray-800 mb-4">Calamity Regions</h4>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//         {Object.entries(disasters).map(([key, disaster]) => (
//           <button
//             key={key}
//             onClick={() => handleRegionClick(key)}
//             className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors border border-gray-200 hover:border-gray-300"
//           >
//             <div className="flex items-start">
//               <MapPin className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
//               <div>
//                 <h5 className="font-medium text-gray-800 text-sm">{disaster.region}</h5>
//                 <p className="text-xs text-gray-600 mt-1">{disaster.calamity}</p>
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisasterSection;