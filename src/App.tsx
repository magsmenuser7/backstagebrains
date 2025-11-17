import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Distributors from './pages/Distributors';
import Forecasting from './pages/Forecasting';
import MarketInsights from './pages/MarketInsights';
import BrandingGuidance from './pages/BrandingGuidance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import GeographicView from './pages/GeographicView';
import Leaderboards from './pages/Leaderboards';
import Orders from './pages/Orders';
import UserManagement from './pages/UserManagement';
import Manufacturing from './pages/Manufacturing';
import SalesTeam from './pages/SalesTeam';
import SystemHealth from './pages/SystemHealth';
import ConsumerInsights from './pages/ConsumerInsights';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="orders" element={<Orders />} />
                <Route path="sales-team" element={<SalesTeam />} />
                <Route path="distributors" element={<Distributors />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="manufacturing" element={<Manufacturing />} />
                <Route path="system-health" element={<SystemHealth />} />
                <Route path="consumer-insights" element={<ConsumerInsights />} />
                <Route path="geographic" element={<GeographicView />} />
                <Route path="leaderboards" element={<Leaderboards />} />
                <Route path="forecasting" element={<Forecasting />} />
                <Route path="market-insights" element={<MarketInsights />} />
                <Route path="branding-guidance" element={<BrandingGuidance />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;