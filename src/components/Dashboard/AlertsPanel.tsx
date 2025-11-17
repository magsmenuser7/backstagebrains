import React from 'react';
import { AlertTriangle, Clock, TrendingDown, CreditCard, X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Alert } from '../../types';

const AlertsPanel: React.FC = () => {
  const { alerts } = useData();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'market_share': return <TrendingDown className="h-5 w-5" />;
      case 'distributor_delay': return <Clock className="h-5 w-5" />;
      case 'campaign_roi': return <TrendingDown className="h-5 w-5" />;
      case 'payment_delay': return <CreditCard className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50 text-red-800';
      case 'medium': return 'border-amber-500 bg-amber-50 text-amber-800';
      case 'low': return 'border-blue-500 bg-blue-50 text-blue-800';
      default: return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  const getIconColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-4">System Alerts</h3>
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No active alerts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black font-montserrat">Critical Alerts</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
          {alerts.length} Active
        </span>
      </div>
      
      <div className="space-y-3">
        {alerts.slice(0, 3).map((alert) => (
          <div 
            key={alert.id} 
            className={`border-l-4 rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={getIconColor(alert.severity)}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{alert.title}</h4>
                  <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                  <div className="flex items-center space-x-4 text-xs opacity-75">
                    <span>{alert.region}</span>
                    {alert.state && <span>• {alert.state}</span>}
                    <span>• {new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {alerts.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All {alerts.length} Alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;