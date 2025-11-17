import React from 'react';
import { Activity, Server, Database, Users, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const SystemHealth: React.FC = () => {
  const { systemHealth, alerts } = useData();

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-600 bg-emerald-100';
      case 'degraded': return 'text-amber-600 bg-amber-100';
      case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'degraded': return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'down': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const systemMetrics = [
    { label: 'API Status', value: systemHealth.apiStatus, type: 'status' },
    { label: 'Uptime', value: `${systemHealth.uptime}%`, type: 'percentage' },
    { label: 'Active Users', value: systemHealth.activeUsers.toString(), type: 'number' },
    { label: 'System Load', value: `${systemHealth.systemLoad}%`, type: 'percentage' },
    { label: 'Error Rate', value: `${(systemHealth.errorRate * 100).toFixed(2)}%`, type: 'percentage' },
    { label: 'Response Time', value: `${systemHealth.responseTime}ms`, type: 'time' }
  ];

  const integrationStatus = [
    { name: 'Manufacturing API', status: 'healthy', lastSync: '2 minutes ago' },
    { name: 'Payment Gateway', status: 'healthy', lastSync: '5 minutes ago' },
    { name: 'SMS Service', status: 'degraded', lastSync: '15 minutes ago' },
    { name: 'Email Service', status: 'healthy', lastSync: '1 minute ago' },
    { name: 'Analytics Engine', status: 'healthy', lastSync: '3 minutes ago' },
    { name: 'Backup Service', status: 'healthy', lastSync: '1 hour ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
          System Health Monitor
        </h1>
        <p className="text-gray-600">
          Real-time system performance, API integrations, and operational metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">System Status</h3>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${getHealthColor(systemHealth.apiStatus)}`}>
            {getHealthIcon(systemHealth.apiStatus)}
            <span className="font-medium capitalize">{systemHealth.apiStatus}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Server className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Uptime</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{systemHealth.uptime}%</p>
          <p className="text-sm text-emerald-600 mt-1">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-purple-600" />
            <h3 className="font-medium text-gray-900">Active Users</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{systemHealth.activeUsers}</p>
          <p className="text-sm text-gray-600 mt-1">Currently online</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Performance Metrics</h3>
          
          <div className="space-y-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <span className="font-medium text-black">{metric.label}</span>
                <div className="text-right">
                  {metric.type === 'status' ? (
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getHealthColor(metric.value)}`}>
                      {getHealthIcon(metric.value)}
                      <span className="font-medium capitalize">{metric.value}</span>
                    </div>
                  ) : (
                    <span className={`font-bold font-space-grotesk ${
                      metric.type === 'percentage' && parseFloat(metric.value) > 95 ? 'text-emerald-600' :
                      metric.type === 'percentage' && parseFloat(metric.value) > 80 ? 'text-amber-600' :
                      metric.type === 'time' && parseInt(metric.value) < 200 ? 'text-emerald-600' :
                      'text-black'
                    }`}>
                      {metric.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">API Integrations</h3>
          
          <div className="space-y-4">
            {integrationStatus.map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getHealthIcon(integration.status)}
                  <span className="font-medium text-black">{integration.name}</span>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 text-xs font-medium rounded-full ${getHealthColor(integration.status)}`}>
                    {integration.status}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{integration.lastSync}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">System Alerts & Escalations</h3>
        
        <div className="space-y-3">
          {alerts.filter(alert => alert.actionRequired).map((alert) => (
            <div 
              key={alert.id} 
              className={`border-l-4 rounded-lg p-4 ${
                alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                alert.severity === 'medium' ? 'border-amber-500 bg-amber-50' :
                'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    alert.severity === 'high' ? 'text-red-600' :
                    alert.severity === 'medium' ? 'text-amber-600' :
                    'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{alert.title}</h4>
                    <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-xs opacity-75">
                      <span>{alert.region}</span>
                      {alert.state && <span>• {alert.state}</span>}
                      <span>• Escalation Level {alert.escalationLevel}</span>
                      <span>• {new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800 transition-colors">
                    Resolve
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors">
                    Escalate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;