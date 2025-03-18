import React, { useState, useEffect, useRef } from 'react';
import { Target, CheckCircle2, Sparkles, ArrowRight, BarChart2, Award, Calendar, CheckCheck } from 'lucide-react';

// Enhanced animation for goal completion
const DemoGoal = ({ text, delay = 0, onComplete, isHighlighted = false }) => {
  const [checked, setChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCheck = () => {
    setChecked(!checked);
    if (!checked) onComplete?.();
  };

  return (
    <div
      className={`flex items-center p-4 rounded-lg transition-all duration-300 animate-slide-up ${
        isHighlighted ? 'bg-blue-50/50' : isHovered ? 'bg-gray-50' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={handleCheck} 
        className={`flex-shrink-0 mr-3 focus:outline-none group relative ${
          isHovered && !checked ? 'animate-pulse-subtle' : ''
        }`}
      >
        {checked ? (
          <CheckCircle2 className="w-5 h-5 text-green-500 animate-checkmark" />
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-400 transition-colors" />
        )}
      </button>
      <span className={`font-medium transition-all duration-200 ${
        checked ? 'text-gray-400 line-through' : 'text-gray-700'
      }`}>
        {text}
      </span>
    </div>
  );
};

// Animated statistics component
const AnimatedStat = ({ value, label, icon: Icon, delay = 0 }) => {
  const [counted, setCounted] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const duration = 1500; // ms
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function for smooth animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCounted(Math.floor(easedProgress * value));
      
      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, isVisible]);
  
  return (
    <div
      ref={ref}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="flex items-center mb-3">
        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
          <Icon size={18} />
        </div>
        <h3 className="ml-3 text-lg font-semibold text-gray-800">{label}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900">
        {counted}
        <span className="text-blue-500">+</span>
      </p>
    </div>
  );
};

const LandingPage = ({ onGetStarted }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const totalGoals = 4;
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <div 
        ref={heroRef}
        className="relative pt-16 pb-32 overflow-hidden"
        style={{ 
          background: 'linear-gradient(150deg, #f9fafb 0%, #eef2ff 100%)'
        }}
      >
        {/* Floating shapes for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-50 to-blue-100 rounded-full opacity-60 blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          />
          <div 
            className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-blue-50 to-purple-100 rounded-full opacity-50 blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          />
          <div 
            className="absolute top-1/3 left-1/3 w-10 h-10 border-4 border-blue-200 rounded-lg opacity-20"
            style={{ transform: `rotate(${scrollY * 0.1}deg) translateY(${scrollY * -0.2}px)` }}
          />
          <div 
            className="absolute top-1/2 right-1/4 w-6 h-6 bg-blue-300 rounded-full opacity-20"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <div 
            className="absolute bottom-1/3 left-1/4 w-8 h-8 border-4 border-purple-200 rounded-full opacity-20"
            style={{ transform: `translateX(${scrollY * -0.1}px)` }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="lg:col-span-6 z-10">
              <div className="text-center lg:text-left">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6 animate-slide-up"
                  style={{ animationDelay: '200ms' }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold">
                    Mindful Goal Setting
                  </span>
                </div>
                
                <h1 
                  className="text-5xl md:text-6xl font-bold tracking-tight animate-slide-up"
                  style={{ animationDelay: '300ms', lineHeight: 1.1 }}
                >
                  <span className="block text-gray-900">Focus on what</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">truly matters.</span>
                </h1>
                
                <p 
                  className="mt-6 text-xl text-gray-600 leading-relaxed animate-slide-up"
                  style={{ animationDelay: '400ms' }}
                >
                  Most goal trackers overwhelm you with endless lists. We help you focus on just 5
                  meaningful goals each week. Because sometimes, <span className="font-semibold">less is more</span>.
                </p>
                
                <div 
                  className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up"
                  style={{ animationDelay: '500ms' }}
                >
                  <button
                    onClick={onGetStarted}
                    className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    Start Your Week
                    <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={onGetStarted}
                    className="inline-flex items-center px-8 py-4 border border-gray-200 text-base font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    Try Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Demo */}
            <div 
              className="mt-16 lg:mt-0 lg:col-span-6 z-10 animate-slide-up"
              style={{ animationDelay: '600ms' }}
            >
              <div className="relative">
                {/* Decorative elements */}
                <div 
                  className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg transform rotate-6 opacity-80"
                  style={{ zIndex: -1 }}
                />
                <div 
                  className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg transform -rotate-6 opacity-80"
                  style={{ zIndex: -1 }}
                />
                
                {/* The card */}
                <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-900/5 p-8 transform transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">This Week's Focus</h2>
                      <p className="text-sm text-gray-500 mt-1">Try checking the goals below!</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {completedCount} of {totalGoals}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-700 ease-out-expo"
                      style={{ width: `${(completedCount / totalGoals) * 100}%` }}
                    />
                  </div>

                  <div className="space-y-1">
                    <DemoGoal
                      text="Launch new product feature"
                      delay={700}
                      onComplete={() => setCompletedCount(c => c + 1)}
                      isHighlighted={completedCount === 0}
                    />
                    <DemoGoal
                      text="Exercise 3 times this week"
                      delay={800}
                      onComplete={() => setCompletedCount(c => c + 1)}
                      isHighlighted={completedCount === 1}
                    />
                    <DemoGoal
                      text="Write blog post about mindfulness"
                      delay={900}
                      onComplete={() => setCompletedCount(c => c + 1)}
                      isHighlighted={completedCount === 2}
                    />
                    <DemoGoal
                      text="Plan next quarter's goals"
                      delay={1000}
                      onComplete={() => setCompletedCount(c => c + 1)}
                      isHighlighted={completedCount === 3}
                    />
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <span className="inline-flex mr-2 p-1 bg-blue-50 rounded-full">
                        <Target className="w-4 h-4 text-blue-500" />
                      </span>
                      <p>Limited to <span className="font-medium text-gray-700">5 goals</span> per week for optimal focus.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Less is More
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our approach is designed to help you focus on what truly matters, eliminating the noise
              and maximizing your impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute -top-5 left-8 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-900 mt-2">Focus on What Matters</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  By limiting to 5 goals per week, you're forced to prioritize what truly matters. 
                  No more endless to-do lists that sap your motivation.
                </p>
              </div>
            </div>

            <div className="relative p-8 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute -top-5 left-8 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                <CheckCheck className="h-5 w-5 text-white" />
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-900 mt-2">Celebrate Every Win</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Each completed goal is celebrated with delightful animations to give you a dopamine boost.
                  Because small wins lead to big achievements.
                </p>
              </div>
            </div>

            <div className="relative p-8 bg-white border border-gray-100 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute -top-5 left-8 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-900 mt-2">Weekly Reset</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Every week is a fresh start. Complete what matters, learn from what didn't, and begin
                  the next week with renewed focus and intention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              The Impact of Focus
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our users report significant improvements in productivity and wellbeing by focusing on fewer, more meaningful goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AnimatedStat value={87} label="Completion Rate" icon={CheckCircle2} delay={0} />
            <AnimatedStat value={65} label="Stress Reduction" icon={BarChart2} delay={200} />
            <AnimatedStat value={42} label="Productivity Gain" icon={Award} delay={400} />
            <AnimatedStat value={94} label="User Satisfaction" icon={Sparkles} delay={600} />
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Ready to Focus on What Matters?
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            Join thousands of users who have transformed their productivity through mindful goal setting.
          </p>
          <div className="mt-10">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Start Your Week
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;