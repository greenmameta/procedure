import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, RefreshCw, MessageSquare } from 'lucide-react';

interface ManualExecutorProps {
  manualId: string;
  onComplete: (executionLog: ExecutionLog) => void;
}

interface Step {
  id: string;
  description: string;
  completed: boolean;
  comment: string;
}

interface ExecutionLog {
  manualId: string;
  title: string;
  steps: Step[];
  completedAt: string;
}

const ManualExecutor: React.FC<ManualExecutorProps> = ({ manualId, onComplete }) => {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // TODO: Fetch manual data based on manualId
    // For now, we'll use dummy data
    setTitle('Server Maintenance');
    setSteps([
      { id: '1', description: 'Check server logs for errors', completed: false, comment: '' },
      { id: '2', description: 'Update system packages', completed: false, comment: '' },
      { id: '3', description: 'Restart services if necessary', completed: false, comment: '' },
    ]);
  }, [manualId]);

  const completeStep = (id: string) => {
    setSteps(steps.map(step => step.id === id ? { ...step, completed: true } : step));
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const updateComment = (id: string, comment: string) => {
    setSteps(steps.map(step => step.id === id ? { ...step, comment } : step));
  };

  const resetExecution = () => {
    setSteps(steps.map(step => ({ ...step, completed: false, comment: '' })));
    setCurrentStepIndex(0);
  };

  const allStepsCompleted = steps.every(step => step.completed);

  const handleComplete = () => {
    const executionLog: ExecutionLog = {
      manualId,
      title,
      steps,
      completedAt: new Date().toISOString(),
    };
    onComplete(executionLog);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Executing: {title}</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col p-4 rounded-md ${
              index === currentStepIndex ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-4 font-medium">{index + 1}.</span>
              <span className={step.completed ? 'line-through text-gray-500' : ''}>{step.description}</span>
              <div className="ml-auto">
                {step.completed ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  index === currentStepIndex && (
                    <button
                      onClick={() => completeStep(step.id)}
                      className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <ArrowRight size={18} className="mr-1" /> Complete
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="mt-2">
              <textarea
                value={step.comment}
                onChange={(e) => updateComment(step.id, e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 text-sm border rounded-md"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>
      {allStepsCompleted && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={resetExecution}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            <RefreshCw size={18} className="mr-2" /> Reset
          </button>
          <button
            onClick={handleComplete}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <CheckCircle size={18} className="mr-2" /> Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default ManualExecutor;