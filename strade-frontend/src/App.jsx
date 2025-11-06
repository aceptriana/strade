import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, Cpu, Bot, User } from 'lucide-react';
import Header from './components/Header';
// Import auth pages
import Login from './pages/Login';
import Activation from './pages/Activation';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
// Import new enhanced pages
import DashboardNew from './pages/DashboardNew';
import TradeNew from './pages/TradeNew';
import BotsNew from './pages/BotsNew';
// Import existing pages
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Recharge from './pages/Recharge';
import APIConfig from './pages/APIConfig';
import Credit from './pages/Credit';
import Profit from './pages/Profit';
import FAQ from './pages/FAQ';
import Saving from './pages/Saving';
import Cashback from './pages/Cashback';
import MoonbotSetting from './pages/MoonbotSetting';
import BNBFeeSetting from './pages/BNBFeeSetting';
import Profile from './pages/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login', 'activation', 'register', 'forgot'

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }

    // Listen for storage changes (logout from Profile page)
    const handleStorageChange = () => {
      const token = localStorage.getItem('authToken');
      if (!token && isAuthenticated) {
        setIsAuthenticated(false);
        setAuthView('login');
      }
    };

    // Check storage every 500ms (for same-tab detection)
    const interval = setInterval(() => {
      const token = localStorage.getItem('authToken');
      if (!token && isAuthenticated) {
        setIsAuthenticated(false);
        setAuthView('login');
      }
    }, 500);

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setAuthView('login');
  };

  const handleActivationSuccess = () => {
    setAuthView('register');
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  // If not authenticated, show auth pages
  if (!isAuthenticated) {
    switch (authView) {
      case 'activation':
        return (
          <Activation 
            onNavigate={setAuthView}
            onActivationSuccess={handleActivationSuccess}
          />
        );
      case 'register':
        return (
          <Register 
            onNavigate={setAuthView}
            onRegisterSuccess={handleRegisterSuccess}
          />
        );
      case 'forgot':
        return <ForgotPassword onNavigate={setAuthView} />;
      default:
        return <Login onLogin={handleLogin} onNavigate={setAuthView} />;
    }
  }

  const renderPage = () => {
    // Use new enhanced pages by default
    switch (currentPage) {
      case 'trade':
        return <TradeNew onNavigate={setCurrentPage} onBack={() => setCurrentPage('dashboard')} />;
      case 'recharge':
        return <Recharge onBack={() => setCurrentPage('dashboard')} />;
      case 'api-config':
        return <APIConfig onBack={() => setCurrentPage('dashboard')} />;
      case 'credit':
        return <Credit onBack={() => setCurrentPage('dashboard')} />;
      case 'profit':
        return <Profit onBack={() => setCurrentPage('dashboard')} />;
      case 'faq':
        return <FAQ onBack={() => setCurrentPage('dashboard')} />;
      case 'saving':
        return <Saving onBack={() => setCurrentPage('dashboard')} />;
      case 'cashback':
        return <Cashback onBack={() => setCurrentPage('dashboard')} />;
      case 'bots':
        return <BotsNew onNavigate={setCurrentPage} onBack={() => setCurrentPage('dashboard')} />;
      case 'bnb-fee':
        return <BNBFeeSetting onBack={() => setCurrentPage('dashboard')} />;
      case 'profile':
        return <Profile onBack={() => setCurrentPage('dashboard')} />;
      default:
        return <DashboardNew onNavigate={setCurrentPage} />;
    }
  };

  const bottomNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Activity className="w-5 h-5 md:w-6 md:h-6" />,
      activeIcon: <Activity className="w-6 h-6 md:w-7 md:h-7" />
    },
    {
      id: 'trade',
      label: 'Trade',
      icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      activeIcon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
    },
    {
      id: 'bots',
      label: 'Bots',
      icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
      activeIcon: <Cpu className="w-6 h-6 md:w-7 md:h-7" />
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5 md:w-6 md:h-6" />,
      activeIcon: <User className="w-6 h-6 md:w-7 md:h-7" />
    }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#041C1A] to-[#000000]">
      {/* Header */}
      <Header />

      {/* Main Content - bottom padding for navigation */}
      <main className="pb-[100px] min-h-screen">
        {renderPage()}
      </main>

      {/* Minimalist Bottom Navigation - 4 items including Profile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#84F7F0]/30 bg-black/80 backdrop-blur-lg shadow-2xl" style={{ boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5), 0 -1px 2px rgba(132, 247, 240, 0.1)' }}>
        <div className="mx-auto flex h-20 max-w-md items-center justify-around px-2">
          {bottomNavItems.map((item) => {
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative flex flex-col items-center justify-center gap-1.5 px-3 py-2 transition-all ${
                  isActive ? 'text-[#84F7F0]' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {/* Icon with glow effect when active */}
                <div 
                  className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                  style={isActive ? { filter: 'drop-shadow(0 0 8px #84F7F0)' } : {}}
                >
                  {isActive ? item.activeIcon : item.icon}
                </div>

                {/* Label */}
                <span className={`text-xs font-medium transition-all ${
                  isActive ? 'text-[#84F7F0] font-bold' : 'text-white/50'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;
