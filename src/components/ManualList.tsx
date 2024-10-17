import React from 'react';
import { Edit3, Play } from 'lucide-react';

interface Manual {
  id: string;
  title: string;
  description: string;
}

interface ManualListProps {
  onEdit: (manualId: string) => void;
  onExecute: (manualId: string) => void;
}

const dummyManuals: Manual[] = [
  { id: '1', title: 'Server Maintenance', description: 'Steps for routine server maintenance' },
  { id: '2', title: 'New Employee Onboarding', description: 'Process for onboarding new team members' },
  { id: '3', title: 'Product Release Checklist', description: 'Checklist for releasing a new product version' },
];

const ManualList: React.FC<ManualListProps> = ({ onEdit, onExecute }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Procedure Manuals</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dummyManuals.map((manual) => (
          <div key={manual.id} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">{manual.title}</h3>
            <p className="text-gray-600 mb-4">{manual.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onEdit(manual.id)}
                className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Edit3 size={18} className="mr-1" /> Edit
              </button>
              <button
                onClick={() => onExecute(manual.id)}
                className="flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <Play size={18} className="mr-1" /> Execute
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualList;