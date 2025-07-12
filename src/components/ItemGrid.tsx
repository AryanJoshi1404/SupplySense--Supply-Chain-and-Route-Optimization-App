import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  category: string;
  demand: string;
  image: string;
}

interface ItemGridProps {
  items: Item[];
  compact?: boolean;
  expanded?: boolean;
}


const ItemGrid: React.FC<ItemGridProps> = ({ items, compact = false, expanded = false }) => {
  console.log('ItemGrid items:', items);
  const getDemandIcon = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high':
      case 'rising':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'low':
        return <TrendingDown className="h-3 w-3 text-red-600" />;
      default:
        return <Minus className="h-3 w-3 text-yellow-600" />;
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high':
      case 'rising':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'low':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  // Improved responsive grid classes with better breakpoints
  const gridCols = expanded 
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8' 
    : compact 
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5' 
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const itemSize = compact ? 'h-20' : expanded ? 'h-32' : 'h-24';

  return (
    <div className={`grid ${gridCols} gap-2 max-w-full`}>
      {items.map((item) => (
        <div 
          key={item.id} 
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group hover:scale-105 min-w-0"
        >
          <div className={`bg-gray-100 ${itemSize} w-full`}>
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="p-2">
            <h4 className="font-medium text-gray-800 text-xs mb-1 line-clamp-2 leading-tight truncate">{item.name}</h4>
            <p className="text-xs text-gray-500 mb-1 truncate">{item.category}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-1.5 py-0.5 rounded-full border ${getDemandColor(item.demand)} truncate`}>
                {item.demand}
              </span>
              {getDemandIcon(item.demand)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;