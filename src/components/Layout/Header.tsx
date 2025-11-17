import React from 'react';
import { Bell, Search, ChevronDown, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { alerts } = useData();

  const highPriorityAlerts = alerts.filter(alert => alert.severity === 'high');

  const getDashboardTitle = (role: string) => {
    switch (role) {
      case 'ceo': return 'Executive Command Center';
      case 'admin': return 'Brand Intelligence Dashboard';
      case 'brand_manager': return 'Brand Management Console';
      case 'sales_team': return 'Sales Performance Dashboard';
      case 'distributor': return 'Distributor Portal';
      default: return 'Brand Intelligence Dashboard';
    }
  };

  const getDashboardSubtitle = (role: string) => {
    switch (role) {
      case 'ceo': return 'Strategic oversight and market intelligence';
      case 'admin': return 'Real-time insights and analytics';
      case 'brand_manager': return 'Campaign performance and brand metrics';
      case 'sales_team': return 'Territory management and targets';
      case 'distributor': return 'Your orders and performance metrics';
      default: return 'Real-time insights and analytics';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold text-black font-montserrat">
              {getDashboardTitle(user?.role || 'admin')}
            </h2>
            <p className="text-sm text-gray-600">
              {getDashboardSubtitle(user?.role || 'admin')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {highPriorityAlerts.length > 0 && (
            <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                {highPriorityAlerts.length} Critical Alert{highPriorityAlerts.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search insights..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{alerts.length}</span>
              </span>
            )}
          </button>
          
          <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
            <div className="text-right">
              <p className="text-sm font-medium text-black">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {user?.name.charAt(0)}
                </span>
              </div>
            )}
            <button 
              onClick={logout}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;