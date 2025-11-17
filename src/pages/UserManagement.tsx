import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Shield, UserCheck, UserX, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  region?: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
}

const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddUser, setShowAddUser] = useState(false);

  const [users] = useState<UserData[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@evolvglobal.com',
      role: 'ceo',
      status: 'active',
      lastLogin: '2025-01-12',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh@distributor.com',
      role: 'distributor',
      region: 'North India',
      status: 'active',
      lastLogin: '2025-01-12',
      permissions: ['orders', 'inventory', 'performance']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@evolvglobal.com',
      role: 'brand_manager',
      status: 'active',
      lastLogin: '2025-01-11',
      permissions: ['campaigns', 'analytics', 'distributors', 'reports']
    },
    {
      id: '4',
      name: 'Arjun Patel',
      email: 'arjun@evolvglobal.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-01-12',
      permissions: ['all']
    },
    {
      id: '5',
      name: 'Priya Sharma',
      email: 'priya@evolvglobal.com',
      role: 'sales_team',
      region: 'West India',
      status: 'active',
      lastLogin: '2025-01-12',
      permissions: ['distributors', 'orders', 'targets', 'analytics']
    },
    {
      id: '6',
      name: 'Vikram Singh',
      email: 'vikram@evolvglobal.com',
      role: 'manufacturing',
      status: 'active',
      lastLogin: '2025-01-11',
      permissions: ['production', 'inventory', 'forecasting']
    },
    {
      id: '7',
      name: 'Anita Desai',
      email: 'anita@evolvglobal.com',
      role: 'reports',
      status: 'active',
      lastLogin: '2025-01-10',
      permissions: ['reports', 'analytics', 'export']
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ceo': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'admin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'brand_manager': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'sales_team': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'distributor': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'manufacturing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'reports': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredUsers = users.filter(userData => {
    const matchesSearch = userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userData.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || userData.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (user?.role !== 'ceo' && user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-600 mb-2">Access Restricted</h2>
          <p className="text-gray-500">You don't have permission to access user management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage user accounts, roles, and permissions across the platform
          </p>
        </div>
        
        <button 
          onClick={() => setShowAddUser(true)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Total Users</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{users.length}</p>
          <p className="text-sm text-gray-600 mt-1">Active accounts</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <UserCheck className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Active Users</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {users.filter(u => u.status === 'active').length}
          </p>
          <p className="text-sm text-emerald-600 mt-1">Currently active</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-purple-600" />
            <h3 className="font-medium text-gray-900">Admins</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {users.filter(u => u.role === 'admin' || u.role === 'ceo').length}
          </p>
          <p className="text-sm text-gray-600 mt-1">Admin access</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-6 w-6 text-amber-600" />
            <h3 className="font-medium text-gray-900">Distributors</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {users.filter(u => u.role === 'distributor').length}
          </p>
          <p className="text-sm text-gray-600 mt-1">External partners</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-black font-montserrat">User Directory</h3>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Roles</option>
                <option value="ceo">CEO</option>
                <option value="admin">Admin</option>
                <option value="brand_manager">Brand Manager</option>
                <option value="sales_team">Sales Team</option>
                <option value="distributor">Distributor</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="reports">Reports</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Region</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((userData, index) => (
                <tr 
                  key={userData.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-gray-25' : 'bg-white'
                  }`}
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-black">{userData.name}</p>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(userData.role)}`}>
                      {userData.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {userData.region || 'All Regions'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {userData.status === 'active' ? (
                        <UserCheck className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <UserX className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        userData.status === 'active' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {userData.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {new Date(userData.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Role Distribution</h3>
          
          <div className="space-y-4">
            {[
              { role: 'ceo', label: 'CEO', count: users.filter(u => u.role === 'ceo').length },
              { role: 'admin', label: 'Admin', count: users.filter(u => u.role === 'admin').length },
              { role: 'brand_manager', label: 'Brand Manager', count: users.filter(u => u.role === 'brand_manager').length },
              { role: 'sales_team', label: 'Sales Team', count: users.filter(u => u.role === 'sales_team').length },
              { role: 'distributor', label: 'Distributor', count: users.filter(u => u.role === 'distributor').length },
              { role: 'manufacturing', label: 'Manufacturing', count: users.filter(u => u.role === 'manufacturing').length },
              { role: 'reports', label: 'Reports', count: users.filter(u => u.role === 'reports').length }
            ].map((roleData) => (
              <div key={roleData.role} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleColor(roleData.role)}`}>
                    {roleData.label}
                  </span>
                </div>
                <span className="text-lg font-bold text-black font-space-grotesk">
                  {roleData.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {[
              { user: 'Sarah Chen', action: 'Logged in', time: '2 minutes ago', type: 'login' },
              { user: 'Rajesh Kumar', action: 'Placed order ORD-004', time: '15 minutes ago', type: 'order' },
              { user: 'Emily Rodriguez', action: 'Updated campaign settings', time: '1 hour ago', type: 'update' },
              { user: 'Priya Sharma', action: 'Added new distributor', time: '2 hours ago', type: 'create' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-black">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;