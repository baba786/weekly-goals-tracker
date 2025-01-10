import React, { useState, useEffect } from 'react';
import { Plus, Target } from 'lucide-react';
import GoalItem from './GoalItem';
import SimpleGoalEditor from './SimpleGoalEditor';
import QuickGoalInput from './QuickGoalInput';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const ThingsStyleApp = ({ user }) => {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  const { user } = useAuth();

  // Load goals from API on component mount
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/goals/current`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }

        const data = await response.json();
        setGoals(data);
      } catch (err) {
        console.error('Error loading goals:', err);
        setError('Failed to load goals. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [user.token]);

  const toggleGoal = async (id) => {
    try {
      const response = await fetch(`${API_URL}/goals/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update goal');
      }

      const updatedGoal = await response.json();
      setGoals(goals.map(goal => 
        goal._id === id ? updatedGoal : goal
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update goal. Please try again.');
      console.error('Error updating goal:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Simple Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-gray-900">This Week's Focus</h1>
            {goals.length > 0 && (
              <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                {goals.filter(g => g.completed).length} of {goals.length} completed
              </span>
            )}
          </div>
          
          {/* Weekly Progress Bar */}
          {goals.length > 0 && (
            <div className="mt-4 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${(goals.filter(g => g.completed).length / goals.length) * 100}%`,
                  transition: 'width 0.5s ease-out'
                }}
              />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 shadow-sm animate-fade-in">
            <div className="flex items-center">
              <span className="font-medium">{error}</span>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 backdrop-blur-sm backdrop-filter">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Active Goals */}
              <div className="space-y-2 p-2">
                {goals.filter(g => !g.completed).map((goal) => (
                  <GoalItem
                    key={goal._id || goal.id}
                    goal={goal}
                    onToggle={toggleGoal}
                    onEdit={() => setEditingGoal(goal)}
                  />
                ))}

                {/* Add Goal Input */}
                {isAdding && (
                  <div className="p-2">
                    <QuickGoalInput
                      onSave={async (goalData) => {
                        try {
                          const response = await fetch(`${API_URL}/goals`, {
                            method: 'POST',
                            headers: {
                              'Authorization': `Bearer ${user.token}`,
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              text: goalData.text
                            })
                          });

                          if (!response.ok) {
                            throw new Error('Failed to create goal');
                          }

                          const newGoal = await response.json();
                          setGoals([...goals, newGoal]);
                          setIsAdding(false);
                        } catch (err) {
                          setError('Failed to save goal. Please try again.');
                          console.error('Error saving goal:', err);
                        }
                      }}
                      onCancel={() => setIsAdding(false)}
                    />
                  </div>
                )}

                {/* Add Button */}
                {!isAdding && goals.length < 5 && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="w-full flex items-center p-4 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    <Plus size={22} className="mr-3" />
                    <span className="text-base">Add Goal</span>
                  </button>
                )}
              </div>

              {/* Completed Goals */}
              {goals.some(g => g.completed) && (
                <div className="mt-4 pt-4 border-t border-gray-100 px-4 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium text-gray-500">Completed</h2>
                    <button
                      onClick={() => {
                        const completedGoals = goals.filter(g => g.completed);
                        // Archive completed goals
                        localStorage.setItem('archived_goals', JSON.stringify([
                          ...JSON.parse(localStorage.getItem('archived_goals') || '[]'),
                          ...completedGoals
                        ]));
                        // Remove completed goals from current list
                        const activeGoals = goals.filter(g => !g.completed);
                        setGoals(activeGoals);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(activeGoals));
                      }}
                      className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-50"
                    >
                      Archive all completed
                    </button>
                  </div>
                  <div className="space-y-1 opacity-60">
                    {goals.filter(g => g.completed).map((goal) => (
                      <GoalItem
                        key={goal._id || goal.id}
                        goal={goal}
                        onToggle={toggleGoal}
                        onEdit={() => setEditingGoal(goal)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && goals.length === 0 && !isAdding && (
          <div className="mt-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">Start Your Week with Purpose</h3>
                <p className="mt-2 text-gray-500">
                  What are the most important things you want to achieve this week?
                </p>
              </div>
              
              <button
                onClick={() => setIsAdding(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-1.5" />
                Add Your First Goal
              </button>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Tips</h4>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Focus on 3-5 key goals for the week</li>
                  <li>• Make them specific and achievable</li>
                  <li>• Start with what matters most</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Goal Editor Modal */}
        {editingGoal && (
          <SimpleGoalEditor
            goal={editingGoal}
            onSave={(updatedGoal) => {
              const updatedGoals = goals.map(g =>
                (g._id || g.id) === (updatedGoal._id || updatedGoal.id) ? updatedGoal : g
              );
              setGoals(updatedGoals);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoals));
              setEditingGoal(null);
            }}
            onClose={() => setEditingGoal(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ThingsStyleApp;