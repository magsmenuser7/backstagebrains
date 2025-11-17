import React, { useState } from 'react';
import { Users, TrendingUp, Heart, ShoppingBag, Calendar, BarChart3, Eye, Target } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const ConsumerInsights: React.FC = () => {
  const { consumerInsights, marketData } = useData();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const totalConsumers = consumerInsights.reduce((sum, insight) => sum + insight.newCustomers + insight.repeatCustomers, 0);
  const avgSatisfaction = consumerInsights.reduce((sum, insight) => sum + insight.satisfactionScore, 0) / consumerInsights.length;
  const avgChurnRate = consumerInsights.reduce((sum, insight) => sum + insight.churnRate, 0) / consumerInsights.length;

  const getChurnColor = (rate: number) => {
    if (rate <= 5) return 'text-emerald-600 bg-emerald-100';
    if (rate <= 10) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 4.5) return 'text-emerald-600 bg-emerald-100';
    if (score >= 4.0) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
          Consumer Intelligence
        </h1>
        <p className="text-gray-600">
          Deep insights into consumer behavior, satisfaction, and lifetime value
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
            <Heart className="h-6 w-6 text-red-600" />
            <h3 className="font-medium text-gray-900">Satisfaction</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {avgSatisfaction.toFixed(1)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Out of 5.0</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Churn Rate</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {avgChurnRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Monthly average</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShoppingBag className="h-6 w-6 text-purple-600" />
            <h3 className="font-medium text-gray-900">Avg LTV</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            ₹{(consumerInsights.reduce((sum, insight) => sum + insight.avgLifetimeValue, 0) / consumerInsights.length / 1000).toFixed(0)}K
          </p>
          <p className="text-sm text-gray-600 mt-1">Lifetime value</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Regional Consumer Analysis</h3>
        
        <div className="space-y-4">
          {consumerInsights.map((insight, index) => (
            <div 
              key={index}
              onClick={() => setSelectedRegion(selectedRegion === insight.state ? null : insight.state)}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-black">{insight.state}</h4>
                  <p className="text-sm text-gray-600">{insight.region}</p>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSatisfactionColor(insight.satisfactionScore)}`}>
                    {insight.satisfactionScore.toFixed(1)} ★
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">New Customers</p>
                  <p className="text-lg font-bold text-black font-space-grotesk">
                    {insight.newCustomers.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <Heart className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Repeat Customers</p>
                  <p className="text-lg font-bold text-black font-space-grotesk">
                    {insight.repeatCustomers.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Churn Rate</p>
                  <p className={`text-lg font-bold font-space-grotesk px-2 py-1 rounded ${getChurnColor(insight.churnRate)}`}>
                    {insight.churnRate}%
                  </p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Avg LTV</p>
                  <p className="text-lg font-bold text-black font-space-grotesk">
                    ₹{(insight.avgLifetimeValue / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Preferred Channels</p>
                    <div className="flex space-x-2 mt-1">
                      {insight.preferredChannels.map((channel, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Customer Ratio</p>
                    <p className="text-sm font-medium text-black">
                      {((insight.repeatCustomers / (insight.newCustomers + insight.repeatCustomers)) * 100).toFixed(0)}% repeat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Consumer Behavior Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-black">Purchase Patterns</h4>
            {marketData.map((market, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-black">{market.state}</span>
                  <span className="text-sm text-gray-600">₹{market.avgOrderValue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frequency: {market.purchaseFrequency}x/month</span>
                  <span className="text-gray-600">{market.consumers.toLocaleString()} consumers</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-black">Acquisition vs Retention</h4>
            {consumerInsights.map((insight, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-black">{insight.state}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getChurnColor(insight.churnRate)}`}>
                    {insight.churnRate}% churn
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">New</span>
                    <span className="font-medium text-black">{insight.newCustomers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Repeat</span>
                    <span className="font-medium text-black">{insight.repeatCustomers.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${(insight.repeatCustomers / (insight.newCustomers + insight.repeatCustomers)) * 100}%` }}
                    />
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

export default ConsumerInsights;