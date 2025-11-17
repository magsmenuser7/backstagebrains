import React from 'react';
import { Package, Clock, DollarSign, TrendingUp, Award, Trophy, Medal, Target, CheckCircle } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const DistributorPerformance: React.FC = () => {
  const { user } = useAuth();
  const { distributors, orders } = useData();
  
  const userDistributor = distributors.find(d => d.region === user?.region);
  const userOrders = orders.filter(order => 
    distributors.find(d => d.name === order.distributorName)?.region === user?.region
  );

  if (!userDistributor) return null;

  const achievementRate = (userDistributor.monthlyAchievement / userDistributor.monthlyTarget) * 100;

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'gold': return <Trophy className="h-6 w-6 text-amber-500" />;
      case 'silver': return <Medal className="h-6 w-6 text-gray-500" />;
      case 'bronze': return <Award className="h-6 w-6 text-amber-700" />;
      default: return <Target className="h-6 w-6 text-gray-400" />;
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center p-6 bg-gradient-to-br from-black to-gray-800 text-white rounded-xl">
          <div className={`p-4 rounded-full ${getBadgeColor(userDistributor.performanceBadge)} mx-auto mb-4 w-16 h-16 flex items-center justify-center`}>
            {getBadgeIcon(userDistributor.performanceBadge)}
          </div>
          <h4 className="text-xl font-bold mb-2">Your Performance Badge</h4>
          <p className="text-3xl font-bold font-space-grotesk mb-2">{userDistributor.motivationScore}</p>
          <p className="text-sm opacity-75">Motivation Score</p>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-blue-600" />
            <h4 className="font-medium text-black">Monthly Target Progress</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Target</span>
              <span className="font-medium text-black">₹{(userDistributor.monthlyTarget / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Achieved</span>
              <span className="font-medium text-black">₹{(userDistributor.monthlyAchievement / 1000).toFixed(0)}K</span>
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
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Order Timeliness</p>
          <p className="text-xl font-bold text-black font-space-grotesk">{userDistributor.orderTimeliness}%</p>
        </div>
        <div className="text-center p-4 bg-emerald-50 rounded-lg">
          <CheckCircle className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Payment Regularity</p>
          <p className="text-xl font-bold text-black font-space-grotesk">{userDistributor.paymentRegularity}%</p>
        </div>
        <div className="text-center p-4 bg-amber-50 rounded-lg">
          <Package className="h-6 w-6 text-amber-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Current Stock</p>
          <p className="text-xl font-bold text-black font-space-grotesk">{userDistributor.currentStock}</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Turnover Speed</p>
          <p className="text-xl font-bold text-black font-space-grotesk">{userDistributor.turnoverSpeed} days</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Recent Orders</h3>
        
        <div className="space-y-3">
          {userOrders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-black">{order.id}</p>
                <p className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-black">₹{(order.totalValue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-600 capitalize">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistributorPerformance;