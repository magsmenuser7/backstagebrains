import React from 'react';
import { TrendingUp, TrendingDown, Package, Truck, ShoppingCart, Target, AlertTriangle, Calendar } from 'lucide-react';
import { KPIData } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface KPICardsProps {
  data: KPIData;
}

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const { user } = useAuth();

  const getCEOKPIs = () => [
    {
      title: 'Market Share',
      value: `${data.marketShare}%`,
      icon: Target,
      trend: data.growthTrend,
      color: 'emerald',
      subtitle: 'Nationwide'
    },
    {
      title: 'YoY Growth',
      value: `${data.yoyGrowth}%`,
      icon: TrendingUp,
      trend: data.yoyGrowth,
      color: 'blue',
      subtitle: 'Annual growth'
    },
    {
      title: 'Red Zones',
      value: data.redZones.toString(),
      icon: AlertTriangle,
      trend: -12.5,
      color: 'red',
      subtitle: 'Underperforming regions'
    },
    {
      title: 'Total Revenue',
      value: '₹47.2Cr',
      icon: Target,
      trend: data.growthTrend,
      color: 'emerald',
      subtitle: 'This quarter'
    }
  ];

  const getStandardKPIs = () => [
    {
      title: 'Total Manufactured',
      value: data.totalManufactured.toLocaleString(),
      icon: Package,
      trend: data.growthTrend,
      color: 'blue',
      subtitle: 'Units produced'
    },
    {
      title: 'Total Dispatched',
      value: data.totalDispatched.toLocaleString(),
      icon: Truck,
      trend: (data.totalDispatched / data.totalManufactured - 1) * 100,
      color: 'emerald',
      subtitle: 'Units shipped'
    },
    {
      title: 'Total Sold',
      value: data.totalSold.toLocaleString(),
      icon: ShoppingCart,
      trend: (data.totalSold / data.totalDispatched - 1) * 100,
      color: 'amber',
      subtitle: 'Units sold'
    },
    {
      title: 'Market Share',
      value: `${data.marketShare}%`,
      icon: Target,
      trend: data.growthTrend,
      color: 'emerald',
      subtitle: 'Market position'
    }
  ];

  const kpis = [
    {
      title: 'Total Manufactured',
      value: data.totalManufactured.toLocaleString(),
      icon: Package,
      trend: data.growthTrend,
      color: 'blue'
    },
    {
      title: 'Total Dispatched',
      value: data.totalDispatched.toLocaleString(),
      icon: Truck,
      trend: (data.totalDispatched / data.totalManufactured - 1) * 100,
      color: 'emerald'
    },
    {
      title: 'Total Sold',
      value: data.totalSold.toLocaleString(),
      icon: ShoppingCart,
      trend: (data.totalSold / data.totalDispatched - 1) * 100,
      color: 'amber'
    },
    {
      title: 'Market Share',
      value: `${data.marketShare}%`,
      icon: Target,
      trend: data.growthTrend,
      color: 'emerald'
    }
  ];

  const displayKPIs = user?.role === 'ceo' ? getCEOKPIs() : getStandardKPIs();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {displayKPIs.map((kpi, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-${kpi.color}-50`}>
              <kpi.icon className={`h-6 w-6 text-${kpi.color}-600`} />
            </div>
            <div className="flex items-center space-x-1">
              {kpi.trend >= 0 ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                kpi.trend >= 0 ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {kpi.trend >= 0 ? '+' : ''}{kpi.trend.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
            <p className="text-2xl font-bold text-black font-space-grotesk">{kpi.value}</p>
            {kpi.subtitle && (
              <p className="text-xs text-gray-500 mt-1">{kpi.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;