import React, { useState } from 'react';
import { Factory, Package, Clock, CheckCircle, AlertTriangle, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Manufacturing: React.FC = () => {
  const { productionBatches, forecastData, inventory } = useData();
  const [selectedView, setSelectedView] = useState<'production' | 'planning' | 'quality'>('production');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_production': return <Factory className="h-5 w-5 text-blue-500" />;
      case 'quality_check': return <CheckCircle className="h-5 w-5 text-amber-500" />;
      case 'ready_to_dispatch': return <Package className="h-5 w-5 text-emerald-500" />;
      case 'dispatched': return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_production': return 'border-l-blue-500 bg-blue-50';
      case 'quality_check': return 'border-l-amber-500 bg-amber-50';
      case 'ready_to_dispatch': return 'border-l-emerald-500 bg-emerald-50';
      case 'dispatched': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 95) return 'text-emerald-600 bg-emerald-100';
    if (score >= 90) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const totalProduction = productionBatches.reduce((sum, batch) => sum + batch.quantityProduced, 0);
  const avgQualityScore = productionBatches.reduce((sum, batch) => sum + batch.qualityScore, 0) / productionBatches.length;
  const readyToDispatch = productionBatches.filter(batch => batch.status === 'ready_to_dispatch').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
            Manufacturing Control Center
          </h1>
          <p className="text-gray-600">
            Production planning, quality control, and inventory alignment
          </p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-1">
          <button
            onClick={() => setSelectedView('production')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedView === 'production' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Production
          </button>
          <button
            onClick={() => setSelectedView('planning')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedView === 'planning' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Planning
          </button>
          <button
            onClick={() => setSelectedView('quality')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedView === 'quality' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Quality
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Factory className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Total Production</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {totalProduction.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mt-1">Units this month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Quality Score</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">
            {avgQualityScore.toFixed(1)}%
          </p>
          <p className="text-sm text-emerald-600 mt-1">Average quality</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Package className="h-6 w-6 text-purple-600" />
            <h3 className="font-medium text-gray-900">Ready to Ship</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{readyToDispatch}</p>
          <p className="text-sm text-gray-600 mt-1">Batches ready</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-amber-600" />
            <h3 className="font-medium text-gray-900">Efficiency</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">94.2%</p>
          <p className="text-sm text-gray-600 mt-1">Production efficiency</p>
        </div>
      </div>

      {selectedView === 'production' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Production Batches</h3>
          
          <div className="space-y-4">
            {productionBatches.map((batch) => (
              <div 
                key={batch.id} 
                className={`border-l-4 rounded-lg p-6 ${getStatusColor(batch.status)} hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(batch.status)}
                    <div>
                      <h4 className="font-medium text-black">{batch.productName}</h4>
                      <p className="text-sm text-gray-600">Batch: {batch.batchNumber}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-black font-space-grotesk">
                      {batch.quantityProduced.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">{batch.status.replace('_', ' ')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <Calendar className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Production Date</p>
                    <p className="text-sm font-medium text-black">
                      {new Date(batch.productionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <Calendar className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Expiry Date</p>
                    <p className="text-sm font-medium text-black">
                      {new Date(batch.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <BarChart3 className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">Quality Score</p>
                    <p className={`text-sm font-medium px-2 py-1 rounded-full ${getQualityColor(batch.qualityScore)}`}>
                      {batch.qualityScore}%
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <Package className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">SKU</p>
                    <p className="text-sm font-medium text-black">{batch.sku}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'planning' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Production Planning vs Forecast</h3>
          
          <div className="space-y-4">
            {forecastData.map((forecast, index) => {
              const currentInventory = inventory.find(item => item.region === forecast.region)?.inStock || 0;
              const recommendedProduction = Math.max(0, forecast.predicted - currentInventory);
              
              return (
                <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-black">{forecast.state}</h4>
                      <p className="text-sm text-gray-600">{forecast.region}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Forecast Confidence</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">{forecast.confidence}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600">Predicted Demand</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">
                        {forecast.predicted.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Current Stock</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">
                        {currentInventory.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <p className="text-xs text-gray-600">Recommended Production</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">
                        {recommendedProduction.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-600">Priority</p>
                      <p className={`text-sm font-medium px-2 py-1 rounded-full ${
                        recommendedProduction > 10000 ? 'bg-red-100 text-red-800' :
                        recommendedProduction > 5000 ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {recommendedProduction > 10000 ? 'High' :
                         recommendedProduction > 5000 ? 'Medium' : 'Low'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedView === 'quality' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Quality Control Dashboard</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-black mb-4">Quality Metrics by Product</h4>
              <div className="space-y-3">
                {productionBatches.map((batch) => (
                  <div key={batch.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-black">{batch.productName}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getQualityColor(batch.qualityScore)}`}>
                        {batch.qualityScore}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Batch: {batch.batchNumber}</span>
                      <span className="text-gray-600">{batch.quantityProduced.toLocaleString()} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-black mb-4">Quality Trends</h4>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium text-emerald-800">Excellent Quality</span>
                  </div>
                  <p className="text-sm text-emerald-700">
                    {productionBatches.filter(b => b.qualityScore >= 95).length} batches above 95% quality score
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <span className="font-medium text-amber-800">Quality Review</span>
                  </div>
                  <p className="text-sm text-amber-700">
                    {productionBatches.filter(b => b.qualityScore < 95 && b.qualityScore >= 90).length} batches need quality review
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-800">Average Score</span>
                  </div>
                  <p className="text-2xl font-bold text-black font-space-grotesk">
                    {avgQualityScore.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manufacturing;