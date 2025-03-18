import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Target, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  BarChart2, 
  CheckCheck, 
  Clock,
  Menu,
  X,
  Settings,
  ChevronDown,
  RotateCcw,
  HelpCircle,
  Shield,
  Focus,
  Award
} from 'lucide-react';
import GoalItem from './GoalItem';
import SimpleGoalEditor from './SimpleGoalEditor';
import QuickGoalInput from './QuickGoalInput';
import { useAuth } from '../context/AuthContext';
import MindfulMessage from './MindfulMessage';
import ProgressChart from './ProgressChart';

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = 'weekly_goals';

// Animated loader component
const Loader = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Target className="h-10 w-10 text-blue-600 animate-pulse" />
      </div>
    </div>
    <p className="mt-4 text-gray-500 animate-pulse">Loading your goals...</p>
  </div>
);

// Panel component for consistent styling
const Panel = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden ${className}`}>
    {children}
  </div>
);

// Stats card component
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transform transition-all duration-200 hover:shadow-md hover:-translate-y-1">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg text-blue-600">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// Button with transparent background
const GhostButton = ({ children, onClick, className = "", icon: Icon }) => (
  <button 
    onClick={onClick}
    className={`flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all ${className}`}
  >
    {Icon && <Icon size={16} className="mr-2" />}
    {children}
  </button>
);

// Button with solid background
const SolidButton = ({ children, onClick, className = "", icon: Icon, disabled = false }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {Icon && <Icon size={18} className="mr-2" />}
    {children}
  </button>
);

// Get week start and end dates
const getWeekDates = (weekNumber, year) => {
  const simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  const day = simple.getDay();
  const startDate = new Date(simple);
  const endDate = new Date(simple);
  
  // Adjust to get Monday as first day
  startDate.setDate(simple.getDate() - day + (day === 0 ? -6 : 1));
  // Adjust to get Sunday as last day
  endDate.setDate(simple.getDate() - day + (day === 0 ? 0 : 7));
  
  return { startDate, endDate };
};

// Format date as "Apr 3" or "Apr 3 - Apr 9"
const formatDate = (date) => {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Get current week and year
const getCurrentWeekAndYear = () => {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const dayNum = Math.round(((now - oneJan) / 86400000) + 1);
  const weekNum = Math.ceil((dayNum + oneJan.getDay()) / 7);
  
  return {
    week: weekNum,
    year: now.getFullYear()
  };
};

const ThingsStyleApp = () => {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMindful, setShowMindful] = useState(false);
  const [view, setView] = useState('current'); // 'current', 'stats', 'archive'
  const [dateRange, setDateRange] = useState(getCurrentWeekAndYear());
  const [weeklyStats, setWeeklyStats] = useState({
    completion: 0,
    streak: 0,
    total: 0
  });
  const sidebarRef = useRef(null);

  const { user } = useAuth();

  // Handle clicks outside sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    }
    
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  // Load goals from API on component mount or when date range changes
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, we would pass week and year to the API
        // For demo purposes, we'll only use the real endpoint for the current week
        const { week, year } = dateRange;
        const currentWeekYear = getCurrentWeekAndYear();
        
        // Check if we're viewing the current week
        const isCurrentWeek = week === currentWeekYear.week && year === currentWeekYear.year;
        
        if (isCurrentWeek) {
          const response = await fetch(`${API_URL}/goals/current`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch goals');
          }

          const data = await response.json();
          setGoals(data);
          
          // Calculate statistics
          const completedCount = data.filter(g => g.completed).length;
          const totalCount = data.length;
          const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          
          setWeeklyStats({
            completion: completionRate,
            streak: localStorage.getItem('streak') || 0,
            total: totalCount
          });
        } else {
          // For demo purposes, generate some mock data for past/future weeks
          const mockData = generateMockGoalsData(week, year);
          setGoals(mockData);
          
          // Calculate mock statistics
          const completedCount = mockData.filter(g => g.completed).length;
          const totalCount = mockData.length;
          const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          
          setWeeklyStats({
            completion: completionRate,
            streak: week < currentWeekYear.week ? Math.floor(Math.random() * 5) : 0,
            total: totalCount
          });
        }
        
        // Show mindfulness message occasionally
        if (Math.random() > 0.7) {
          setShowMindful(true);
        }
      } catch (err) {
        console.error('Error loading goals:', err);
        setError('Failed to load goals. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [user.token, dateRange]);

  // Navigate to previous week
  const goToPreviousWeek = () => {
    setDateRange(prev => {
      let newWeek = prev.week - 1;
      let newYear = prev.year;
      
      if (newWeek < 1) {
        newWeek = 52;
        newYear -= 1;
      }
      
      return { week: newWeek, year: newYear };
    });
  };

  // Navigate to next week
  const goToNextWeek = () => {
    setDateRange(prev => {
      let newWeek = prev.week + 1;
      let newYear = prev.year;
      
      if (newWeek > 52) {
        newWeek = 1;
        newYear += 1;
      }
      
      return { week: newWeek, year: newYear };
    });
  };

  // Go to current week
  const goToCurrentWeek = () => {
    setDateRange(getCurrentWeekAndYear());
  };

  // Toggle goal completion
  const toggleGoal = async id => {
    try {
      const response = await fetch(`${API_URL}/goals/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update goal');
      }

      const updatedGoal = await response.json();
      setGoals(goals.map(goal => (goal._id === id ? updatedGoal : goal)));
      setError(null);
      
      // Update statistics
      if (updatedGoal.completed) {
        // Increase streak for demo purposes
        const currentStreak = parseInt(localStorage.getItem('streak') || '0');
        localStorage.setItem('streak', (currentStreak + 1).toString());
      }
    } catch (err) {
      setError('Failed to update goal. Please try again.');
      console.error('Error updating goal:', err);
    }
  };

  // Generate mock data for demo purposes (past/future weeks)
  const generateMockGoalsData = (week, year) => {
    const currentWeekYear = getCurrentWeekAndYear();
    const isPast = year < currentWeekYear.year || 
                  (year === currentWeekYear.year && week < currentWeekYear.week);
    
    const count = Math.floor(Math.random() * 3) + 2; // 2 to 4 goals
    
    return Array.from({ length: count }, (_, i) => {
      return {
        _id: `mock-${week}-${year}-${i}`,
        text: [
          "Complete project proposal",
          "Exercise 3 times this week",
          "Schedule quarterly planning",
          "Update portfolio website",
          "Review financial goals",
          "Complete online course",
          "Organize team meeting",
          "Plan summer vacation",
          "Update resume",
          "Fix garden irrigation"
        ][Math.floor(Math.random() * 10)],
        completed: isPast ? Math.random() > 0.3 : false,
        weekNumber: week,
        year: year,
        createdAt: new Date().toISOString()
      };
    });
  };

  // Get date range string for current week
  const { startDate, endDate } = getWeekDates(dateRange.week, dateRange.year);
  const dateRangeText = `${formatDate(startDate)} - ${formatDate(endDate)}`;
  
  // Check if we're on the current week
  const currentWeekYear = getCurrentWeekAndYear();
  const isCurrentWeek = dateRange.week === currentWeekYear.week && 
                        dateRange.year === currentWeekYear.year;

  // Get completion percentage
  const completedCount = goals.filter(g => g.completed).length;
  const totalCount = goals.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  // Progress categories
  let progressStatus = "Not started";
  let progressColor = "text-gray-500";
  
  if (completionPercentage === 100 && totalCount > 0) {
    progressStatus = "Complete!";
    progressColor = "text-green-600";
  } else if (completionPercentage >= 75) {
    progressStatus = "Almost there!";
    progressColor = "text-blue-600";
  } else if (completionPercentage >= 50) {
    progressStatus = "Halfway there";
    progressColor = "text-blue-500";
  } else if (completionPercentage > 0) {
    progressStatus = "In progress";
    progressColor = "text-blue-400";
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80">
      {/* Header Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm fixed w-full top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(true)}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-xl font-medium text-gray-900 hidden sm:block">Weekly Goals</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {view === 'current' && (
                <>
                  <GhostButton 
                    onClick={goToPreviousWeek} 
                    icon={ChevronLeft} 
                    className="rounded-l-lg rounded-r-none border-r-0"
                  >
                    <span className="sr-only sm:not-sr-only">Previous</span>
                  </GhostButton>
                  
                  <div className="px-3 py-2 bg-white border border-gray-200 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-gray-700">{dateRangeText}</span>
                    </div>
                  </div>
                  
                  <GhostButton 
                    onClick={goToNextWeek} 
                    icon={ChevronRight} 
                    className="rounded-r-lg rounded-l-none border-l-0"
                  >
                    <span className="sr-only sm:not-sr-only">Next</span>
                  </GhostButton>
                  
                  {!isCurrentWeek && (
                    <GhostButton onClick={goToCurrentWeek} icon={RotateCcw}>
                      Today
                    </GhostButton>
                  )}
                </>
              )}
              
              {view === 'stats' && (
                <div className="text-lg font-medium text-gray-900">Your Progress</div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm">
          <div 
            ref={sidebarRef}
            className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out"
          >
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Goals</h2>
              <button 
                onClick={() => setShowSidebar(false)}
                className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      setView('current');
                      setDateRange(getCurrentWeekAndYear());
                      setShowSidebar(false);
                    }}
                    className={`flex items-center w-full p-2 rounded-lg transition-colors ${view === 'current' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Target size={18} className="mr-3" />
                    Current Goals
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setView('stats');
                      setShowSidebar(false);
                    }}
                    className={`flex items-center w-full p-2 rounded-lg transition-colors ${view === 'stats' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <BarChart2 size={18} className="mr-3" />
                    Statistics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setShowMindful(true);
                      setShowSidebar(false); 
                    }}
                    className="flex items-center w-full p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Focus size={18} className="mr-3" />
                    Mindfulness Tips
                  </button>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Account
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <button 
                      className="flex items-center w-full p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Settings size={18} className="mr-3" />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button 
                      className="flex items-center w-full p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <HelpCircle size={18} className="mr-3" />
                      Help & Support
                    </button>
                  </li>
                  <li>
                    <button 
                      className="flex items-center w-full p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Shield size={18} className="mr-3" />
                      Privacy
                    </button>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex items-center px-2 py-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Current View */}
        {view === 'current' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Goals */}
            <div className="lg:col-span-8 space-y-6">
              {/* Weekly progress */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-baseline">
                    <h2 className="text-xl font-semibold text-gray-900">Weekly Progress</h2>
                    <span className={`ml-2 text-sm ${progressColor}`}>
                      {progressStatus}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {completedCount} of {totalCount} goals completed
                  </p>
                </div>
                
                {isCurrentWeek && totalCount > 0 && (
                  <div className="flex items-center space-x-2">
                    {completionPercentage < 100 ? (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={14} className="mr-1" />
                        <span>
                          {7 - new Date().getDay()} days left
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <CheckCheck size={16} className="mr-1" />
                        <span>All goals completed!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-1000 ease-out-expo"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 shadow-sm animate-fade-in">
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
              {isLoading ? (
                <Loader />
              ) : (
                <Panel>
                  {/* Active Goals */}
                  <div className="divide-y divide-gray-100">
                    <div className="p-4 bg-gray-50 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-700">Active Goals</h3>
                    </div>
                    
                    <div className="p-2">
                      {goals.filter(g => !g.completed).length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-gray-500">No active goals.</p>
                          {isCurrentWeek && (
                            <p className="mt-1 text-sm text-gray-400">
                              Add a goal to start tracking your progress.
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {goals
                            .filter(g => !g.completed)
                            .map(goal => (
                              <GoalItem
                                key={goal._id || goal.id}
                                goal={goal}
                                onToggle={toggleGoal}
                                onEdit={() => setEditingGoal(goal)}
                              />
                            ))}
                        </div>
                      )}

                      {/* Add Goal Input */}
                      {isAdding && isCurrentWeek && (
                        <div className="p-2 animate-fade-in">
                          <QuickGoalInput
                            onSave={async goalData => {
                              try {
                                const response = await fetch(`${API_URL}/goals`, {
                                  method: 'POST',
                                  headers: {
                                    Authorization: `Bearer ${user.token}`,
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    text: goalData.text,
                                  }),
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
                      {!isAdding && isCurrentWeek && goals.length < 5 && (
                        <div className="p-2">
                          <button
                            onClick={() => setIsAdding(true)}
                            className="w-full flex items-center p-4 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          >
                            <Plus size={20} className="mr-3" />
                            <span className="text-base">Add Goal</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Completed Goals */}
                    {goals.some(g => g.completed) && (
                      <>
                        <div className="p-4 bg-gray-50 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-700">Completed</h3>
                            <button
                              onClick={() => {
                                const activeGoals = goals.filter(g => !g.completed);
                                setGoals(activeGoals);
                              }}
                              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                            >
                              Hide completed
                            </button>
                          </div>
                        </div>
                        
                        <div className="divide-y divide-gray-50">
                          {goals
                            .filter(g => g.completed)
                            .map(goal => (
                              <GoalItem
                                key={goal._id || goal.id}
                                goal={goal}
                                onToggle={isCurrentWeek ? toggleGoal : undefined}
                                onEdit={isCurrentWeek ? () => setEditingGoal(goal) : undefined}
                              />
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                </Panel>
              )}
              
              {/* Empty State */}
              {!isLoading && goals.length === 0 && !isAdding && isCurrentWeek && (
                <div className="mt-6 text-center bg-white rounded-xl shadow-sm border border-gray-200/50 p-8">
                  <div className="max-w-sm mx-auto">
                    <div className="mb-6 animate-fade-in">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900">Start Your Week with Purpose</h3>
                      <p className="mt-2 text-gray-500">
                        What are the most important things you want to achieve this week?
                      </p>
                    </div>

                    <SolidButton
                      onClick={() => setIsAdding(true)}
                      icon={Plus}
                      className="mx-auto"
                    >
                      Add Your First Goal
                    </SolidButton>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Tips</h4>
                      <ul className="text-sm text-gray-500 space-y-2">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Focus on 3-5 key goals for the week
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Make them specific and achievable
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Start with what matters most
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {!isCurrentWeek && goals.length === 0 && !isLoading && (
                <div className="mt-6 text-center bg-white rounded-xl shadow-sm border border-gray-200/50 p-8">
                  <div className="max-w-sm mx-auto">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900">No Goals Found</h3>
                      <p className="mt-2 text-gray-500">
                        {dateRange.year < currentWeekYear.year || 
                        (dateRange.year === currentWeekYear.year && dateRange.week < currentWeekYear.week)
                          ? "You didn't set any goals for this week."
                          : "This week is in the future. Come back later to set goals."}
                      </p>
                    </div>

                    <GhostButton
                      onClick={goToCurrentWeek}
                      icon={RotateCcw}
                      className="mx-auto"
                    >
                      Go to Current Week
                    </GhostButton>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Stats */}
            <div className="lg:col-span-4 space-y-6">
              {/* Weekly Stats */}
              <Panel className="overflow-visible">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700">Week at a Glance</h3>
                </div>
                
                <div className="p-6 space-y-5">
                  {/* Completion circle */}
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="10"
                          strokeDasharray="282.7"
                          strokeDashoffset={282.7 - (282.7 * completionPercentage) / 100}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#4f46e5" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">
                          {Math.round(completionPercentage)}%
                        </span>
                        <span className="text-sm text-gray-500">Complete</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Streak</div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-800 mr-1">
                          {weeklyStats.streak}
                        </span>
                        <span className="text-xs text-gray-500">days</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Total Goals</div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-800 mr-1">
                          {weeklyStats.total}
                        </span>
                        <span className="text-xs text-gray-500">tasks</span>
                      </div>
                    </div>
                  </div>
                  
                  {isCurrentWeek && completionPercentage === 100 && goals.length > 0 && (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-4 text-center">
                      <div className="flex items-center justify-center text-green-600 mb-1">
                        <Award className="w-5 h-5 mr-1" />
                        <span className="font-medium">All Goals Completed!</span>
                      </div>
                      <p className="text-sm text-green-600">
                        You're doing great. Keep up the momentum!
                      </p>
                    </div>
                  )}
                </div>
              </Panel>
              
              {/* Mindfulness Tips */}
              <Panel>
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700">Mindfulness Tip</h3>
                </div>
                <div className="p-4">
                  <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-700">
                    "Focus on progress, not perfection. Small steps consistently taken lead to big changes over time."
                  </blockquote>
                  <div className="mt-3 text-right">
                    <button 
                      onClick={() => setShowMindful(true)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      More tips
                    </button>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        )}
        
        {/* Stats View */}
        {view === 'stats' && (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900">Your Goal Journey</h2>
              <p className="mt-2 text-gray-600">
                Track your progress and celebrate your wins over time
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                icon={CheckCheck} 
                label="Goals Completed" 
                value={Math.floor(Math.random() * 30) + 20} 
              />
              <StatCard 
                icon={Award} 
                label="Completion Rate" 
                value={`${Math.floor(Math.random() * 30) + 70}%`} 
              />
              <StatCard 
                icon={Target} 
                label="Weekly Streak" 
                value={`${Math.floor(Math.random() * 5) + 2} weeks`} 
              />
            </div>
            
            <Panel>
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">Weekly Completion Rate</h3>
              </div>
              <div className="p-6">
                <ProgressChart />
              </div>
            </Panel>
            
            <Panel>
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">Recent Achievements</h3>
              </div>
              <div className="p-4 divide-y divide-gray-100">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="py-4 flex items-start">
                    <div className="flex-shrink-0 bg-green-50 rounded-full p-2 mr-4">
                      <CheckCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {[
                          "Completed all goals for the week",
                          "Achieved 3-week streak",
                          "First perfect week",
                          "Set goals 5 weeks in a row",
                          "Completed 25 goals overall"
                        ][i]}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {[
                          "2 days ago",
                          "Last week",
                          "2 weeks ago",
                          "3 weeks ago",
                          "Last month"
                        ][i]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}
      </main>

      {/* Goal Editor Modal */}
      {editingGoal && (
        <SimpleGoalEditor
          goal={editingGoal}
          onSave={async updatedGoal => {
            try {
              const response = await fetch(`${API_URL}/goals/${updatedGoal._id}`, {
                method: 'PATCH',
                headers: {
                  Authorization: `Bearer ${user.token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: updatedGoal.text }),
              });

              if (!response.ok) {
                throw new Error('Failed to update goal');
              }

              const savedGoal = await response.json();
              setGoals(goals.map(g => (g._id === savedGoal._id ? savedGoal : g)));
              setEditingGoal(null);
              setError(null);
            } catch (err) {
              setError('Failed to update goal. Please try again.');
              console.error('Error updating goal:', err);
            }
          }}
          onClose={() => setEditingGoal(null)}
        />
      )}
      
      {/* Mindfulness Modal */}
      {showMindful && (
        <MindfulMessage onClose={() => setShowMindful(false)} />
      )}
    </div>
  );
};

export default ThingsStyleApp;