import React, { useState } from 'react';
import { Map, MapPin, Layers, Filter, TrendingUp, TrendingDown, Users, Target } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const GeographicView: React.FC = () => {
  const { marketData, distributors, regionalPerformance } = useData();
  const [selectedView, setSelectedView] = useState<'regions' | 'states' | 'distributors'>('regions');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = ['North India', 'West India', 'South India', 'East India'];
  
  const getRegionData = (region: string) => {
    const regionMarketData = marketData.filter(data => data.region === region);
    const regionDistributors = distributors.filter(d => d.region === region);
    
    return {
      states: regionMarketData.length,
      distributors: regionDistributors.length,
      avgMarketShare: regionMarketData.reduce((acc, data) => acc + data.marketShare, 0) / regionMarketData.length,
      totalConsumers: regionMarketData.reduce((acc, data) => acc + data.consumers, 0),
      avgGrowth: regionMarketData.reduce((acc, data) => acc + data.growth, 0) / regionMarketData.length
    };
  };

  const getStatesByRegion = (region: string) => {
    return marketData.filter(data => data.region === region);
  };

  const getDistributorsByRegion = (region: string) => {
    return distributors.filter(d => d.region === region);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
            Geographic Intelligence
          </h1>
          <p className="text-gray-600">
            Multi-layered geographic analysis across states, regions, and distributor networks
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setSelectedView('regions')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'regions' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Regions
            </button>
            <button
              onClick={() => setSelectedView('states')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'states' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              States
            </button>
            <button
              onClick={() => setSelectedView('distributors')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'distributors' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Distributors
            </button>
          </div>
        </div>
      </div>

      {selectedView === 'regions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((region) => {
            const data = getRegionData(region);
            return (
              <div 
                key={region}
                onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Map className="h-6 w-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-black">{region}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {data.avgGrowth >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                    <span className={`font-medium ${
                      data.avgGrowth >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {data.avgGrowth >= 0 ? '+' : ''}{data.avgGrowth.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Market Share</p>
                    <p className="text-xl font-bold text-black font-space-grotesk">
                      {data.avgMarketShare.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Consumers</p>
                    <p className="text-xl font-bold text-black font-space-grotesk">
                      {(data.totalConsumers / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">States</p>
                    <p className="text-xl font-bold text-black font-space-grotesk">
                      {data.states}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Distributors</p>
                    <p className="text-xl font-bold text-black font-space-grotesk">
                      {data.distributors}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedView === 'states' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">State-wise Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.map((state) => (
              <div 
                key={`${state.region}-${state.state}`}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <h4 className="font-medium text-black">{state.state}</h4>
                  </div>
                  <span className="text-xs text-gray-500">{state.region}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Market Share</span>
                    <span className="text-sm font-medium text-black">{state.marketShare}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Growth</span>
                    <span className={`text-sm font-medium ${
                      state.growth >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {state.growth >= 0 ? '+' : ''}{state.growth}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Consumers</span>
                    <span className="text-sm font-medium text-black">
                      {(state.consumers / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        state.marketShare >= 40 ? 'bg-emerald-500' :
                        state.marketShare >= 30 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${state.marketShare}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'distributors' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Distributor Network Map</h3>
          
          <div className="space-y-6">
            {regions.map((region) => {
              const regionDistributors = getDistributorsByRegion(region);
              if (regionDistributors.length === 0) return null;
              
              return (
                <div key={region} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-black">{region}</h4>
                    <span className="text-sm text-gray-600">
                      {regionDistributors.length} distributors
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {regionDistributors.map((distributor) => (
                      <div 
                        key={distributor.id}
                        className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-black text-sm">{distributor.name}</h5>
                          <div className={`w-3 h-3 rounded-full ${
                            distributor.efficiencyScore === 'green' ? 'bg-emerald-500' :
                            distributor.efficiencyScore === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                          }`} />
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{distributor.city}, {distributor.state}</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Orders: {distributor.totalOrders}</span>
                          <span className="text-gray-600">Score: {distributor.motivationScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedRegion && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">
            {selectedRegion} - Detailed View
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-black mb-4">States in {selectedRegion}</h4>
              <div className="space-y-3">
                {getStatesByRegion(selectedRegion).map((state) => (
                  <div 
                    key={`${state.region}-${state.state}`}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-black">{state.state}</span>
                      <span className="text-sm text-gray-600">{state.marketShare}% share</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-black mb-4">Distributors in {selectedRegion}</h4>
              <div className="space-y-3">
                {getDistributorsByRegion(selectedRegion).map((distributor) => (
                  <div 
                    key={distributor.id}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-black">{distributor.name}</span>
                        <p className="text-xs text-gray-600">{distributor.city}, {distributor.state}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        distributor.efficiencyScore === 'green' ? 'bg-emerald-500' :
                        distributor.efficiencyScore === 'amber' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeographicView;