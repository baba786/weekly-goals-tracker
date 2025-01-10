import React from 'react';
import { Trophy, Target, TrendingUp, Calendar } from 'lucide-react';

const ProgressChart = ({ goals }) => {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.completed).length;
  const progress = totalGoals ? (completedGoals / totalGoals) * 100 : 0;

  const getMotivationalMessage = () => {
    if (totalGoals === 0) return "Set your first goal!";
    if (completedGoals === totalGoals) return "All goals completed! 🎉";
    if (progress >= 75) return "Almost there!";
    if (progress >= 50) return "Halfway there!";
    if (progress >= 25) return "Keep going!";
    return "You've got this!";
  };

  const categoryCounts = goals.reduce((acc, goal) => {
    acc[goal.category] = (acc[goal.category] || 0) + 1;
    return acc;
  }, {});

  const categories = {
    work: { label: 'Work', icon: '💼', color: 'bg-blue-500' },
    personal: { label: 'Personal', icon: '🎯', color: 'bg-green-500' },
    health: { label: 'Health', icon: '💪', color: 'bg-red-500' },
    learning: { label: 'Learning', icon: '📚', color: 'bg-purple-500' },
    creative: { label: 'Creative', icon: '🎨', color: 'bg-pink-500' }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
      {/* Progress Header */}
      <div className="px-6 py-5 border-b border-gray-200/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Weekly Progress</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">This Week</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-semibold text-gray-900">{totalGoals}</div>
            <div className="text-sm text-gray-500">Total Goals</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">{completedGoals}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">{Math.round(progress)}%</div>
            <div className="text-sm text-gray-500">Progress</div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="px-6 py-5">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Category Distribution</h4>
        <div className="space-y-3">
          {Object.entries(categories).map(([key, category]) => {
            const count = categoryCounts[key] || 0;
            const categoryProgress = count ? (goals.filter(g => g.category === key && g.completed).length / count) * 100 : 0;
            
            return (
              <div key={key} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{category.label}</span>
                  </div>
                  <span className="text-sm text-gray-500">{count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} transition-all duration-500`}
                    style={{ width: `${categoryProgress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Message */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200/50">
        <div className="flex items-center justify-center text-sm font-medium text-gray-700">
          <Trophy className={`h-5 w-5 mr-2 ${completedGoals === totalGoals ? 'text-yellow-500' : 'text-gray-400'}`} />
          {getMotivationalMessage()}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;