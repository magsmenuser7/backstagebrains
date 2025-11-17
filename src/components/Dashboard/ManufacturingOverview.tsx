import React from 'react';
import { Factory, Package, BarChart3, Clock, CheckCircle, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const ManufacturingOverview: React.FC = () => {
  const { productionBatches, forecastData, inventory } = useData();

  const totalProduction = productionBatches.reduce((sum, batch) => sum + batch.quantityProduced, 0);
  const avgQualityScore = productionBatches.reduce((sum, batch) => sum + batch.qualityScore, 0) / productionBatches.length;
  const readyToDispatch = productionBatches.filter(batch => batch.status === 'ready_to_dispatch').length;
  const inProduction = productionBatches.filter(batch => batch.status === 'in_production').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_production': return <Factory className="h-5 w-5 text-blue-500" />;
      case 'quality_check': return <CheckCircle className="h-5 w-5 text-amber-500" />;
      case 'ready_to_dispatch': return <Package className="h-5 w-5 text-emerald-500" />;
      case 'dispatched': return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 95) return 'text-emerald-600 bg-emerald-100';
    if (score >= 90) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const productionEfficiency = 94.2;
  const onTimeDelivery = 89.5;

  return (
    <div className="space-y-6">
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
          <p className="text-3xl font-bold text-black font-space-grotesk">{productionEfficiency}%</p>
          <p className="text-sm text-gray-600 mt-1">Production efficiency</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Production Pipeline</h3>
        
        <div className="space-y-4">
          {productionBatches.slice(0, 5).map((batch) => (
            <div key={batch.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                {getStatusIcon(batch.status)}
                <div>
                  <h4 className="font-medium text-black">{batch.productName}</h4>
                  <p className="text-sm text-gray-600">Batch: {batch.batchNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="text-lg font-bold text-black font-space-grotesk">
                    {batch.quantityProduced.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Quality</p>
                  <span className={`px-2 py-1 text-sm font-medium rounded-full ${getQualityColor(batch.qualityScore)}`}>
                    {batch.qualityScore}%
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-sm font-medium text-black capitalize">
                    {batch.status.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Production vs Forecast Alignment</h3>
          
          <div className="space-y-4">
            {forecastData.slice(0, 4).map((forecast, index) => {
              const currentInventory = inventory.find(item => item.region === forecast.region)?.inStock || 0;
              const recommendedProduction = Math.max(0, forecast.predicted - currentInventory);
              
              return (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-black">{forecast.state}</h4>
                      <p className="text-sm text-gray-600">Confidence: {forecast.confidence}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Recommended</p>
                      <p className="text-lg font-bold text-black font-space-grotesk">
                        {recommendedProduction.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                      <p className="text-gray-600">Predicted</p>
                      <p className="font-medium text-black">{forecast.predicted.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Stock</p>
                      <p className="font-medium text-black">{currentInventory.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Priority</p>
                      <p className={`font-medium px-2 py-1 rounded ${
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-black font-montserrat mb-6">Quality Control Metrics</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Avg Quality Score</p>
                <p className="text-2xl font-bold text-black font-space-grotesk">{avgQualityScore.toFixed(1)}%</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">On-Time Delivery</p>
                <p className="text-2xl font-bold text-black font-space-grotesk">{onTimeDelivery}%</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {productionBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-black">{batch.productName}</p>
                    <p className="text-sm text-gray-600">Supervisor: {batch.supervisor}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getQualityColor(batch.qualityScore)}`}>
                      {batch.qualityScore}%
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{batch.productionLine}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturingOverview;