import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart3, TrendingUp } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('executive');

  const reportTypes = [
    { id: 'executive', name: 'Executive Summary', description: 'High-level KPIs and strategic insights' },
    { id: 'inventory', name: 'Inventory Analysis', description: 'Detailed stock and flow analysis' },
    { id: 'distributor', name: 'Distributor Performance', description: 'Comprehensive distributor metrics' },
    { id: 'forecast', name: 'Demand Forecast', description: 'AI predictions and variance analysis' },
    { id: 'market', name: 'Market Intelligence', description: 'Consumer and competitive insights' }
  ];

  const generateReport = (type: string) => {
    // In real app, this would generate and download actual reports
    console.log(`Generating ${type} report...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">
          Generate comprehensive reports for strategic planning and board presentations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Reports Generated</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">47</p>
          <p className="text-sm text-gray-600 mt-1">This quarter</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Data Points</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">2.4M</p>
          <p className="text-sm text-gray-600 mt-1">Analyzed monthly</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <h3 className="font-medium text-gray-900">Insights Generated</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">156</p>
          <p className="text-sm text-gray-600 mt-1">Actionable recommendations</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-black font-montserrat">Generate Custom Report</h3>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {reportTypes.map((report) => (
            <div 
              key={report.id} 
              className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                selectedReport === report.id ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-black">{report.name}</h4>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 capitalize">{selectedPeriod}</span>
                  <button 
                    onClick={() => generateReport(report.id)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Generate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Recent Reports</h3>
        
        <div className="space-y-3">
          {[
            { name: 'Q4 2024 Executive Summary', date: '2025-01-10', size: '2.4 MB' },
            { name: 'December Distributor Analysis', date: '2025-01-05', size: '1.8 MB' },
            { name: 'Year-End Market Intelligence', date: '2024-12-31', size: '3.2 MB' },
            { name: 'Inventory Optimization Report', date: '2024-12-28', size: '1.5 MB' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-black">{report.name}</p>
                  <p className="text-sm text-gray-600">{report.date} • {report.size}</p>
                </div>
              </div>
              
              <button className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;