import React, { useState, useEffect } from 'react';
import { Mail, Lock, Loader2, User, X, ArrowRight, Github, LogIn } from 'lucide-react';

// Social login button component
const SocialButton = ({ icon: Icon, provider, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <Icon className="h-5 w-5" />
    <span>Continue with {provider}</span>
  </button>
);

// Google icon component
const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
    </g>
  </svg>
);

// Divider with text
const DividerWithText = ({ children }) => (
  <div className="relative mt-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="bg-white px-2 text-gray-500">{children}</span>
    </div>
  </div>
);

// Input with icon
const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      {...props}
      className="block w-full rounded-md border border-gray-300 py-2.5 pl-10 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
    />
  </div>
);

const AuthModal = ({ onClose, onAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingInWith, setIsLoggingInWith] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Add animation effect on mount
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault(); // Handle both form submit and button click
    setError('');

    // Basic validation for email/password login
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password strength validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!formData.name) {
        setError('Name is required');
        return;
      }
      if (formData.name.length < 2) {
        setError('Name must be at least 2 characters long');
        return;
      }
    }

    setIsLoading(true);
    try {
      // Attempt authentication
      await onAuth(formData);
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    setIsLoggingInWith(provider);
    
    try {
      // In a real implementation, this would redirect to OAuth provider
      // For demo purposes, we'll simulate the login
      const simulatedUser = {
        name: `Demo ${provider} User`,
        email: `demo-${provider.toLowerCase()}@example.com`,
        provider
      };
      
      // Wait for 1.5 seconds to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the auth handler with the simulated user
      await onAuth(simulatedUser);
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoggingInWith(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop with blur effect */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-60 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        ></div>

        {/* Modal content */}
        <div 
          className={`relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionProperty: 'all', transitionDuration: '0.3s', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          {/* Modal header with decorative gradient */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          {/* Close button */}
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="bg-white px-6 pb-6 pt-5">
            <div className="text-center">
              <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {isSignUp 
                  ? 'Sign up to start tracking your weekly goals' 
                  : 'Sign in to continue with your goal tracking'}
              </p>
            </div>

            {/* Social login options */}
            <div className="mt-6 space-y-3">
              <SocialButton 
                icon={GoogleIcon} 
                provider="Google" 
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading || isLoggingInWith}
              />
              <SocialButton 
                icon={Github} 
                provider="GitHub" 
                onClick={() => handleSocialLogin('GitHub')}
                disabled={isLoading || isLoggingInWith}
              />
              
              {isLoggingInWith && (
                <div className="flex items-center justify-center py-2 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Authenticating with {isLoggingInWith}...</span>
                </div>
              )}
            </div>

            <DividerWithText>or continue with email</DividerWithText>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg animate-fade-in">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full name
                  </label>
                  <Input 
                    icon={User}
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <Input 
                  icon={Mail}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input 
                  icon={Lock}
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <Input 
                    icon={Lock}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                </div>
              )}

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                {!isSignUp && (
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading || isLoggingInWith}
                  className="flex w-full justify-center items-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      {isSignUp ? 'Create account' : 'Sign in'}
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>

            <div className="mt-4 text-center text-xs text-gray-500">
              <p>By signing up, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;