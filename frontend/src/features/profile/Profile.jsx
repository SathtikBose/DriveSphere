import { useState, useEffect } from 'react';
import { UserProfile, useUser } from '@clerk/clerk-react';
import { Settings, Moon, Sun } from 'lucide-react';

export default function Profile() {
  const { user } = useUser();
  const [theme, setTheme] = useState('dark');

  // Mock theme toggle logic
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      // Adding a mock class for demonstration if we wanted to write global CSS
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D12] text-white p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-[#00E5FF]" />
          <h1 className="text-3xl font-bold font-['Sora']">Account Settings</h1>
        </div>

        {/* Application Settings Section */}
        <div className="bg-[#0E131A] border border-white/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold font-['Sora'] mb-6 text-[#00E5FF]">Application Settings</h2>
          
          <div className="flex items-center justify-between p-4 bg-[#0A0D12] rounded-xl border border-white/5">
            <div className="flex flex-col">
              <span className="font-semibold font-['Sora'] text-white">Visual Theme</span>
              <span className="text-sm text-gray-400 font-['Plus_Jakarta_Sans']">Toggle between Light and Dark mode (Mock)</span>
            </div>
            
            <button 
              onClick={toggleTheme}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-[#00E5FF]/20 border border-[#00E5FF]/50' : 'bg-gray-600 border border-gray-500'}`}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform flex items-center justify-center ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3 h-3 text-[#0A0D12]" />
                ) : (
                  <Sun className="w-3 h-3 text-orange-500" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Clerk Profile Section */}
        <div className="bg-[#0E131A] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
          <h2 className="text-xl font-bold font-['Sora'] mb-6 text-[#00E5FF]">Security & Profile</h2>
          
          {/* We use Clerk's appearance prop to force it into our dark theme aesthetic as much as possible */}
          <div className="flex justify-center w-full clerk-profile-wrapper">
            <UserProfile 
              routing="hash"
              appearance={{
                variables: {
                  colorPrimary: '#00E5FF',
                  colorBackground: '#0A0D12',
                  colorText: 'white',
                  colorInputBackground: '#0E131A',
                  colorInputText: 'white',
                  colorDanger: '#ef4444',
                },
                elements: {
                  card: "bg-transparent shadow-none w-full max-w-full",
                  navbar: "hidden sm:flex",
                  pageScrollBox: "p-0",
                  headerTitle: "font-['Sora'] text-white",
                  headerSubtitle: "text-gray-400",
                }
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
