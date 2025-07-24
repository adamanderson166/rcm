import React, { useState } from 'react';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Building2, 
  TrendingUp,
  Users,
  FileText,
  BarChart3,
  Settings,
  Zap
} from 'lucide-react';

interface SplashPageProps {
  onAuthenticated: () => void;
}

const SplashPage: React.FC<SplashPageProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief loading delay for better UX
    setTimeout(() => {
      if (password === 'rcmtest') {
        onAuthenticated();
      } else {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fusion RCM Dashboard
          </h1>
          <p className="text-gray-600">
            Enterprise Revenue Cycle Management Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Secure Access
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isLoading || !password
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <div className="flex items-center mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Analytics</span>
            </div>
            <p className="text-xs text-gray-600">Advanced reporting & insights</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Management</span>
            </div>
            <p className="text-xs text-gray-600">User & role controls</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <div className="flex items-center mb-2">
              <FileText className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">Claims</span>
            </div>
            <p className="text-xs text-gray-600">Denial & AR management</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <div className="flex items-center mb-2">
              <Zap className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">AI-Powered</span>
            </div>
            <p className="text-xs text-gray-600">Smart automation</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2024 Fusion RCM Dashboard. Enterprise-grade healthcare revenue cycle management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashPage; 