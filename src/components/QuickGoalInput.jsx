import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Tag, AlertCircle } from 'lucide-react';

const QuickGoalInput = ({ onSave, onCancel }) => {
  const [text, setText] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const inputRef = useRef(null);

  // Categories with emojis for visual appeal
  const categories = [
    { id: 'work', icon: '💼', label: 'Work' },
    { id: 'personal', icon: '🎯', label: 'Personal' },
    { id: 'health', icon: '💪', label: 'Health' },
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, []);

  const handleTextChange = e => {
    const textarea = e.target;
    setText(e.target.value);
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    // Show actions only when user starts typing
    if (e.target.value.trim() && !showActions) {
      setShowActions(true);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        handleSave();
      }
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleSave = () => {
    if (!text.trim()) return;

    try {
      onSave({
        text: text.trim(),
        category: category || 'work', // default category if none selected
        dueDate: dueDate || null,
      });

      // Clear the form
      setText('');
      setCategory('');
      setDueDate('');
      setShowActions(false);
    } catch (error) {
      console.error('Error saving goal:', error);
      // The error will be handled by the parent component
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200">
      <div className="p-3">
        <textarea
          ref={inputRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="What do you want to achieve this week? Press Enter to save..."
          className="w-full resize-none bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base leading-relaxed"
          rows={1}
        />
      </div>

      {showActions && (
        <div className="flex items-center gap-2 px-3 pb-3 animate-fade-in">
          <div className="flex gap-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-1.5 rounded-md text-sm ${
                  category === cat.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center ml-auto gap-2">
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="p-1.5 rounded-md text-sm text-gray-600 border border-gray-200 focus:outline-none focus:border-blue-300"
            />
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickGoalInput;
