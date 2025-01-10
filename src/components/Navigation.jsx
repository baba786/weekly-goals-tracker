import React, { useState, useRef, useEffect } from 'react';
import { Star, Settings, LogOut, User, HelpCircle } from 'lucide-react';

const Navigation = ({ user, onLogout, onHelp }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-medium text-gray-900">WeeklyGoals</span>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={onHelp}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                <HelpCircle size={20} />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                    <div className="px-4 py-2 text-sm text-gray-900 border-b">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-gray-500 truncate text-xs">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Handle profile
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Handle settings
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center border-t"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={onHelp}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Help
              </button>
              <button
                onClick={() => document.dispatchEvent(new CustomEvent('show-auth-modal'))}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;