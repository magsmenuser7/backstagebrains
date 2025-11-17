import React, { useState } from 'react';
import { Target, Users, TrendingUp, Calendar, Award, Trophy, Medal, Phone, Mail, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const SalesTeam: React.FC = () => {
  const { user } = useAuth();
  const { salesTargets, salesLeads, distributors, distributorEngagement } = useData();
  const [selectedView, setSelectedView] = useState<'targets' | 'leads' | 'engagement' | 'leaderboard'>('targets');

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

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'border-l-blue-500 bg-blue-50';
      case 'in_progress': return 'border-l-amber-500 bg-amber-50';
      case 'closed': return 'border-l-emerald-500 bg-emerald-50';
      case 'lost': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getLeadStatusIcon = (status: string) => {
    switch (status) {
      case 'lead': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'closed': return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'lost': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
            Sales Performance Center
          </h1>
          <p className="text-gray-600">
            Track targets, manage leads, and monitor distributor engagement
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setSelectedView('targets')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'targets' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Targets
            </button>
            <button
              onClick={() => setSelectedView('leads')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'leads' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Leads
            </button>
            <button
              onClick={() => setSelectedView('engagement')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'engagement' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Engagement
            </button>
            <button
              onClick={() => setSelectedView('leaderboard')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedView === 'leaderboard' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              Leaderboard
            </button>
          </div>
        </div>
      </div>

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
            <CheckCircle className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Conversion Rate</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {userTargets.length > 0 ? userTargets[0].conversionRate : 0}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Lead to close</p>
        </div>
      </div>

      {selectedView === 'targets' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Sales Performance Tracking</h3>
          
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
                    <Plus className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">New Signups</p>
                    <p className="text-sm font-bold text-black">{target.newDistributorsAcquired}</p>
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
      )}

      {selectedView === 'leads' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-black font-montserrat">Sales Pipeline</h3>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Lead</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">New Leads</p>
              <p className="text-2xl font-bold text-black font-space-grotesk">
                {userLeads.filter(lead => lead.status === 'lead').length}
              </p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-black font-space-grotesk">
                {userLeads.filter(lead => lead.status === 'in_progress').length}
              </p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-gray-600">Closed</p>
              <p className="text-2xl font-bold text-black font-space-grotesk">
                {userLeads.filter(lead => lead.status === 'closed').length}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600">Lost</p>
              <p className="text-2xl font-bold text-black font-space-grotesk">
                {userLeads.filter(lead => lead.status === 'lost').length}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {userLeads.map((lead) => (
              <div 
                key={lead.id} 
                className={`border-l-4 rounded-lg p-6 ${getLeadStatusColor(lead.status)} hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getLeadStatusIcon(lead.status)}
                    <div>
                      <h4 className="font-medium text-black">{lead.distributorName}</h4>
                      <p className="text-sm text-gray-600">{lead.contactPerson} • {lead.city}, {lead.state}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-black font-space-grotesk">
                      ₹{(lead.estimatedValue / 1000).toFixed(0)}K
                    </p>
                    <p className="text-sm text-gray-600 capitalize">{lead.status}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{lead.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{lead.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Next: {new Date(lead.nextFollowUp).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-700">{lead.notes}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">Source: {lead.source}</span>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                        Follow Up
                      </button>
                      <button className="bg-emerald-600 text-white px-3 py-1 rounded text-xs hover:bg-emerald-700 transition-colors">
                        Convert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'engagement' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Distributor Engagement Tracker</h3>
          
          <div className="space-y-4">
            {distributorEngagement.map((engagement) => {
              const distributor = distributors.find(d => d.id === engagement.distributorId);
              if (!distributor) return null;
              
              return (
                <div key={engagement.distributorId} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-black">{distributor.name}</h4>
                      <p className="text-sm text-gray-600">{distributor.city}, {distributor.state}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-black font-space-grotesk">
                        {engagement.satisfactionScore.toFixed(1)}
                      </p>
                      <p className="text-sm text-gray-600">Satisfaction</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600">Visits</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">{engagement.visits}</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <p className="text-xs text-gray-600">Meetings</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">{engagement.meetings}</p>
                    </div>
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <p className="text-xs text-gray-600">Follow-ups</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">{engagement.followUps}</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600">Response Time</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">{engagement.responseTime}h</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Interaction: {new Date(engagement.lastInteraction).toLocaleDateString()}</span>
                      <span className="text-gray-600">Next Scheduled: {new Date(engagement.nextScheduled).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedView === 'leaderboard' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Sales Team Leaderboard</h3>
          
          <div className="space-y-4">
            {salesTargets
              .sort((a, b) => (b.achieved / b.target) - (a.achieved / a.target))
              .map((target, index) => {
                const achievementRate = (target.achieved / target.target) * 100;
                return (
                  <div key={target.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-600 w-6">#{index + 1}</span>
                        <div className={`p-2 rounded-full ${getBadgeColor(achievementRate)}`}>
                          {getBadgeIcon(achievementRate)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-black">{target.salesRepName}</h4>
                        <p className="text-sm text-gray-600">{target.region}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-6 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Achievement</p>
                        <p className="text-lg font-bold text-black font-space-grotesk">
                          {achievementRate.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Distributors</p>
                        <p className="text-lg font-bold text-black font-space-grotesk">
                          {target.distributorsManaged}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Conversion</p>
                        <p className="text-lg font-bold text-black font-space-grotesk">
                          {target.conversionRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pipeline</p>
                        <p className="text-lg font-bold text-black font-space-grotesk">
                          ₹{(target.pipelineValue / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesTeam;