import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const SimpleGoalEditor = ({ goal, onSave, onClose }) => {
  const [text, setText] = useState(goal?.text || '');
  const textareaRef = useRef(null);

  // Focus and adjust textarea height on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      adjustTextareaHeight(textareaRef.current);
    }
  }, []);

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({ ...goal, text: text.trim() });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">
            {goal ? 'Edit goal' : 'New goal'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="What do you want to achieve this week?"
            className="w-full resize-none bg-gray-50 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-base leading-relaxed"
            rows={1}
          />
          
          <div className="mt-4 text-sm text-gray-500">
            Press Enter to save, Shift + Enter for new line, Esc to cancel
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleGoalEditor;