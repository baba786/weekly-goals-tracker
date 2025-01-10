import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

const DemoGoal = ({ text, delay = 0, onComplete }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    if (!checked) onComplete?.();
  };

  return (
    <div
      className={`flex items-center p-3 rounded-lg transition-all duration-300 animate-slide-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <button onClick={handleCheck} className="flex-shrink-0 mr-3 focus:outline-none group">
        {checked ? (
          <CheckCircle2 className="w-5 h-5 text-green-500 animate-checkmark" />
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-gray-400" />
        )}
      </button>
      <span className={checked ? 'text-gray-500 line-through' : 'text-gray-700'}>{text}</span>
    </div>
  );
};

const LandingPage = ({ onGetStarted }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const totalGoals = 4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-6">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Mindful Goal Setting
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Less Goals.
                <br />
                More Impact.
              </h1>
              <p className="mt-6 text-lg text-gray-500">
                Most goal trackers overwhelm you with endless lists. We help you focus on just 5
                meaningful goals each week. Because sometimes, less is more.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Start Your Week
                  <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                </button>
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Try Demo
                </button>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mt-12 space-y-10">
              <div className="relative">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                  Focus on What Matters
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  By limiting to 5 goals per week, you're forced to prioritize what truly matters.
                  No more endless to-do lists.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                  Celebrate Every Win
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Each completed goal is celebrated with delightful animations. Because small wins
                  lead to big achievements.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="mt-16 lg:mt-0 lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">This Week's Focus</h2>
                  <p className="text-sm text-gray-500">Try it out!</p>
                </div>
                <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{ width: `${(completedCount / totalGoals) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <DemoGoal
                  text="Launch new product feature"
                  delay={0}
                  onComplete={() => setCompletedCount(c => c + 1)}
                />
                <DemoGoal
                  text="Exercise 3 times this week"
                  delay={100}
                  onComplete={() => setCompletedCount(c => c + 1)}
                />
                <DemoGoal
                  text="Write blog post about mindfulness"
                  delay={200}
                  onComplete={() => setCompletedCount(c => c + 1)}
                />
                <DemoGoal
                  text="Plan next quarter's goals"
                  delay={300}
                  onComplete={() => setCompletedCount(c => c + 1)}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center text-sm text-gray-500">
                  <p>Limited to 5 goals per week.</p>
                  <p className="text-xs mt-1">Because focus beats quantity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
