import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Car, ShieldCheck, Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function Landing() {
  const { isSignedIn } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-white transition-colors duration-300 relative">
      {/* Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{ 
          backgroundImage: theme === 'dark' 
            ? 'url("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop")'
            : 'url("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop")'
        }}
      >
        <div className="absolute inset-0 bg-white/70 dark:bg-[#05070A]/85 backdrop-blur-sm" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between glass-panel !border-l-0 !border-r-0 !border-t-0 shadow-lg shadow-black/5 dark:shadow-black/50">
        <div className="flex items-center gap-4">
          <Car size={32} className="text-blue-600 dark:text-cyan-400" />
          <h1 className="text-2xl font-bold font-['Sora'] bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            DriveSphere
          </h1>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-200"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {isSignedIn ? (
            <Link 
              to="/dashboard" 
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border dark:border-cyan-500/30 dark:hover:bg-cyan-500/30 px-5 py-2 rounded-full font-['Space_Grotesk'] text-sm font-bold tracking-wide transition-all shadow-md flex items-center gap-2"
            >
              Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hidden sm:block font-['Space_Grotesk'] tracking-wide text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-cyan-500 dark:text-black hover:scale-105 px-5 py-2 rounded-full font-['Space_Grotesk'] text-sm font-bold tracking-wide transition-all shadow-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4 sm:p-8">
        
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center py-20 sm:py-32">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-200 dark:border-cyan-500/30 bg-blue-50/50 dark:bg-cyan-500/10 backdrop-blur-md">
            <span className="font-['Space_Grotesk'] text-sm font-semibold text-blue-700 dark:text-cyan-300">
              🚀 Revolutionizing the Auto Marketplace
            </span>
          </div>
          
          <h2 className="text-5xl sm:text-7xl font-extrabold font-['Sora'] tracking-tight mb-8 leading-tight">
            Buy & Sell Cars <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Without the Hassle.
            </span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience a seamless, secure, and modern platform to find your dream car or sell your current one. DriveSphere connects enthusiasts worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to={isSignedIn ? "/marketplace" : "/signup"}
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 dark:bg-cyan-500 dark:text-black hover:scale-105 px-8 py-4 rounded-full font-['Space_Grotesk'] text-lg font-bold tracking-wide transition-all shadow-xl shadow-blue-500/20 dark:shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              Explore Marketplace <ArrowRight size={20} />
            </Link>
            <Link 
              to={isSignedIn ? "/create-listing" : "/login"}
              className="w-full sm:w-auto glass-panel hover:bg-white/60 dark:hover:bg-white/10 px-8 py-4 rounded-full font-['Space_Grotesk'] text-lg font-bold tracking-wide transition-all flex items-center justify-center"
            >
              Sell Your Car
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl mx-auto py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold font-['Sora'] mb-4">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Powered by Stripe. All transactions are fully encrypted and securely processed instantly.
              </p>
            </div>
            
            <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-cyan-100 dark:bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={32} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold font-['Sora'] mb-4">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                A modern stack built for speed. Browse thousands of vehicles with zero lag.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp size={32} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold font-['Sora'] mb-4">Market Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your sales, view market trends, and get the best value for your vehicles.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-panel !border-l-0 !border-r-0 !border-b-0 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} DriveSphere. All rights reserved.</p>
      </footer>
    </div>
  );
}
