import React, { useState } from 'react';
import { ShoppingCart, Package, Clock, CheckCircle, AlertTriangle, Plus, Filter, Search, Calendar, DollarSign, User } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { orders, distributors, inventory } = useData();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'approved': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'dispatched': return <Package className="h-5 w-5 text-purple-500" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'cancelled': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <ShoppingCart className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-l-amber-500 bg-amber-50';
      case 'approved': return 'border-l-blue-500 bg-blue-50';
      case 'dispatched': return 'border-l-purple-500 bg-purple-50';
      case 'delivered': return 'border-l-emerald-500 bg-emerald-50';
      case 'cancelled': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesRole = user?.role === 'distributor' ? 
      distributors.find(d => d.name === order.distributorName)?.region === user.region : true;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalOrderValue = filteredOrders.reduce((sum, order) => sum + order.totalValue, 0);
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
            {user?.role === 'distributor' ? 'My Orders' : 'Order Management'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'distributor' 
              ? 'Track your orders and manage inventory requests'
              : 'Monitor and manage orders across the entire distribution network'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.role === 'distributor' && (
            <button 
              onClick={() => setShowNewOrderForm(true)}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Order</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Total Orders</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{filteredOrders.length}</p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-6 w-6 text-amber-600" />
            <h3 className="font-medium text-gray-900">Pending Orders</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{pendingOrders}</p>
          <p className="text-sm text-amber-600 mt-1">Awaiting approval</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Order Value</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            ₹{(totalOrderValue / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-600 mt-1">Total value</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-black font-montserrat">Order Pipeline</h3>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div 
              key={order.id} 
              className={`border-l-4 rounded-lg p-6 ${getStatusColor(order.status)} hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h4 className="font-medium text-black">{order.id}</h4>
                    <p className="text-sm text-gray-600">{order.distributorName}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-black font-space-grotesk">
                    ₹{(order.totalValue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Order Date</p>
                    <p className="text-sm font-medium text-black">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Expected Delivery</p>
                    <p className="text-sm font-medium text-black">
                      {new Date(order.expectedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Region</p>
                    <p className="text-sm font-medium text-black">{order.region}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h5 className="font-medium text-black mb-2">Order Items</h5>
                <div className="space-y-2">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        {product.productName} ({product.sku})
                      </span>
                      <span className="font-medium text-black">
                        {product.quantity} × ₹{product.unitPrice.toLocaleString()} = ₹{product.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {user?.role === 'admin' && order.status === 'pending' && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center space-x-3">
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                      Approve Order
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Reject Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;