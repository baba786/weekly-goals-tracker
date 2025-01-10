import React, { useState } from 'react';
import './styles/animations.css';
import { X } from 'lucide-react';
import ThingsStyleApp from './components/ThingsStyleApp';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import LandingPage from './components/LandingPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [view, setView] = useState(() => user ? 'goals' : 'landing');

  const handleLogout = () => {
    logout();
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user}
        onLogout={handleLogout}
        onShowAuth={() => setShowAuth(true)}
        onHelp={() => setShowHelp(true)}
        onHome={() => {
          if (user) {
            setView('goals');
          } else {
            setView('landing');
          }
        }}
      />

      <main className="pt-16"> {/* Add padding-top to account for fixed header */}
        {view === 'goals' && user ? (
          <ThingsStyleApp />
        ) : (
          <LandingPage onGetStarted={() => setShowAuth(true)} />
        )}
      </main>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuth={handleAuth}
        />
      )}

      {showHelp && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    onClick={() => setShowHelp(false)}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    Tips for Mindful Goal Setting
                  </h3>
                  <div className="mt-2 space-y-4 text-sm text-gray-500">
                    <p>• Focus on what matters most - limit yourself to 5 key goals per week</p>
                    <p>• Be specific and actionable with your goals</p>
                    <p>• Consider the time left in the week when setting new goals</p>
                    <p>• Celebrate progress, not just completion</p>
                    <p>• Use the weekend to reflect and plan for the next week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;