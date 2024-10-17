import React, { useState } from 'react';
import { Book, CheckSquare, Edit3, Plus, History } from 'lucide-react';
import ManualList from './components/ManualList';
import ManualEditor from './components/ManualEditor';
import ManualExecutor from './components/ManualExecutor';
import ExecutionHistory from './components/ExecutionHistory';

type View = 'list' | 'editor' | 'executor' | 'history';

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

function App() {
  const [view, setView] = useState<View>('list');
  const [selectedManual, setSelectedManual] = useState<string | null>(null);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);

  const handleExecutionComplete = (log: ExecutionLog) => {
    setExecutionLogs([log, ...executionLogs]);
    setView('list');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center">
            <Book className="mr-2" /> ProcedurePro
          </h1>
          <nav>
            <button
              onClick={() => setView('list')}
              className={`mx-2 px-3 py-2 rounded-md ${
                view === 'list' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CheckSquare className="inline-block mr-1" /> Manuals
            </button>
            <button
              onClick={() => {
                setView('editor');
                setSelectedManual(null);
              }}
              className={`mx-2 px-3 py-2 rounded-md ${
                view === 'editor' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Plus className="inline-block mr-1" /> New Manual
            </button>
            <button
              onClick={() => setView('history')}
              className={`mx-2 px-3 py-2 rounded-md ${
                view === 'history' ? 'bg-indigo-100 text-indigo-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History className="inline-block mr-1" /> History
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'list' && (
          <ManualList
            onEdit={(manualId) => {
              setSelectedManual(manualId);
              setView('editor');
            }}
            onExecute={(manualId) => {
              setSelectedManual(manualId);
              setView('executor');
            }}
          />
        )}
        {view === 'editor' && (
          <ManualEditor
            manualId={selectedManual}
            onSave={() => setView('list')}
          />
        )}
        {view === 'executor' && selectedManual && (
          <ManualExecutor
            manualId={selectedManual}
            onComplete={handleExecutionComplete}
          />
        )}
        {view === 'history' && (
          <ExecutionHistory logs={executionLogs} />
        )}
      </main>
    </div>
  );
}

export default App;