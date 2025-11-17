import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FlowStage {
  title: string;
  value: number;
  percentage: number;
  color: string;
}

const FlowChart: React.FC = () => {
  const stages: FlowStage[] = [
    { title: 'Manufactured', value: 125000, percentage: 100, color: 'bg-blue-500' },
    { title: 'Dispatched', value: 118500, percentage: 94.8, color: 'bg-emerald-500' },
    { title: 'In Distribution', value: 112300, percentage: 89.8, color: 'bg-amber-500' },
    { title: 'Sold to Consumers', value: 106800, percentage: 85.4, color: 'bg-green-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-black mb-6 font-montserrat">Manufacturing → Consumer Flow</h3>
      
      <div className="space-y-6">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stage.title}</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-black font-space-grotesk">
                    {stage.value.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">({stage.percentage}%)</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                <div 
                  className={`${stage.color} h-full rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>
            
            {index < stages.length - 1 && (
              <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Conversion Efficiency</span>
          <span className="font-medium text-black">85.4%</span>
        </div>
      </div>
    </div>
  );
};

export default FlowChart;