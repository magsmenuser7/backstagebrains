import React, { useState } from 'react';
import { Package, AlertTriangle, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Inventory: React.FC = () => {
  const { inventory } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'warning': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'border-l-emerald-500 bg-emerald-50';
      case 'warning': return 'border-l-amber-500 bg-amber-50';
      case 'critical': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = inventory.reduce((sum, item) => sum + (item.inStock * 1200), 0);
  const criticalItems = inventory.filter(item => item.status === 'critical').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
            Inventory Management
          </h1>
          <p className="text-gray-600">
            Track stock levels and monitor product flow across the supply chain
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Inventory Value</p>
            <p className="text-2xl font-bold text-black font-space-grotesk">
              ₹{(totalValue / 1000000).toFixed(1)}M
            </p>
          </div>
          {criticalItems > 0 && (
            <div className="bg-red-100 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  {criticalItems} Critical Items
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-black">Product Inventory</h3>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredInventory.map((item) => (
            <div 
              key={item.id} 
              className={`border-l-4 rounded-lg p-4 ${getStatusColor(item.status)} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h4 className="font-medium text-black">{item.productName}</h4>
                    <p className="text-sm text-gray-600">
                      Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Manufactured</p>
                    <p className="text-lg font-bold text-black font-space-grotesk">
                      {item.manufactured.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Dispatched</p>
                    <p className="text-lg font-bold text-black font-space-grotesk">
                      {item.dispatched.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sold</p>
                    <p className="text-lg font-bold text-black font-space-grotesk">
                      {item.sold.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">In Stock</p>
                    <p className={`text-lg font-bold font-space-grotesk ${
                      item.status === 'critical' ? 'text-red-600' : 
                      item.status === 'warning' ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {item.inStock.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-4 gap-6">
                <div className="bg-white rounded p-3 text-center">
                  <p className="text-xs text-gray-500">Dispatch Rate</p>
                  <p className="text-sm font-medium text-black">
                    {((item.dispatched / item.manufactured) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <p className="text-xs text-gray-500">Sales Rate</p>
                  <p className="text-sm font-medium text-black">
                    {((item.sold / item.dispatched) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <p className="text-xs text-gray-500">Stock Days</p>
                  <p className="text-sm font-medium text-black">
                    {Math.floor(item.inStock / (item.sold / 30))} days
                  </p>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <p className="text-xs text-gray-500">Turnover</p>
                  <p className="text-sm font-medium text-black">
                    {(item.sold / item.inStock * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;