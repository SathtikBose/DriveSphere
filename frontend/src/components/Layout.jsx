import { UserButton } from '@clerk/clerk-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#05070A] text-gray-900 dark:text-white transition-colors duration-300 relative">
      {/* Decorative gradient background elements for glassmorphism effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/20 dark:bg-cyan-600/20 blur-[100px]" />
      </div>

      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between glass-panel !border-l-0 !border-r-0 !border-t-0">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold font-['Sora'] bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            DriveSphere
          </h1>
          <nav className="hidden sm:flex gap-6">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `font-['Space_Grotesk'] tracking-wide text-sm font-semibold uppercase transition-colors ${isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/marketplace" 
              className={({ isActive }) => `font-['Space_Grotesk'] tracking-wide text-sm font-semibold uppercase transition-colors ${isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Marketplace
            </NavLink>
            <NavLink 
              to="/orders" 
              className={({ isActive }) => `text-sm font-['Space_Grotesk'] font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Orders
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `text-sm font-['Space_Grotesk'] font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-blue-600 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Settings
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <NavLink 
            to="/create-listing" 
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border dark:border-cyan-500/20 dark:hover:bg-cyan-500/20 px-4 py-2 rounded-md font-['Space_Grotesk'] text-sm font-bold tracking-wide transition-all shadow-sm"
          >
            + List Vehicle
          </NavLink>
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 shadow-md" } }} />
        </div>
      </header>

      <div className="flex-1 overflow-auto relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
