import React, { useState } from 'react';
import { Trophy, Medal, Award, Star, TrendingUp, Target, Users, Crown } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Leaderboards: React.FC = () => {
  const { distributors, regionalPerformance } = useData();
  const [selectedBoard, setSelectedBoard] = useState<'distributors' | 'regions'>('distributors');

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'gold': return <Crown className="h-5 w-5 text-amber-500" />;
      case 'silver': return <Medal className="h-5 w-5 text-gray-500" />;
      case 'bronze': return <Award className="h-5 w-5 text-amber-700" />;
      default: return <Star className="h-5 w-5 text-gray-400" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'gold': return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white';
      case 'silver': return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 'bronze': return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const topDistributors = [...distributors]
    .sort((a, b) => b.motivationScore - a.motivationScore)
    .slice(0, 10);

  const topRegions = [...regionalPerformance]
    .sort((a, b) => b.marketShare - a.marketShare)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
            Performance Leaderboards
          </h1>
          <p className="text-gray-600">
            Gamified performance tracking and recognition system
          </p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
          <button
            onClick={() => setSelectedBoard('distributors')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedBoard === 'distributors' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Distributors
          </button>
          <button
            onClick={() => setSelectedBoard('regions')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedBoard === 'regions' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Regions
          </button>
        </div>
      </div>

      {selectedBoard === 'distributors' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="h-6 w-6 text-amber-600" />
              <h3 className="text-lg font-bold text-black font-montserrat">Top Performers</h3>
            </div>
            
            <div className="space-y-4">
              {topDistributors.slice(0, 5).map((distributor, index) => (
                <div 
                  key={distributor.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-600 w-6">#{index + 1}</span>
                      <div className={`p-2 rounded-full ${getBadgeColor(distributor.performanceBadge)}`}>
                        {getBadgeIcon(distributor.performanceBadge)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-black">{distributor.name}</h4>
                      <p className="text-sm text-gray-600">{distributor.city}, {distributor.state}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-black font-space-grotesk">
                      {distributor.motivationScore}
                    </p>
                    <p className="text-sm text-gray-600">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-bold text-black font-montserrat">Achievement Tracking</h3>
            </div>
            
            <div className="space-y-4">
              {distributors.map((distributor) => {
                const achievementRate = (distributor.monthlyAchievement / distributor.monthlyTarget) * 100;
                return (
                  <div key={distributor.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-black">{distributor.name}</h4>
                      <span className={`text-sm font-medium ${
                        achievementRate >= 100 ? 'text-emerald-600' :
                        achievementRate >= 80 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {achievementRate.toFixed(0)}%
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target: ₹{(distributor.monthlyTarget / 1000).toFixed(0)}K</span>
                        <span className="text-gray-600">Achieved: ₹{(distributor.monthlyAchievement / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            achievementRate >= 100 ? 'bg-emerald-500' :
                            achievementRate >= 80 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(achievementRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedBoard === 'regions' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Regional Championship</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-black mb-4 flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-amber-600" />
                <span>Top Performing Regions</span>
              </h4>
              <div className="space-y-3">
                {topRegions.slice(0, 3).map((region, index) => (
                  <div 
                    key={`${region.region}-${region.state}`}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-600 w-6">#{index + 1}</span>
                      <div>
                        <h5 className="font-medium text-black">{region.state}</h5>
                        <p className="text-sm text-gray-600">{region.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-black font-space-grotesk">
                        {region.marketShare}%
                      </p>
                      <p className="text-sm text-gray-600">Market Share</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-black mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <span>Fastest Growing</span>
              </h4>
              <div className="space-y-3">
                {[...regionalPerformance]
                  .sort((a, b) => b.growth - a.growth)
                  .slice(0, 3)
                  .map((region, index) => (
                    <div 
                      key={`${region.region}-${region.state}`}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-gray-600 w-6">#{index + 1}</span>
                        <div>
                          <h5 className="font-medium text-black">{region.state}</h5>
                          <p className="text-sm text-gray-600">{region.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600 font-space-grotesk">
                          +{region.growth}%
                        </p>
                        <p className="text-sm text-gray-600">Growth</p>
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

export default Leaderboards;