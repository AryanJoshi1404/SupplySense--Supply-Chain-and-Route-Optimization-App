import React, { useEffect, useState } from 'react';
import { TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import ItemGrid from './ItemGrid';
import DisasterSection from './DisasterSection';

const RecommendationsSection: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  // const [essentials, setEssentials] = useState<any[]>([]);
  const [trends, setTrends] = useState<any[]>([]);

  // Fetch data on load
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/recommendations')
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.status === 'success') {
  //         const allItems = [...data.data.essentials, ...data.data.trends];
  //         setEssentials(allItems);
  //         // setTrends(data.data.trends);
  //       }
  //     })
  //     .catch(err => {
  //       console.error("Failed to load recommendations", err);
  //     });
  // }, []);
  const [essentials, setEssentials] = useState<any[]>([]);
  const [sortedEssentials, setSortedEssentials] = useState<any[]>([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/recommendations`)
  // fetch(`http://localhost:5000/api/recommendations`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const allItems = [...data.data.essentials, ...data.data.trends];

        // Randomize but balance High/Medium/Low demand for initial view
        const demandBuckets = {
          High: allItems.filter(item => item.demand === 'High'),
          Medium: allItems.filter(item => item.demand === 'Medium'),
          Low: allItems.filter(item => item.demand === 'Low'),
        };

        let mixed = [
          ...demandBuckets.High.slice(0, 4),
          ...demandBuckets.Medium.slice(0, 4),
          ...demandBuckets.Low.slice(0, 2),
        ];
        if (mixed.length < 10) {
          const usedIds = new Set(mixed.map(item => item.id));
          const remaining = allItems.filter(item => !usedIds.has(item.id));
          mixed = [...mixed, ...remaining.slice(0, 10 - mixed.length)];
}

        // Shuffle the mixed items
        const shuffled = mixed.sort(() => Math.random() - 0.5);
        setEssentials(shuffled);

        // Sorted list for expanded view
          const sorted = allItems.sort((a, b) => {
          const order: Record<'High' | 'Medium' | 'Low', number> = { High: 0, Medium: 1, Low: 2 };

          const demandA = a.demand as 'High' | 'Medium' | 'Low';
          const demandB = b.demand as 'High' | 'Medium' | 'Low';
          // const demandA = order[a.demand as keyof typeof order] ?? 3; // fallback to 3 if not found
          // const demandB = order[b.demand as keyof typeof order] ?? 3; // fallback to 3 if not found

          return order[demandA] - order[demandB];
        });

        setSortedEssentials(sorted);
      }
    })
    .catch(err => {
      console.error("Failed to load recommendations", err);
    });
}, []);


  const handleSectionClick = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Essentials & Seasonal Items */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleSectionClick('essentials')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Essentials & Seasonal
              </h3>
              <span className="text-sm text-gray-500">Click to expand</span>
            </div>
            <div className="overflow-hidden">
              <ItemGrid items={essentials} compact />
            </div>
          </div>
        </div>

        {/* Trend-Based Items */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleSectionClick('trends')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Trend-Based Items
              </h3>
              <span className="text-sm text-gray-500">Click to expand</span>
            </div>
            <div className="overflow-hidden">
              <ItemGrid items={trendItems.slice(0, 10)} compact />
            </div>
          </div>
        </div>

        {/* Disaster Section remains unchanged */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Natural Disasters & Calamities
            </h3>
            <DisasterSection />
          </div>
        </div>
      </div>

      {/* Expanded Modal */}
      {expandedSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {expandedSection === 'essentials' ? 'Essential & Seasonal Items' : 'Trending Items'}
                </h2>
                <button
                  onClick={() => setExpandedSection(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
              <div className="overflow-hidden">
                <ItemGrid 
                  items={expandedSection === 'essentials' ? sortedEssentials : trendItems} 
                  expanded 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsSection;



// import React, { useState } from 'react';
// import { TrendingUp, Shield, AlertTriangle } from 'lucide-react';
// import ItemGrid from './ItemGrid';
// import DisasterSection from './DisasterSection';

// const RecommendationsSection: React.FC = () => {
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);

//   const essentialItems = [
//     { id: '1', name: 'Premium Basmati Rice', category: 'Staples', demand: 'High', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop&auto=format' },
//     { id: '2', name: 'Organic Wheat Flour', category: 'Staples', demand: 'High', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&auto=format' },
//     { id: '3', name: 'Extra Virgin Olive Oil', category: 'Essentials', demand: 'Medium', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop&auto=format' },
//     { id: '4', name: 'Raw Cane Sugar', category: 'Essentials', demand: 'Medium', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&auto=format' },
//     { id: '5', name: 'Himalayan Pink Salt', category: 'Essentials', demand: 'Low', image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=400&h=300&fit=crop&auto=format' },
//     { id: '6', name: 'Fresh Organic Milk', category: 'Dairy', demand: 'High', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop&auto=format' },
//     { id: '7', name: 'Free Range Eggs', category: 'Protein', demand: 'High', image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400&h=300&fit=crop&auto=format' },
//     { id: '8', name: 'Artisan Sourdough Bread', category: 'Bakery', demand: 'High', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop&auto=format' },
//     { id: '9', name: 'Bamboo Toilet Paper', category: 'Hygiene', demand: 'Medium', image: 'https://images.unsplash.com/photo-1584556326561-85c8f6862b6f?w=400&h=300&fit=crop&auto=format' },
//     { id: '10', name: 'Natural Soap Bars', category: 'Hygiene', demand: 'Medium', image: 'https://images.unsplash.com/photo-1591086916191-f6a7c23b3b69?w=400&h=300&fit=crop&auto=format' },
//     { id: '11', name: 'Organic Honey', category: 'Natural', demand: 'High', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop&auto=format' },
//     { id: '12', name: 'Coconut Oil', category: 'Cooking', demand: 'Medium', image: 'https://images.unsplash.com/photo-1520950237264-6b52ef0a7b8c?w=400&h=300&fit=crop&auto=format' },
//     { id: '13', name: 'Organic Pasta', category: 'Staples', demand: 'High', image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop&auto=format' },
//     { id: '14', name: 'Premium Tea Collection', category: 'Beverages', demand: 'Medium', image: 'https://images.unsplash.com/photo-1594736797933-d0cab1b9a3b1?w=400&h=300&fit=crop&auto=format' },
//     { id: '15', name: 'Artisan Coffee Beans', category: 'Beverages', demand: 'High', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop&auto=format' },
//     { id: '16', name: 'Organic Vegetables', category: 'Fresh', demand: 'High', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&auto=format' },
//     { id: '17', name: 'Seasonal Fruits', category: 'Fresh', demand: 'High', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop&auto=format' },
//     { id: '18', name: 'Whole Grain Cereals', category: 'Breakfast', demand: 'Medium', image: 'https://images.unsplash.com/photo-1574168611821-5d2d1b4c5b8e?w=400&h=300&fit=crop&auto=format' },
//     { id: '19', name: 'Natural Yogurt', category: 'Dairy', demand: 'High', image: 'https://images.unsplash.com/photo-1571212515416-6d017c5e5c5e?w=400&h=300&fit=crop&auto=format' },
//     { id: '20', name: 'Herbal Supplements', category: 'Health', demand: 'Medium', image: 'https://images.unsplash.com/photo-1584362917165-526f080a4d84?w=400&h=300&fit=crop&auto=format' }
//   ];

  const trendItems = [
    { id: '21', name: 'Superfood Quinoa Bowl', category: 'Health', demand: 'Rising', image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpbm9hJTIwYm93bHxlbnwwfHwwfHx8MA%3D%3D' },
    { id: '22', name: 'Oat Milk Barista', category: 'Alternative', demand: 'Rising', image: 'https://images.unsplash.com/photo-1576343209181-360ef7d9ad5c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '23', name: 'Plant Protein Powders', category: 'Fitness', demand: 'Rising', image: 'https://images.unsplash.com/photo-1693290355370-51de196c6d89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGxhbnQlMjBwcm90ZWluJTIwYmFyc3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: '24', name: 'Matcha Green Tea', category: 'Beverage', demand: 'Rising', image: 'https://images.unsplash.com/photo-1565117711038-1e0a80eed005?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1hdGNoYXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: '25', name: 'Probiotic Kombucha', category: 'Wellness', demand: 'Rising', image: 'https://images.unsplash.com/photo-1630363346395-f2d1ae71b5bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvYmlvdGljJTIwa29tYnVjaGF8ZW58MHx8MHx8fDA%3D' },
    { id: '26', name: 'Keto-Friendly Snacks', category: 'Diet', demand: 'Rising', image: 'https://images.unsplash.com/photo-1593967858253-7eeb1c661706?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2V0byUyMHNuYWNrc3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: '27', name: 'Immunity Shots', category: 'Health', demand: 'Rising', image: 'https://images.unsplash.com/photo-1599556147783-7edf67c327e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGltbXVuaXR5JTIwc2hvdHN8ZW58MHx8MHx8fDA%3D' },
    { id: '28', name: 'Eco-Friendly Packaging', category: 'Sustainable', demand: 'Rising', image: 'https://planetpristine.com/wp-content/uploads/2024/01/sustainable_packaging_17609533-01dd-405c-a205-9e06ddf4ebe9.png' },
    { id: '29', name: 'Gourmet Ready Meals', category: 'Convenience', demand: 'Rising', image: 'https://images.unsplash.com/photo-1627955280978-f54fff2f316a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z291cm1ldCUyMHJlYWR5JTIwbWVhbHN8ZW58MHx8MHx8fDA%3D' },
    { id: '30', name: 'Air Fryer Accessories', category: 'Kitchen', demand: 'Rising', image: 'https://cdn.hughes.co.uk/live/media/image/5c/68/97/rus-26510g.jpg' },
    { id: '31', name: 'Adaptogenic Herbs', category: 'Wellness', demand: 'Rising', image: 'https://images.unsplash.com/photo-1556739478-a24ae3c30f6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFlc3RoZXRpYyUyMHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: '32', name: 'Fermented Foods', category: 'Gut Health', demand: 'Rising', image: 'https://images.unsplash.com/photo-1610602925036-1d81bb50065a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVybWVudGVkJTIwZm9vZHN8ZW58MHx8MHx8fDA%3D' },
    { id: '33', name: 'Zero-Waste Products', category: 'Eco', demand: 'Rising', image: 'https://images.unsplash.com/photo-1633878353720-7a49a4a3d0ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8emVybyUyMHdhc3RlJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D' },
    { id: '34', name: 'Collagen Supplements', category: 'Beauty', demand: 'Rising', image: 'https://images.unsplash.com/photo-1627652284604-b17cd9520b9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29sbGFnZW4lMjBzdXBwbGVtZW50c3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: '35', name: 'Mushroom Coffee', category: 'Functional', demand: 'Rising', image: 'https://images.unsplash.com/photo-1723910065934-34751600e6a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaHJvb20lMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D' },
    { id: '36', name: 'CBD Wellness Products', category: 'Wellness', demand: 'Rising', image: 'https://images.unsplash.com/photo-1670850757263-6efc07d410f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpdGFtaW4lMjBzdXBwbGVtZW50c3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: '37', name: 'Meal Prep Containers', category: 'Convenience', demand: 'Rising', image: 'https://images.unsplash.com/photo-1562571708-527276a391ac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '38', name: 'Artisan Chocolate', category: 'Gourmet', demand: 'Rising', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop&auto=format' },
    { id: '39', name: 'Smart Water Bottles', category: 'Tech', demand: 'Rising', image: 'https://images.unsplash.com/photo-1695793303287-d5f4005ed721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjBib3R0bGVzfGVufDB8fDB8fHww' },
    { id: '40', name: 'Sustainable Utensils', category: 'Eco', demand: 'Rising', image: 'https://images.unsplash.com/photo-1650964336783-fd8c0c241b13?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ];

//   const handleSectionClick = (section: string) => {
//     setExpandedSection(expandedSection === section ? null : section);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* Essentials & Seasonal Items */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div 
//             className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//             onClick={() => handleSectionClick('essentials')}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                 <Shield className="h-5 w-5 mr-2 text-blue-600" />
//                 Essentials & Seasonal
//               </h3>
//               <span className="text-sm text-gray-500">Click to expand</span>
//             </div>
//             <div className="overflow-hidden">
//               <ItemGrid items={essentialItems.slice(0, 10)} compact />
//             </div>
//           </div>
//         </div>

//         {/* Trend-Based Items */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div 
//             className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//             onClick={() => handleSectionClick('trends')}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                 <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
//                 Trend-Based Items
//               </h3>
//               <span className="text-sm text-gray-500">Click to expand</span>
//             </div>
//             <div className="overflow-hidden">
//               <ItemGrid items={trendItems.slice(0, 10)} compact />
//             </div>
//           </div>
//         </div>

//         {/* Natural Disasters & Calamities */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="p-4">
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
//               <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
//               Natural Disasters & Calamities
//             </h3>
//             <DisasterSection />
//           </div>
//         </div>
//       </div>

//       {/* Expanded Modal */}
//       {expandedSection && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {expandedSection === 'essentials' ? 'Essential & Seasonal Items' : 'Trending Items'}
//                 </h2>
//                 <button
//                   onClick={() => setExpandedSection(null)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="overflow-hidden">
//                 <ItemGrid 
//                   items={expandedSection === 'essentials' ? essentialItems : trendItems} 
//                   expanded 
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecommendationsSection;