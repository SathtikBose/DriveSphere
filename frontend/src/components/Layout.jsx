import { UserButton } from '@clerk/clerk-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Orders', path: '/orders' },
    { name: 'Settings', path: '/profile' }
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative text-gray-900 dark:text-white">
      {/* Stunning Unsplash Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{ 
          backgroundImage: theme === 'dark' 
            ? 'url("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop")'
            : 'url("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop")'
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/70 dark:bg-[#05070A]/85 backdrop-blur-sm" />
      </div>

      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between glass-panel !border-l-0 !border-r-0 !border-t-0 shadow-lg shadow-black/5 dark:shadow-black/50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <button 
              className="sm:hidden p-2 text-gray-700 dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold font-['Sora'] bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              DriveSphere
            </h1>
          </div>
          <nav className="hidden sm:flex gap-6">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path} 
                className={({ isActive }) => `font-['Space_Grotesk'] tracking-wide text-sm font-semibold uppercase transition-colors ${isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-200"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <NavLink 
            to="/create-listing" 
            className="hidden sm:block bg-blue-600 text-white hover:bg-blue-700 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border dark:border-cyan-500/30 dark:hover:bg-cyan-500/30 px-4 py-2 rounded-md font-['Space_Grotesk'] text-sm font-bold tracking-wide transition-all shadow-md"
          >
            + List Vehicle
          </NavLink>
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 shadow-md border-2 border-white/20" } }} />
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-40 pt-20 px-4 pb-4 glass-panel flex flex-col gap-4 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name}
              to={link.path} 
              className={({ isActive }) => `block p-4 rounded-xl font-['Space_Grotesk'] text-lg font-bold tracking-wide transition-all ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-cyan-500/20 dark:text-cyan-400' : 'text-gray-800 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/5'}`}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink 
            to="/create-listing" 
            className="mt-4 block text-center bg-blue-600 text-white dark:bg-cyan-500 dark:text-black p-4 rounded-xl font-['Space_Grotesk'] text-lg font-bold tracking-wide transition-all shadow-lg"
          >
            + List Vehicle
          </NavLink>
        </div>
      )}

      <div className="flex-1 overflow-auto relative z-10 p-4 sm:p-8">
        <Outlet />
      </div>
    </div>
  );
}
