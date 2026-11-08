import React from 'react';
import { GoogleIcon } from './GoogleIcon';
import { useTheme } from '../lib/theme';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'nav';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'default' }) => {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'nav') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-label="Toggle theme"
        className={`px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 active:scale-[0.97] text-white backdrop-blur-xs transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium ${className}`}
      >
        {isDark ? (
          <>
            <GoogleIcon name="light_mode" size={15} className="text-amber-300" />
            <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <GoogleIcon name="dark_mode" size={15} className="text-blue-100" />
            <span className="hidden sm:inline">Dark</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label="Toggle theme"
      className={`p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.97] transition-all cursor-pointer inline-flex items-center justify-center ${className}`}
    >
      {isDark ? (
        <GoogleIcon name="light_mode" size={16} className="text-amber-400" />
      ) : (
        <GoogleIcon name="dark_mode" size={16} className="text-slate-600 dark:text-slate-300" />
      )}
    </button>
  );
};
