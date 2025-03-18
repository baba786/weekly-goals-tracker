import React, { useState } from 'react';
import { X, Focus, ArrowRight, ArrowLeft, Sparkles, Info } from 'lucide-react';

// Original simple component for inline messages
export const InlineMindfulMessage = ({ type, children }) => {
  const styles = {
    info: {
      wrapper: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-500',
      text: 'text-blue-700',
    },
    success: {
      wrapper: 'bg-green-50 border-green-200',
      icon: 'text-green-500',
      text: 'text-green-700',
    },
    warning: {
      wrapper: 'bg-amber-50 border-amber-200',
      icon: 'text-amber-500',
      text: 'text-amber-700',
    },
    reflection: {
      wrapper: 'bg-purple-50 border-purple-200',
      icon: 'text-purple-500',
      text: 'text-purple-700',
    },
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`p-4 rounded-lg border ${style.wrapper}`}>
      <div className="flex gap-3">
        {type === 'reflection' ? (
          <Sparkles className={`h-5 w-5 ${style.icon}`} />
        ) : (
          <Info className={`h-5 w-5 ${style.icon}`} />
        )}
        <div className={`text-sm ${style.text}`}>{children}</div>
      </div>
    </div>
  );
};

// New modal component for mindfulness tips
const MindfulMessage = ({ onClose }) => {
  const [currentTip, setCurrentTip] = useState(0);
  
  const mindfulnessTips = [
    {
      title: "Quality Over Quantity",
      content: "Focus on a few important goals rather than many trivial ones. Ask yourself: 'Will this goal truly move my life forward in a meaningful way?'"
    },
    {
      title: "Be Specific and Actionable",
      content: "Create goals that are clear and actionable. Instead of 'Exercise more', try 'Go for a 30-minute walk on Monday, Wednesday, and Friday mornings'."
    },
    {
      title: "Celebrate Small Wins",
      content: "Take time to acknowledge your progress, even the smallest achievements. This triggers dopamine release in your brain, motivating you to continue."
    },
    {
      title: "Embrace Failure as Learning",
      content: "When you don't reach a goal, ask what you can learn from the experience. Adjust your approach rather than abandoning the goal entirely."
    },
    {
      title: "Connect Goals to Values",
      content: "Set goals that align with your core values. Goals with deeper meaning create stronger motivation and greater satisfaction when achieved."
    }
  ];
  
  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % mindfulnessTips.length);
  };
  
  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + mindfulnessTips.length) % mindfulnessTips.length);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>
        
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
          {/* Decorative top bar */}
          <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <div className="flex items-center">
              <Focus className="h-5 w-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Mindfulness Tips</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Content */}
          <div className="px-6 py-4">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {mindfulnessTips[currentTip].title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {mindfulnessTips[currentTip].content}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-5">
              <button 
                onClick={prevTip}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-indigo-600"
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>
              
              <div className="flex space-x-1">
                {mindfulnessTips.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentTip 
                        ? 'w-4 bg-indigo-500' 
                        : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setCurrentTip(index)}
                  ></div>
                ))}
              </div>
              
              <button 
                onClick={nextTip}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-indigo-600"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="text-xs text-gray-500 italic text-center">
              "Setting intentions mindfully is the first step toward bringing them to life."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindfulMessage;