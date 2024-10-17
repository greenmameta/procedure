import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

interface ExecutionHistoryProps {
  logs: ExecutionLog[];
}

interface ExecutionLog {
  manualId: string;
  title: string;
  steps: {
    id: string;
    description: string;
    completed: boolean;
    comment: string;
  }[];
  completedAt: string;
}

const ExecutionHistory: React.FC<ExecutionHistoryProps> = ({ logs }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Execution History</h2>
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={index} className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{log.title}</h3>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" />
                {new Date(log.completedAt).toLocaleString()}
              </span>
            </div>
            <div className="space-y-2">
              {log.steps.map((step, stepIndex) => (
                <div key={step.id} className="flex items-start">
                  <ChevronRight size={18} className="mr-2 mt-1 text-gray-400" />
                  <div>
                    <p className={step.completed ? 'text-green-600' : 'text-red-600'}>
                      {step.description}
                    </p>
                    {step.comment && (
                      <p className="text-sm text-gray-600 mt-1">{step.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutionHistory;