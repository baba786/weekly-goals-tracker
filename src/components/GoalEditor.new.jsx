import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Tag, Clock, Sparkles, Target, AlertCircle } from 'lucide-react';

const PRIORITIES = [
  { id: 'high', label: 'High', color: 'bg-red-100 text-red-700 ring-red-600' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 ring-yellow-600' },
  { id: 'low', label: 'Low', color: 'bg-blue-100 text-blue-700 ring-blue-600' },
];

const CATEGORIES = [
  { id: 'work', label: 'Work', icon: '💼', color: 'bg-blue-100 text-blue-700' },
  { id: 'personal', label: 'Personal', icon: '🎯', color: 'bg-green-100 text-green-700' },
  { id: 'health', label: 'Health', icon: '💪', color: 'bg-red-100 text-red-700' },
  { id: 'learning', label: 'Learning', icon: '📚', color: 'bg-purple-100 text-purple-700' },
  { id: 'creative', label: 'Creative', icon: '🎨', color: 'bg-pink-100 text-pink-700' },
];

const GoalEditor = ({ goal, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    text: '',
    category: 'work',
    priority: 'medium',
    dueDate: '',
    notes: '',
    steps: [],
  });
  const [newStep, setNewStep] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (goal) {
      setFormData({
        text: goal.text || '',
        category: goal.category || 'work',
        priority: goal.priority || 'medium',
        dueDate: goal.dueDate || '',
        notes: goal.notes || '',
        steps: goal.steps || [],
      });
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [goal]);

  const handleTextChange = e => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    setFormData({ ...formData, text: e.target.value });

    // Simulate AI suggestions
    if (e.target.value.length > 10) {
      setTimeout(() => {
        const suggestions = [
          'Consider breaking this into smaller steps',
          'Add a specific deadline to stay on track',
          'Make this goal more measurable',
          'Add some success criteria',
        ];
        setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
      }, 500);
    } else {
      setAiSuggestion('');
    }
  };

  const addStep = () => {
    if (newStep.trim()) {
      setFormData({
        ...formData,
        steps: [...formData.steps, { id: Date.now(), text: newStep.trim(), completed: false }],
      });
      setNewStep('');
    }
  };

  const removeStep = stepId => {
    setFormData({
      ...formData,
      steps: formData.steps.filter(step => step.id !== stepId),
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.text.trim()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Goal Text */}
              <div>
                <textarea
                  ref={textareaRef}
                  value={formData.text}
                  onChange={handleTextChange}
                  placeholder="What do you want to achieve this week?"
                  className="block w-full resize-none rounded-md border-0 py-3 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  rows={1}
                />

                {aiSuggestion && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Sparkles size={16} className="mr-1 text-blue-500" />
                    <span>{aiSuggestion}</span>
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: category.id })}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        formData.category === category.id
                          ? category.color + ' ring-2 ring-offset-2'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority & Due Date */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <div className="flex gap-2">
                    {PRIORITIES.map(priority => (
                      <button
                        key={priority.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, priority: priority.id })}
                        className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          formData.priority === priority.id
                            ? priority.color + ' ring-2 ring-offset-2'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {priority.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Steps</label>
                <div className="space-y-2">
                  {formData.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{index + 1}.</span>
                      <input
                        type="text"
                        value={step.text}
                        onChange={e => {
                          const newSteps = [...formData.steps];
                          newSteps[index].text = e.target.value;
                          setFormData({ ...formData, steps: newSteps });
                        }}
                        className="flex-1 rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeStep(step.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newStep}
                      onChange={e => setNewStep(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addStep()}
                      placeholder="Add a step..."
                      className="flex-1 rounded-md border-0 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      onClick={addStep}
                      className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes..."
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
                >
                  Save Goal
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalEditor;
