import React from 'react';
import { Star, CheckCircle2, ArrowRight, Calendar, Target, Zap, Brain, Trophy } from 'lucide-react';

const HomePage = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="relative pt-6 pb-16 sm:pb-24">
        <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Focus on What</span>
              <span className="block text-blue-600">Really Matters</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Set meaningful weekly goals, track your progress, and achieve more with a beautifully simple interface designed for focus and productivity.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={onGetStarted}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base font-semibold uppercase tracking-wider text-blue-600">
            Why WeeklyGoals?
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Everything you need to stay focused and productive
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Simple, powerful tools to help you achieve your goals and make consistent progress.
          </p>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <Target className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Weekly Focus</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Set up to 5 key goals each week to maintain clarity and focus on what truly matters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                        <Zap className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Stay Motivated</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Track your progress and celebrate achievements with visual progress indicators.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                        <Brain className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Build Habits</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Develop consistent habits by focusing on weekly achievements and progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview Section */}
      <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
        <div className="relative">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-base font-semibold uppercase tracking-wider text-blue-600">
              How it works
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Simple and effective goal tracking
            </p>

            {/* App Demo */}
            <div className="mt-12 bg-white rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    <span className="block">Ready to get started?</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-gray-500">
                    Join thousands of users who are achieving their goals one week at a time.
                  </p>
                  <button
                    onClick={onGetStarted}
                    className="mt-8 bg-blue-600 border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-blue-700"
                  >
                    Start Now
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="relative -mt-6">
                <div className="transform translate-x-6 translate-y-6 rounded-md sm:translate-x-16 lg:translate-y-20">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-medium text-gray-900">This Week</h2>
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              Terms
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 WeeklyGoals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;