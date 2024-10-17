import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface ManualEditorProps {
  manualId: string | null;
  onSave: () => void;
}

interface Step {
  id: string;
  description: string;
}

const ManualEditor: React.FC<ManualEditorProps> = ({ manualId, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<Step[]>([{ id: '1', description: '' }]);

  useEffect(() => {
    if (manualId) {
      // TODO: Fetch manual data based on manualId
      // For now, we'll use dummy data
      setTitle('Server Maintenance');
      setDescription('Steps for routine server maintenance');
      setSteps([
        { id: '1', description: 'Check server logs for errors' },
        { id: '2', description: 'Update system packages' },
        { id: '3', description: 'Restart services if necessary' },
      ]);
    } else {
      // Reset form for new manual
      setTitle('');
      setDescription('');
      setSteps([{ id: '1', description: '' }]);
    }
  }, [manualId]);

  const addStep = () => {
    setSteps([...steps, { id: Date.now().toString(), description: '' }]);
  };

  const updateStep = (id: string, description: string) => {
    setSteps(steps.map(step => step.id === id ? { ...step, description } : step));
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log({ title, description, steps });
    onSave();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{manualId ? 'Edit Manual' : 'Create New Manual'}</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Steps</h3>
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-2 mb-2">
              <span className="font-medium">{index + 1}.</span>
              <input
                type="text"
                value={step.description}
                onChange={(e) => updateStep(step.id, e.target.value)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button onClick={() => removeStep(step.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button onClick={addStep} className="flex items-center text-indigo-600 hover:text-indigo-800">
            <Plus size={18} className="mr-1" /> Add Step
          </button>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Save size={18} className="mr-2" /> Save Manual
        </button>
      </div>
    </div>
  );
};

export default ManualEditor;