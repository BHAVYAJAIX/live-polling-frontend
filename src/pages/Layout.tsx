import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Trophy, LogOut, Plus, List } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.username

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Sports Polls Admin</h1>
              </div>
              
              <nav className="hidden md:flex space-x-1 ml-8">
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/create-poll"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/create-poll'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Poll</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center py-2 px-3 rounded-md ${
              location.pathname === '/dashboard'
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
          >
            <List className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          <Link
            to="/create-poll"
            className={`flex flex-col items-center py-2 px-3 rounded-md ${
              location.pathname === '/create-poll'
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Create</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;