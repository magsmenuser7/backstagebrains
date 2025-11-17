import React from 'react';
import { TrendingUp, Brain, AlertCircle, CheckCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Forecasting: React.FC = () => {
  const { forecastData } = useData();

  const averageAccuracy = forecastData.reduce((acc, item) => acc + item.confidence, 0) / forecastData.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black font-montserrat mb-2">
          AI Demand Forecasting
        </h1>
        <p className="text-gray-600">
          Predictive analytics to optimize inventory and anticipate market demands
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="h-6 w-6 text-blue-600" />
            <h3 className="font-medium text-gray-900">Model Accuracy</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">{averageAccuracy.toFixed(1)}%</p>
          <p className="text-sm text-gray-600 mt-1">Prediction confidence</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Next Quarter</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">+18.5%</p>
          <p className="text-sm text-emerald-600 mt-1">Expected growth</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="h-6 w-6 text-amber-600" />
            <h3 className="font-medium text-gray-900">Risk Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-black font-space-grotesk">2</p>
          <p className="text-sm text-amber-600 mt-1">Regions need attention</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">Regional Forecast Analysis</h3>
        
        <div className="grid gap-4">
          {forecastData.map((region, index) => {
            const variance = region.variance;
            const isAccurate = Math.abs(variance) <= 5;
            
            return (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-l-4 ${
                  isAccurate ? 'border-l-emerald-500 bg-emerald-50' : 
                  Math.abs(variance) <= 10 ? 'border-l-amber-500 bg-amber-50' : 
                  'border-l-red-500 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isAccurate ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    )}
                    <div>
                      <h4 className="font-medium text-black">{region.region}</h4>
                      <p className="text-sm text-gray-600">Confidence: {region.confidence}%</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex space-x-6">
                      <div>
                        <p className="text-sm text-gray-600">Predicted</p>
                        <p className="text-lg font-bold text-black font-space-grotesk">
                          {region.predicted.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Actual</p>
                        <p className="text-lg font-bold text-black font-space-grotesk">
                          {region.actual.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Variance</p>
                        <p className={`text-lg font-bold font-space-grotesk ${
                          variance >= 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Forecast vs Actual</span>
                    <span>{((region.actual / region.predicted) * 100).toFixed(1)}% of prediction</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        isAccurate ? 'bg-emerald-500' : 
                        Math.abs(variance) <= 10 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((region.actual / region.predicted) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-black font-montserrat mb-6">AI Insights & Recommendations</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Model Recommendation</h4>
                <p className="text-sm text-blue-800 mt-1">
                  South India forecast accuracy is below 80%. Consider increasing data collection frequency and incorporating local market indicators for better predictions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900">Demand Alert</h4>
                <p className="text-sm text-amber-800 mt-1">
                  North India showing 15% higher demand than predicted. Consider increasing manufacturing capacity for next quarter to avoid stockouts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecasting;