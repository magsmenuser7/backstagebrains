import React from 'react';
import { Target, Lightbulb, DollarSign, Clock, TrendingUp, AlertTriangle, BarChart3, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const BrandingGuidance: React.FC = () => {
  const { recommendations } = useData();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-amber-500 bg-amber-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium': return <Clock className="h-5 w-5 text-amber-600" />;
      case 'low': return <TrendingUp className="h-5 w-5 text-blue-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return <Target className="h-5 w-5 text-purple-600" />;
      case 'promotion': return <TrendingUp className="h-5 w-5 text-emerald-600" />;
      case 'distributor_incentive': return <DollarSign className="h-5 w-5 text-blue-600" />;
      default: return <Lightbulb className="h-5 w-5 text-gray-600" />;
    }
  };

  const highPriorityCount = recommendations.filter(r => r.priority === 'high').length;
  const totalInvestment = recommendations.reduce((acc, rec) => {
    const amount = parseInt(rec.investmentRequired.replace(/[^\d]/g, '') || '0');
    return acc + amount;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
          Branding Guidance
        </h1>
        <p className="text-gray-600">
          AI-powered recommendations to optimize your brand investments and market strategy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Active Recommendations</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{recommendations.length}</p>
          <p className="text-sm text-gray-600 mt-1">Strategic initiatives</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="font-medium text-gray-900">High Priority</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{highPriorityCount}</p>
          <p className="text-sm text-red-600 mt-1">Require immediate attention</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Total Investment</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            ₹{(totalInvestment / 10000000).toFixed(1)}Cr
          </p>
          <p className="text-sm text-gray-600 mt-1">Recommended budget</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Strategic Recommendations</h3>
        
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div 
              key={recommendation.id}
              className={`border-l-4 rounded-lg p-6 ${getPriorityColor(recommendation.priority)} hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(recommendation.type)}
                    {getPriorityIcon(recommendation.priority)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-lg font-bold text-black">{recommendation.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                        recommendation.priority === 'high' ? 'bg-red-100 text-red-800' :
                        recommendation.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {recommendation.priority} priority
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{recommendation.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs text-gray-600">Expected Impact</span>
                        </div>
                        <p className="font-medium text-black">{recommendation.estimatedImpact}</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <DollarSign className="h-4 w-4 text-blue-600" />
                          <span className="text-xs text-gray-600">Investment</span>
                        </div>
                        <p className="font-medium text-black">{recommendation.investmentRequired}</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <span className="text-xs text-gray-600">Timeline</span>
                        </div>
                        <p className="font-medium text-black">{recommendation.timeline}</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <BarChart3 className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs text-gray-600">Expected ROI</span>
                        </div>
                        <p className="font-medium text-black">{recommendation.expectedROI}x</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
                  Implement
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-black to-gray-800 rounded-xl text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="h-6 w-6 text-white" />
          <h3 className="text-lg font-bold font-montserrat">AI-Powered Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Market Opportunity Analysis</h4>
            <p className="text-sm text-gray-300">
              South India presents the highest growth potential with 71% competitor presence leaving room for strategic positioning. 
              Recommended focus on digital campaigns and distributor efficiency improvements.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Investment Prioritization</h4>
            <p className="text-sm text-gray-300">
              Current ROI analysis suggests prioritizing distributor incentives over broad campaigns. 
              Expected 3:1 return on targeted efficiency improvements versus 2:1 on general marketing spend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingGuidance;