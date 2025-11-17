import React from 'react';
import { BarChart3, Users, TrendingUp, Globe, Eye, Trophy } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const MarketInsights: React.FC = () => {
  const { marketData } = useData();

  const totalConsumers = marketData.reduce((acc, region) => acc + region.consumers, 0);
  const avgMarketShare = marketData.reduce((acc, region) => acc + region.marketShare, 0) / marketData.length;
  const topPerformingRegion = marketData.reduce((prev, current) => 
    prev.marketShare > current.marketShare ? prev : current
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
          Market Insights
        </h1>
        <p className="text-gray-600">
          Consumer behavior analysis and competitive market intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Total Consumers</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {(totalConsumers / 1000).toFixed(0)}K
          </p>
          <p className="text-sm text-gray-600 mt-1">Active customers</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Avg Market Share</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {avgMarketShare.toFixed(1)}%
          </p>
          <p className="text-sm text-emerald-600 mt-1">Across all regions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="h-6 w-6 text-amber-600" />
            <h3 className="font-medium text-gray-900">Top Region</h3>
          </div>
          <p className="text-lg font-bold text-black">{topPerformingRegion.region}</p>
          <p className="text-sm text-amber-600 mt-1">{topPerformingRegion.marketShare}% share</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-6 w-6 text-purple-600" />
            <h3 className="font-medium text-gray-900">Market Penetration</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">76%</p>
          <p className="text-sm text-gray-600 mt-1">Of target segments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Consumer Acquisition Trends</h3>
          
          <div className="space-y-4">
            {marketData.map((region, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-black">{region.region}</h4>
                  <div className="flex items-center space-x-2">
                    {region.growth >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                    )}
                    <span className={`text-sm font-medium ${
                      region.growth >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {region.growth >= 0 ? '+' : ''}{region.growth}%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Consumers</p>
                    <p className="font-bold text-black font-space-grotesk">
                      {region.consumers.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Market Share</p>
                    <p className="font-bold text-black font-space-grotesk">
                      {region.marketShare}%
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Market Penetration</span>
                    <span>{region.marketShare}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${region.marketShare}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Competitive Analysis</h3>
          
          <div className="space-y-4">
            {marketData.map((region, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-black">{region.region}</h4>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {region.competitorPresence}% competitor presence
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Our Market Share</span>
                      <span className="font-medium text-black">{region.marketShare}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${region.marketShare}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Competitor Presence</span>
                      <span className="font-medium text-red-600">{region.competitorPresence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${region.competitorPresence}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Market Opportunity</span>
                      <span className="font-medium text-emerald-600">
                        {(100 - region.marketShare - region.competitorPresence).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${100 - region.marketShare - region.competitorPresence}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;