import React from 'react';
import { Sparkles, Info } from 'lucide-react';

const MindfulMessage = ({ type, children }) => {
  const styles = {
    info: {
      wrapper: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-500',
      text: 'text-blue-700'
    },
    success: {
      wrapper: 'bg-green-50 border-green-200',
      icon: 'text-green-500',
      text: 'text-green-700'
    },
    warning: {
      wrapper: 'bg-amber-50 border-amber-200',
      icon: 'text-amber-500',
      text: 'text-amber-700'
    },
    reflection: {
      wrapper: 'bg-purple-50 border-purple-200',
      icon: 'text-purple-500',
      text: 'text-purple-700'
    }
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
        <div className={`text-sm ${style.text}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MindfulMessage;