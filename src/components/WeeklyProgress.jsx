import React from 'react';
import { Trophy, Target, TrendingUp } from 'lucide-react';

const WeeklyProgress = ({ goals }) => {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.completed).length;
  const progressPercentage = totalGoals ? (completedGoals / totalGoals) * 100 : 0;
  
  const getMotivationalMessage = () => {
    if (totalGoals === 0) return "Set your first goal!";
    if (completedGoals === totalGoals) return "All goals completed! 🎉";
    if (progressPercentage >= 75) return "Almost there!";
    if (progressPercentage >= 50) return "Halfway there!";
    if (progressPercentage >= 25) return "Keep going!";
    return "You've got this!";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Weekly Progress</h2>
        <Trophy className={`h-5 w-5 ${completedGoals === totalGoals ? 'text-yellow-400' : 'text-gray-400'}`} />
      </div>
      
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div 
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <Target className="h-5 w-5 text-blue-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Total Goals</div>
            <div className="text-lg font-medium text-gray-900">{totalGoals}</div>
          </div>
        </div>
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Completed</div>
            <div className="text-lg font-medium text-gray-900">{completedGoals}</div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="text-center text-sm font-medium text-gray-600">
        {getMotivationalMessage()}
      </div>
    </div>
  );
};

export default WeeklyProgress;