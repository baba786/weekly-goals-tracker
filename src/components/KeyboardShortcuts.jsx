import React from 'react';
import { Keyboard, X } from 'lucide-react';

const KeyboardShortcuts = ({ onClose }) => {
  const shortcuts = [
    { key: 'n', description: 'New goal' },
    { key: 'e', description: 'Edit selected goal' },
    { key: 'Space', description: 'Toggle goal completion' },
    { key: '↑/↓', description: 'Navigate goals' },
    { key: 'Enter', description: 'View goal details' },
    { key: 'Esc', description: 'Close modal' },
    { key: '/', description: 'Search goals' },
    { key: '?', description: 'Show keyboard shortcuts' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Keyboard className="h-6 w-6 text-gray-600" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Keyboard Shortcuts
                </h3>
              </div>
            </div>

            <div className="mt-6">
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={shortcut.key}
                    className={`flex items-center justify-between p-3 ${
                      index !== shortcuts.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <span className="text-sm text-gray-900">{shortcut.description}</span>
                    <kbd className="inline-flex items-center rounded border border-gray-200 px-2 py-1 text-xs font-medium text-gray-400 bg-gray-50">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
