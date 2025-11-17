import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import KPICards from '../components/Dashboard/KPICards';
import FlowChart from '../components/Dashboard/FlowChart';
import RegionalHeatmap from '../components/Dashboard/RegionalHeatmap';
import DistributorTable from '../components/Dashboard/DistributorTable';
import AlertsPanel from '../components/Dashboard/AlertsPanel';
import TopPerformers from '../components/Dashboard/TopPerformers';
import ExecutiveOverview from '../components/Dashboard/ExecutiveOverview';
import SalesTargets from '../components/Dashboard/SalesTargets';
import ManufacturingOverview from '../components/Dashboard/ManufacturingOverview';
import DistributorPerformance from '../components/Dashboard/DistributorPerformance';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { kpiData } = useData();

  const getDashboardTitle = (role: string) => {
    switch (role) {
      case 'ceo': return 'Executive Command Center';
      case 'admin': return 'Executive Dashboard';
      case 'brand_manager': return 'Brand Performance Dashboard';
      case 'sales_team': return 'Sales Dashboard';
      case 'distributor': return 'My Performance Dashboard';
      default: return 'Executive Dashboard';
    }
  };

  const getDashboardSubtitle = (role: string) => {
    switch (role) {
      case 'ceo': return 'Strategic oversight across all markets and operations';
      case 'admin': return 'Real-time insights into your brand\'s performance across the entire supply chain';
      case 'brand_manager': return 'Campaign performance and brand health metrics';
      case 'sales_team': return 'Territory performance and sales targets';
      case 'distributor': return 'Your orders, targets, and performance metrics';
      default: return 'Real-time insights into your brand\'s performance across the entire supply chain';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
          {getDashboardTitle(user?.role || 'admin')}
        </h1>
        <p className="text-gray-600">
          {getDashboardSubtitle(user?.role || 'admin')}
        </p>
      </div>

      <KPICards data={kpiData} />
      
      {user?.role === 'ceo' && (
        <>
          <ExecutiveOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlertsPanel />
            <TopPerformers />
          </div>
        </>
      )}
      
      {user?.role === 'sales_team' && (
        <SalesTargets />
      )}
      
      {user?.role === 'manufacturing' && (
        <ManufacturingOverview />
      )}
      
      {user?.role === 'distributor' && (
        <DistributorPerformance />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FlowChart />
        <RegionalHeatmap />
      </div>
      
      {user?.role !== 'distributor' && <DistributorTable />}
    </div>
  );
};

export default Dashboard;