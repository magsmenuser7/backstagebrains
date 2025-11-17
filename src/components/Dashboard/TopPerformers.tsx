import React from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const TopPerformers: React.FC = () => {
  const { regionalPerformance } = useData();

  const topPerformers = regionalPerformance
    .filter(region => region.performance === 'top')
    .sort((a, b) => b.marketShare - a.marketShare)
    .slice(0, 3);

  const getBadgeIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="h-5 w-5 text-amber-600" />;
      case 1: return <Medal className="h-5 w-5 text-gray-500" />;
      case 2: return <Award className="h-5 w-5 text-amber-700" />;
      default: return <Award className="h-5 w-5 text-gray-400" />;
    }
  };

  const getBadgeColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white';
      case 1: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 2: return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="h-6 w-6 text-amber-600" />
        <h3 className="text-lg font-bold text-black font-montserrat">Top Performing Regions</h3>
      </div>
      
      <div className="space-y-4">
        {topPerformers.map((region, index) => (
          <div 
            key={`${region.region}-${region.state}`}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${getBadgeColor(index)}`}>
                {getBadgeIcon(index)}
              </div>
              <div>
                <h4 className="font-medium text-black">{region.state}</h4>
                <p className="text-sm text-gray-600">{region.region}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Market Share</p>
                  <p className="text-lg font-bold text-black font-space-grotesk">
                    {region.marketShare}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Growth</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <p className="text-lg font-bold text-emerald-600 font-space-grotesk">
                      +{region.growth}%
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Distributors</p>
                  <p className="text-lg font-bold text-black font-space-grotesk">
                    {region.distributorCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;