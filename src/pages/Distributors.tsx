import React, { useState } from 'react';
import { Users, TrendingUp, TrendingDown, Clock, DollarSign, Package, Star, Trophy, Medal, Award, Crown, Target, Zap } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const Distributors: React.FC = () => {
  const { user } = useAuth();
  const { distributors } = useData();
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'performance' | 'gamification'>('performance');

  const getEfficiencyColor = (score: string) => {
    switch (score) {
      case 'green': return 'text-emerald-600 bg-emerald-100';
      case 'amber': return 'text-amber-600 bg-amber-100';
      case 'red': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreIcon = (score: string) => {
    switch (score) {
      case 'green': return <TrendingUp className="h-5 w-5" />;
      case 'amber': return <Clock className="h-5 w-5" />;
      case 'red': return <TrendingDown className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

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

  const getMotivationColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-100';
    if (score >= 70) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  // Filter distributors based on user role
  const filteredDistributors = user?.role === 'distributor' 
    ? distributors.filter(d => d.region === user.region)
    : distributors;

  const selectedDistributorData = distributors.find(d => d.id === selectedDistributor);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
            {user?.role === 'distributor' ? 'My Performance' : 'Distributor Analytics'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'distributor' 
              ? 'Your performance metrics and achievement tracking'
              : 'Monitor distributor performance and efficiency across all regions'
            }
          </p>
        </div>
        
        {user?.role !== 'distributor' && (
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('performance')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'performance' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setViewMode('gamification')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'gamification' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Gamification
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Total Distributors</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{filteredDistributors.length}</p>
          <p className="text-sm text-gray-600 mt-1">Across 4 regions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Star className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">High Performers</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {filteredDistributors.filter(d => d.efficiencyScore === 'green').length}
          </p>
          <p className="text-sm text-emerald-600 mt-1">Excellent efficiency</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-6 w-6 text-amber-600" />
            <h3 className="font-medium text-gray-900">Avg Order Value</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            ₹{Math.round(filteredDistributors.reduce((acc, d) => acc + d.avgOrderValue, 0) / filteredDistributors.length / 1000)}K
          </p>
          <p className="text-sm text-gray-600 mt-1">Per order</p>
        </div>
      </div>

      {viewMode === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-black font-montserrat mb-6">Distributor Overview</h3>
            
            <div className="space-y-4">
              {filteredDistributors.map((distributor) => (
                <div 
                  key={distributor.id}
                  onClick={() => setSelectedDistributor(
                    selectedDistributor === distributor.id ? null : distributor.id
                  )}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getEfficiencyColor(distributor.efficiencyScore)}`}>
                        {getScoreIcon(distributor.efficiencyScore)}
                      </div>
                      <div>
                        <h4 className="font-medium text-black">{distributor.name}</h4>
                        <p className="text-sm text-gray-600">{distributor.city}, {distributor.state}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-black font-space-grotesk">
                        {distributor.totalOrders}
                      </p>
                      <p className="text-sm text-gray-600">orders</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Frequency</p>
                      <p className="text-sm font-medium text-black">{distributor.orderFrequency} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Turnover</p>
                      <p className="text-sm font-medium text-black">{distributor.turnoverSpeed} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment</p>
                      <p className="text-sm font-medium text-black">{distributor.paymentCycle} days</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedDistributorData && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-black font-montserrat mb-6">
                {selectedDistributorData.name} - Detailed Analytics
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-black font-space-grotesk">
                      {selectedDistributorData.totalOrders}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold text-black font-space-grotesk">
                      ₹{(selectedDistributorData.avgOrderValue / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Order Frequency</span>
                    <span className="font-medium text-black">Every {selectedDistributorData.orderFrequency} days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Stock Turnover Speed</span>
                    <span className="font-medium text-black">{selectedDistributorData.turnoverSpeed} days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Payment Cycle</span>
                    <span className="font-medium text-black">{selectedDistributorData.paymentCycle} days</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Last Order</span>
                    <span className="font-medium text-black">
                      {new Date(selectedDistributorData.lastOrderDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${getEfficiencyColor(selectedDistributorData.efficiencyScore)}`}>
                  <div className="flex items-center space-x-2">
                    {getScoreIcon(selectedDistributorData.efficiencyScore)}
                    <span className="font-medium">
                      {selectedDistributorData.efficiencyScore === 'green' ? 'Excellent Performance' :
                       selectedDistributorData.efficiencyScore === 'amber' ? 'Moderate Performance' :
                       'Requires Attention'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {viewMode === 'gamification' && user?.role !== 'distributor' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Distributor Motivation Center</h3>
          
          <div className="space-y-4">
            {filteredDistributors.map((distributor) => {
              const achievementRate = (distributor.monthlyAchievement / distributor.monthlyTarget) * 100;
              
              return (
                <div 
                  key={distributor.id}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${getBadgeColor(distributor.performanceBadge)}`}>
                        {getBadgeIcon(distributor.performanceBadge)}
                      </div>
                      <div>
                        <h4 className="font-medium text-black">{distributor.name}</h4>
                        <p className="text-sm text-gray-600">{distributor.city}, {distributor.state}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMotivationColor(distributor.motivationScore)}`}>
                        {distributor.motivationScore} Score
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Timeliness</p>
                      <p className="text-sm font-bold text-black">{distributor.orderTimeliness}%</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Zap className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Response</p>
                      <p className="text-sm font-bold text-black">{distributor.responseSpeed}h</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Payment</p>
                      <p className="text-sm font-bold text-black">{distributor.paymentRegularity}%</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Users className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">Engagement</p>
                      <p className="text-sm font-bold text-black">{distributor.engagementLevel}%</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Monthly Achievement</span>
                      <span className={`text-sm font-medium ${
                        achievementRate >= 100 ? 'text-emerald-600' :
                        achievementRate >= 80 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {achievementRate.toFixed(0)}% of target
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          achievementRate >= 100 ? 'bg-emerald-500' :
                          achievementRate >= 80 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(achievementRate, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>₹{(distributor.monthlyTarget / 1000).toFixed(0)}K target</span>
                      <span>₹{(distributor.monthlyAchievement / 1000).toFixed(0)}K achieved</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {user?.role === 'distributor' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Your Performance Dashboard</h3>
          
          {filteredDistributors.map((distributor) => {
            const achievementRate = (distributor.monthlyAchievement / distributor.monthlyTarget) * 100;
            
            return (
              <div 
                key={distributor.id}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-black to-gray-800 text-white rounded-xl">
                    <div className={`p-4 rounded-full ${getBadgeColor(distributor.performanceBadge)} mx-auto mb-4 w-16 h-16 flex items-center justify-center`}>
                      {getBadgeIcon(distributor.performanceBadge)}
                    </div>
                    <h4 className="text-xl font-bold mb-2">Your Performance Badge</h4>
                    <p className="text-3xl font-bold font-space-grotesk mb-2">{distributor.motivationScore}</p>
                    <p className="text-sm opacity-75">Motivation Score</p>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <Target className="h-6 w-6 text-blue-600" />
                      <h4 className="font-medium text-black">Monthly Target</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target</span>
                        <span className="font-medium text-black">₹{(distributor.monthlyTarget / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Achieved</span>
                        <span className="font-medium text-black">₹{(distributor.monthlyAchievement / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            achievementRate >= 100 ? 'bg-emerald-500' :
                            achievementRate >= 80 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(achievementRate, 100)}%` }}
                        />
                      </div>
                      <p className="text-center text-sm font-medium">
                        {achievementRate.toFixed(0)}% Complete
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Order Timeliness</p>
                      <p className="text-xl font-bold text-black font-space-grotesk">{distributor.orderTimeliness}%</p>
                    </div>
                  </div>
                  <div>
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                      <Zap className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Response Speed</p>
                      <p className="text-xl font-bold text-black font-space-grotesk">{distributor.responseSpeed}h</p>
                    </div>
                  </div>
                  <div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <DollarSign className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Payment Regularity</p>
                      <p className="text-xl font-bold text-black font-space-grotesk">{distributor.paymentRegularity}%</p>
                    </div>
                  </div>
                  <div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Engagement Level</p>
                      <p className="text-xl font-bold text-black font-space-grotesk">{distributor.engagementLevel}%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Distributors;