import { UserButton } from '@clerk/clerk-react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-white flex flex-col">
      <header className="border-b border-white/10 bg-[#0E131A] px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold font-['Sora'] text-white">DriveSphere</h1>
          <nav className="hidden sm:flex gap-6">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `font-['Space_Grotesk'] tracking-wide text-sm font-semibold uppercase transition-colors ${isActive ? 'text-[#00E5FF]' : 'text-gray-400 hover:text-white'}`}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/marketplace" 
              className={({ isActive }) => `font-['Space_Grotesk'] tracking-wide text-sm font-semibold uppercase transition-colors ${isActive ? 'text-[#00E5FF]' : 'text-gray-400 hover:text-white'}`}
            >
              Marketplace
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <NavLink 
            to="/create-listing" 
            className="bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 hover:bg-[#00E5FF]/20 px-4 py-2 rounded-md font-['Space_Grotesk'] text-sm font-bold tracking-wide transition-all"
          >
            + List Vehicle
          </NavLink>
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
