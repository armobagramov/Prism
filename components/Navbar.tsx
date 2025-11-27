import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { PrismLogo } from './PrismLogo';
import { User } from '../types';

interface NavbarProps {
    onHomeClick: () => void;
    user: User | null;
    onLoginClick: () => void;
    onProfileClick: () => void;
    darkMode: boolean;
    toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
    onHomeClick, 
    user, 
    onLoginClick,
    onProfileClick,
    darkMode,
    toggleTheme
}) => {
  return (
    <nav className="h-20 border-b border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-prism-dark/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 transition-colors duration-300">
      <div 
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onHomeClick}
      >
        <div className="w-10 h-10 flex-shrink-0">
            <PrismLogo className="w-full h-full" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Prism</span>
      </div>

      <div className="flex-1 max-w-lg mx-8 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 rounded-full leading-5 
                     bg-neutral-100 dark:bg-neutral-800 
                     border-transparent focus:border-prism-accent border-2
                     text-neutral-900 dark:text-neutral-200 
                     placeholder-neutral-500 
                     focus:outline-none focus:bg-white dark:focus:bg-neutral-900 
                     transition-all duration-300"
            placeholder="Search topics, claims, or sources..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
        >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors relative">
           <Bell className="w-5 h-5" />
           <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-prism-accent rounded-full"></span>
        </button>

        {user ? (
             <button 
                onClick={onProfileClick}
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-white/10 hover:border-prism-accent transition-all"
             >
                <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 rounded-full bg-neutral-700" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hidden sm:block">{user.name}</span>
            </button>
        ) : (
            <button 
                onClick={onLoginClick}
                className="px-5 py-2 rounded-full bg-neutral-900 dark:bg-white hover:bg-neutral-700 dark:hover:bg-neutral-200 text-white dark:text-black font-medium text-sm transition-colors"
            >
                Sign In
            </button>
        )}
      </div>
    </nav>
  );
};