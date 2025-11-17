import React from 'react';
import { ExternalLink, Calendar, DollarSign } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const DistributorTable: React.FC = () => {
  const { distributors } = useData();

  const getEfficiencyBadge = (score: string) => {
    const styles = {
      green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      amber: 'bg-amber-100 text-amber-800 border-amber-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };

    const labels = {
      green: 'Excellent',
      amber: 'Moderate',
      red: 'Needs Attention'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[score as keyof typeof styles]}`}>
        {labels[score as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black font-montserrat">Distributor Performance</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
          <span>View All</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Distributor</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Region</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Efficiency</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Orders</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Avg. Value</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Last Order</th>
            </tr>
          </thead>
          <tbody>
            {distributors.map((distributor, index) => (
              <tr 
                key={distributor.id} 
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-gray-25' : 'bg-white'
                }`}
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-black">{distributor.name}</p>
                    <p className="text-sm text-gray-500">ID: {distributor.id}</p>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{distributor.region}</td>
                <td className="py-4 px-4">
                  {getEfficiencyBadge(distributor.efficiencyScore)}
                </td>
                <td className="py-4 px-4">
                  <span className="font-medium text-black font-space-grotesk">
                    {distributor.totalOrders}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-black font-space-grotesk">
                      {(distributor.avgOrderValue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(distributor.lastOrderDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistributorTable;