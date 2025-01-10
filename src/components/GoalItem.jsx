import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import CelebrationEffect from './CelebrationEffect';

const GoalItem = ({ goal, onToggle, onEdit }) => {
  const [showCelebration, setShowCelebration] = useState(false);

  const handleToggle = () => {
    if (!goal.completed) {
      setShowCelebration(true);
      // Play a subtle sound
      const audio = new Audio(
        'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodHRr3ZCPGmh0NPDmWlARXGq0864iVZDTpPR69OiZjk6bpjY8vi5f1ZTeqG/x7yWbVBZrNzp2pttR0hkoMG8sZRwX3mxzt7Oj14/Sm2izK+kfWBwuODx6qp7TkBxn7/Kx6mDb4C/2ezRk2A+NmOaxLWwk3Vsjc3q8cGJVDpKc5S3qKKRgZbN7v7Ij1w9PGmQp6OhmI2k2/X/xoVQNz9ejKWppZ+WvfL//Dx7XRUAIVmxz97Lm2k9Kj9gl9f//+eVYzwlNliU0v//8LCEVEJMa4uqwLWlhHBwfpKzw7urkXqCm8HW18yrfVxLVmh3iZmpuMbY6/rz3Lq5rqujoqSmqrG7xs3W3ejw+fv7+fXw6eHY0s3KxsXGycvP1NTY1tTQy8bCv7y9vsTIz9Xb4ubq7e7v8O7t6+nk4NvW0c7Lys3P09rg5+vy8/Hy7+vn4t3Z1dPT1NbZ3uHm6u3v8fLz8/Py8O7r6OXi397b2tjX19jZ2tze4OLk5+nq7O3u7u7t6+nm4+Df3dzc3d/h4+Xn6evs7e7v7+/u7evp5uPh393c29vc3t/h4+bq7fDz9fb29fPw7Onl4d/d29va2tvc3uDi5Obp6+3u7+/v7u3r6efi4N/d3Nzd3+Hi5Ofp6+3v8PHy8vHw7uvp5ePh397c29vc3d/h4+Xn6uzv8PHy8vLx7+3r6Obl4+Lh4ODg4eLj5Obn6evs7u/w8PDw7+7s6+nm5OLh4ODg4OHi4+Tl5+nr7O7v8PDx8PDv7ezq6Obk4+Lh4ODg4eLj5OXm6Onr7e7v7+/v7u3s6+nm5OPi4eHg4OHh4uPk5ebp6uvt7u/v7+/v7ezr6efm5OPi4eHg4OHi4+Tl5ujp6+3u7+/w8PDv7ezr6efm5OPi4eHh4eHi4+Tl5+jq7O3u7+/w8PDv7u3s6ujn5eTj4uLh4eHi4+Tl5ufp6uzt7u/v8PDw7+7t7Ovp5+bl5OPi4uHh4uLj5OXm6Onr7O7v7/Dw8O/u7ezr6efm5eTj4uLi4uLj4+Tl5ufp6uzt7u/v8PDw7+7t7Ovq6Ofm5eTj4+Li4uLj4+Tl5+jq6+3u7+/w8PDv7u3s7Orp6Ofm5eTj4+Li4uPj5OXm5+nq7O3u7/Dw8PDv7u3s6+rp6Ofm5eTk4+Pj4+Pk5OXm5+jq6+zu7+/w8PDv7u7t7Ovq6ejn5uXl5OTj4+Pj4+Tl5ufp6uvs7u/v8PDw7+/u7ezr6uno5+fm5eXk5OPj4+Pk5eXm6Onq7O3u7/Dw8PDv7u3t7Ozr6ujn5+bl5eTk5OTk5OXl5ufn6err7e7v7/Dw8PDv7u7t7Ozr6ujn5+bm5eXl5OTk5OXl5ufn6err7O3u7/Dw8PDv7+7t7Ozr6ujn5+bm5eXl5eXl5eXm5ufn6Onq7O3u7+/w8PDv7+7t7ezr6ujn5+bm5eXl5eXl5eXm5ufn6Onq7O3u7+/w8PDv7+7t7ezr6ujn5+bm5eXl5eXl5eXm5ufn6Onq7O3u7+/w8PDv7+7t7ezr6ujn5+bm5eXl5eXl5eXm5ufn6Onq7O3u7+/w8PDv7+7t7ezr6ujn5+bm5eXl5eXl5eXm5ufn6Onq7O3u7+/w8PDv7+7t7ezr6ujn5+bm5eXl5eXl5eXm5ufn6Onq7O3u7+/w8PDv7+7t7ezr6ujn5+bm5eXl5eXl5eXm5ufn6Onq7O3u7+/w8PDv7+7t7ezr6ujn5+bm5eXl5eXl5eXm5ufn6Onq7O3u7+/w8PDv7+7t7ezr6ujn5+bm5eXl5eXl5eXm'
      );
      audio.volume = 0.2;
      audio.play();
    }
    onToggle(goal.id || goal._id);
  };

  return (
    <>
      <div
        className={`group flex items-center p-4 transition-all duration-300 ${
          goal.completed ? 'goal-completed bg-gray-50' : 'hover:bg-gray-50'
        }`}
      >
        <button onClick={handleToggle} className="flex-shrink-0 mr-3 focus:outline-none group">
          {goal.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 animate-checkmark" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 group-hover:text-gray-400" />
          )}
        </button>

        <div className="flex-grow">
          <span
            className={`text-base ${
              goal.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}
          >
            {goal.text}
          </span>
        </div>

        {!goal.completed && (
          <button
            onClick={() => onEdit(goal)}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      {showCelebration && <CelebrationEffect onComplete={() => setShowCelebration(false)} />}
    </>
  );
};

export default GoalItem;
