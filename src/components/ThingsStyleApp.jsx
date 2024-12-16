import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, ChevronRight, Calendar } from 'lucide-react';

const ThingsStyleApp = () => {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('weeklyGoals');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  
  useEffect(() => {
    localStorage.setItem('weeklyGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (text) => {
    if (goals.length >= 5 || !text.trim()) return;
    setGoals([...goals, { 
      id: Date.now(), 
      text: text.trim(), 
      completed: false 
    }]);
    setNewGoal('');
    setIsAdding(false);
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newGoal.trim()) {
      addGoal(newGoal);
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewGoal('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100/80 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Area */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">This Week</h1>
            <p className="text-sm text-gray-500 mt-1">
              {goals.filter(g => g.completed).length} of {goals.length} completed
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Calendar size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/50">
          {/* Goals List */}
          <div className="divide-y divide-gray-100">
            {goals.map((goal, index) => (
              <div 
                key={goal.id}
                className={`group flex items-center p-4 hover:bg-gray-50 transition-colors
                  ${index === 0 ? 'rounded-t-xl' : ''} 
                  ${index === goals.length - 1 && !isAdding ? 'rounded-b-xl' : ''}`}
              >
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className="flex-shrink-0 mr-3 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {goal.completed ? 
                    <CheckCircle2 size={22} className="text-blue-500" /> : 
                    <Circle size={22} />
                  }
                </button>
                <span className={`flex-grow text-base ${
                  goal.completed ? 'text-gray-400 line-through' : 'text-gray-900'
                }`}>
                  {goal.text}
                </span>
                <ChevronRight size={18} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}

            {/* Add Goal Input */}
            {isAdding && (
              <div className="p-4 bg-gray-50/50">
                <input
                  autoFocus
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={() => {
                    if (newGoal.trim()) addGoal(newGoal);
                    else setIsAdding(false);
                  }}
                  placeholder="New Goal"
                  className="w-full bg-transparent text-base text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
            )}
          </div>

          {/* Add Button */}
          {!isAdding && goals.length < 5 && (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center p-4 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-b-xl transition-colors"
            >
              <Plus size={22} className="mr-3" />
              <span className="text-base">Add Goal</span>
            </button>
          )}
        </div>

        {/* Quick Tips */}
        {goals.length === 0 && !isAdding && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Set up to 5 key goals for this week.</p>
            <p>Keep them achievable and specific.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThingsStyleApp;