import React from 'react';
import { useData } from '../../contexts/DataContext';

const RegionalHeatmap: React.FC = () => {
  const { marketData } = useData();

  const getIntensityColor = (marketShare: number) => {
    if (marketShare >= 40) return 'bg-emerald-500';
    if (marketShare >= 30) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getTextColor = (marketShare: number) => {
    if (marketShare >= 40) return 'text-emerald-700';
    if (marketShare >= 30) return 'text-amber-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-black mb-6 font-montserrat">Regional Performance Heatmap</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {marketData.map((region) => (
          <div 
            key={region.region} 
            className="relative p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-black">{region.region}</h4>
              <div className={`w-3 h-3 rounded-full ${getIntensityColor(region.marketShare)}`} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Market Share</span>
                <span className={`text-sm font-medium ${getTextColor(region.marketShare)}`}>
                  {region.marketShare}%
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Consumers</span>
                <span className="text-sm font-medium text-black">
                  {region.consumers.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Growth</span>
                <span className={`text-sm font-medium ${
                  region.growth >= 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {region.growth >= 0 ? '+' : ''}{region.growth}%
                </span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${getIntensityColor(region.marketShare)} h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${region.marketShare}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span>High Performance (40%+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span>Moderate (30-40%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Needs Attention (&lt;30%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalHeatmap;