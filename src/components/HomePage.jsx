import React from 'react';
import { Star, CheckCircle2, ArrowRight, Calendar, Target } from 'lucide-react';

const HomePage = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-gray-100/80">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-medium text-gray-900">WeeklyGoals</span>
            </div>
            <button 
              onClick={onEnterApp}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Open App
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Focus on What Matters
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Set up to five key goals each week. Stay focused, track progress, and achieve more with a beautifully simple interface.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <button
              onClick={onEnterApp}
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Start Planning
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Focus on Five</h3>
              </div>
              <p className="text-base text-gray-500">
                Set a maximum of five goals each week to maintain focus on what truly matters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="flex items-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Track Progress</h3>
              </div>
              <p className="text-base text-gray-500">
                Mark goals as complete and watch your progress grow throughout the week.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Weekly Reset</h3>
              </div>
              <p className="text-base text-gray-500">
                Start fresh each week with a clean slate and new goals to achieve.
              </p>
            </div>
          </div>
        </div>

        {/* App Preview */}
        <div className="mt-24">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-medium text-gray-900">Preview</h2>
                <p className="text-sm text-gray-500 mt-1">2 of 3 completed</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-400 line-through">Complete project presentation</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-400 line-through">Review quarterly goals</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3" />
                <span className="text-gray-900">Plan next sprint</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;