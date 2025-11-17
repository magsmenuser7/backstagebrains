import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Globe, Users, DollarSign, MapPin } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const ExecutiveOverview: React.FC = () => {
  const { marketData, alerts, kpiData, regionalPerformance } = useData();

  const redZones = marketData.filter(region => region.growth < 0).length;
  const totalRevenue = 47200000; // ₹47.2 Cr
  const quarterlyGrowth = 15.8;

  const topPerformers = regionalPerformance
    .filter(region => region.performance === 'top')
    .sort((a, b) => b.marketShare - a.marketShare)
    .slice(0, 5);

  const bottomPerformers = regionalPerformance
    .filter(region => region.performance === 'bottom')
    .sort((a, b) => a.marketShare - b.marketShare)
    .slice(0, 5);

  const strategicInsights = [
    {
      type: 'investment',
      title: 'South India Investment Opportunity',
      description: 'Tamil Nadu showing -5.2% growth. Recommend ₹25L branding investment for 8-12% market share recovery.',
      priority: 'high',
      impact: '+8-12% market share',
      investment: '₹25L'
    },
    {
      type: 'distributor',
      title: 'Chennai Distributor Optimization',
      description: 'Chennai Express Logistics efficiency at 58%. Incentive program could improve turnover by 20%.',
      priority: 'medium',
      impact: '+20% turnover speed',
      investment: '₹8L'
    },
    {
      type: 'sales',
      title: 'West India Sales Push',
      description: 'Maharashtra showing strong 8.7% growth. Deploy additional sales resources for market expansion.',
      priority: 'medium',
      impact: '+15% territory coverage',
      investment: '₹12L'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 text-red-800';
      case 'medium': return 'border-amber-500 bg-amber-50 text-amber-800';
      case 'low': return 'border-blue-500 bg-blue-50 text-blue-800';
      default: return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-6 w-6 text-white" />
            <h3 className="font-medium">Nationwide Share</h3>
          </div>
          <p className="text-3xl font-bold font-space-grotesk">{kpiData.marketShare}%</p>
          <div className="flex items-center space-x-1 mt-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">+{kpiData.growthTrend}%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">YoY Growth</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{kpiData.yoyGrowth}%</p>
          <p className="text-sm text-emerald-600 mt-1">Annual growth</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="font-medium text-gray-900">Red Zones</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{redZones}</p>
          <p className="text-sm text-red-600 mt-1">Underperforming regions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Total Revenue</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">₹{(totalRevenue / 10000000).toFixed(1)}Cr</p>
          <p className="text-sm text-emerald-600 mt-1">This quarter</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Top 5 Performing Regions</h3>
          <div className="space-y-3">
            {topPerformers.map((region, index) => (
              <div key={`${region.region}-${region.state}`} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-600 w-6">#{index + 1}</span>
                  <div>
                    <h4 className="font-medium text-black">{region.state}</h4>
                    <p className="text-sm text-gray-600">{region.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-black font-space-grotesk">{region.marketShare}%</p>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-600">+{region.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Bottom 5 Regions (Red Zones)</h3>
          <div className="space-y-3">
            {bottomPerformers.map((region, index) => (
              <div key={`${region.region}-${region.state}`} className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-black">{region.state}</h4>
                    <p className="text-sm text-gray-600">{region.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-black font-space-grotesk">{region.marketShare}%</p>
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">{region.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Strategic Investment Recommendations</h3>
        <div className="space-y-4">
          {strategicInsights.map((insight, index) => (
            <div key={index} className={`border-l-4 rounded-lg p-4 ${getPriorityColor(insight.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium mb-2">{insight.title}</h4>
                  <p className="text-sm mb-3">{insight.description}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className="font-medium">Impact: {insight.impact}</span>
                    <span className="font-medium">Investment: {insight.investment}</span>
                  </div>
                </div>
                <button className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                  Execute
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOverview;