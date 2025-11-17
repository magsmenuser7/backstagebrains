import React from 'react';
import { Target, TrendingUp, Users, Calendar, Award, Trophy, Medal, Phone, Mail } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';

const SalesTargets: React.FC = () => {
  const { user } = useAuth();
  const { salesTargets, salesLeads } = useData();
  
  const userTargets = salesTargets.filter(target => 
    user?.role === 'sales_team' ? target.salesRepId === user.id : true
  );

  const userLeads = salesLeads.filter(lead =>
    user?.role === 'sales_team' ? lead.salesRepId === user.id : true
  );

  const totalTarget = userTargets.reduce((sum, target) => sum + target.target, 0);
  const totalAchieved = userTargets.reduce((sum, target) => sum + target.achieved, 0);
  const achievementRate = (totalAchieved / totalTarget) * 100;

  const getBadgeIcon = (rate: number) => {
    if (rate >= 100) return <Trophy className="h-5 w-5 text-amber-500" />;
    if (rate >= 80) return <Medal className="h-5 w-5 text-gray-500" />;
    return <Award className="h-5 w-5 text-amber-700" />;
  };

  const getBadgeColor = (rate: number) => {
    if (rate >= 100) return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white';
    if (rate >= 80) return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Monthly Target</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            ₹{(totalTarget / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Achievement</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            ₹{(totalAchieved / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-emerald-600 mt-1">{achievementRate.toFixed(1)}% of target</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-purple-600" />
            <h3 className="font-medium text-gray-900">Active Leads</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {userLeads.filter(lead => lead.status !== 'closed' && lead.status !== 'lost').length}
          </p>
          <p className="text-sm text-gray-600 mt-1">In pipeline</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-amber-600" />
            <h3 className="font-medium text-gray-900">Conversion Rate</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {userTargets.length > 0 ? userTargets[0].conversionRate : 0}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Lead to close</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Sales Performance Overview</h3>
        
        <div className="space-y-6">
          {userTargets.map((target) => (
            <div key={target.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${getBadgeColor((target.achieved / target.target) * 100)}`}>
                    {getBadgeIcon((target.achieved / target.target) * 100)}
                  </div>
                  <div>
                    <h4 className="font-medium text-black">{target.salesRepName}</h4>
                    <p className="text-sm text-gray-600">{target.region} • {target.period}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-black font-space-grotesk">
                    {((target.achieved / target.target) * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">Achievement</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Target</p>
                  <p className="text-sm font-bold text-black">₹{(target.target / 1000).toFixed(0)}K</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Achieved</p>
                  <p className="text-sm font-bold text-black">₹{(target.achieved / 1000).toFixed(0)}K</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Distributors</p>
                  <p className="text-sm font-bold text-black">{target.distributorsManaged}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Visits</p>
                  <p className="text-sm font-bold text-black">{target.visits}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress to Target</span>
                  <span className={`text-sm font-medium ${
                    (target.achieved / target.target) * 100 >= 100 ? 'text-emerald-600' :
                    (target.achieved / target.target) * 100 >= 80 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {((target.achieved / target.target) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      (target.achieved / target.target) * 100 >= 100 ? 'bg-emerald-500' :
                      (target.achieved / target.target) * 100 >= 80 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((target.achieved / target.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Recent Sales Activity</h3>
        
        <div className="space-y-3">
          {userLeads.slice(0, 5).map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  lead.status === 'closed' ? 'bg-emerald-500' :
                  lead.status === 'in_progress' ? 'bg-amber-500' :
                  lead.status === 'lost' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="font-medium text-black">{lead.distributorName}</p>
                  <p className="text-sm text-gray-600">{lead.city}, {lead.state}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-black">₹{(lead.estimatedValue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-gray-600 capitalize">{lead.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesTargets;