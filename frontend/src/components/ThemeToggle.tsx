import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { toggleTheme, type ThemeMode } from '../lib/theme';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const darkNow = document.documentElement.classList.contains('dark');
      setCurrentTheme(darkNow ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    const next = toggleTheme();
    setCurrentTheme(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label="Toggle theme"
      className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center ${className}`}
    >
      {currentTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600" />
      )}
    </button>
  );
};
