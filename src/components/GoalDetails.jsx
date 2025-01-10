import React from 'react';
import { X, Calendar, Clock, ListChecks, MessageSquare, ArrowLeft, Edit2 } from 'lucide-react';

const GoalDetails = ({ goal, onClose, onEdit }) => {
  const category = {
    work: { label: 'Work', icon: '💼', color: 'bg-blue-100 text-blue-700' },
    personal: { label: 'Personal', icon: '🎯', color: 'bg-green-100 text-green-700' },
    health: { label: 'Health', icon: '💪', color: 'bg-red-100 text-red-700' },
    learning: { label: 'Learning', icon: '📚', color: 'bg-purple-100 text-purple-700' },
    creative: { label: 'Creative', icon: '🎨', color: 'bg-pink-100 text-pink-700' },
  }[goal.category || 'work'];

  const priority = {
    high: { color: 'bg-red-100 text-red-700' },
    medium: { color: 'bg-yellow-100 text-yellow-700' },
    low: { color: 'bg-blue-100 text-blue-700' },
  }[goal.priority || 'medium'];

  const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            {/* Header */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => onEdit(goal)}
                className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Edit2 size={20} />
              </button>
            </div>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Title and Tags */}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{goal.text}</h3>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${category.color}`}
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.label}
                  </span>
                  {goal.priority && (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${priority.color}`}
                    >
                      {goal.priority}
                    </span>
                  )}
                </div>
              </div>

              {/* Due Date */}
              {goal.dueDate && (
                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar size={16} className="mr-1" />
                    Due Date
                  </div>
                  <div className="text-gray-900">{formatDate(goal.dueDate)}</div>
                </div>
              )}

              {/* Steps */}
              {goal.steps?.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <ListChecks size={16} className="mr-1" />
                    Steps ({goal.steps.filter(s => s.completed).length}/{goal.steps.length})
                  </div>
                  <div className="space-y-2">
                    {goal.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center p-3 rounded-lg ${
                          step.completed ? 'bg-green-50' : 'bg-gray-50'
                        }`}
                      >
                        <span className="text-sm text-gray-500 mr-3">{index + 1}.</span>
                        <span
                          className={
                            step.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                          }
                        >
                          {step.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {goal.notes && (
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MessageSquare size={16} className="mr-1" />
                    Notes
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">
                    {goal.notes}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;
