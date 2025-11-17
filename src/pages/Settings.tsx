import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your account preferences and system configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-medium text-black">Profile Information</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input 
                  type="text" 
                  value={user?.role.replace('_', ' ').toUpperCase()}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-medium text-black">Notification Preferences</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-black capitalize">
                      {key === 'weekly' ? 'Weekly Reports' : `${key} Notifications`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {key === 'email' ? 'Receive alerts via email' :
                       key === 'push' ? 'Browser push notifications' :
                       key === 'sms' ? 'Text message alerts' :
                       'Weekly performance summaries'}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-black' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-medium text-black">Security</h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-black">Change Password</p>
                <p className="text-sm text-gray-600">Update your account password</p>
              </button>
              
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-black">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Enhanced account security</p>
              </button>
              
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-black">API Keys</p>
                <p className="text-sm text-gray-600">Manage integration keys</p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-medium text-black">Data & Privacy</h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-black">Export Data</p>
                <p className="text-sm text-gray-600">Download your data</p>
              </button>
              
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="font-medium text-black">Data Retention</p>
                <p className="text-sm text-gray-600">Configure storage policies</p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-medium text-black">Appearance</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-black mb-2">Theme</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 border-2 border-black rounded-lg bg-black text-white">
                    <p className="text-sm font-medium">Professional</p>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <p className="text-sm font-medium text-gray-700">Light</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;