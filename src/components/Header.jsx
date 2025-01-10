import React, { useState, useRef, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import BrandLogo from './BrandLogo';

const Header = ({ user, onLogout, onShowAuth }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <BrandLogo />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                  />
                  <span className="hidden sm:inline-block">{user.name}</span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="max-w-full">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="font-medium text-sm truncate text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onShowAuth}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
