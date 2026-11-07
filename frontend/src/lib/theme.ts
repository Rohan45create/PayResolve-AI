export type ThemeMode = 'light' | 'dark';

export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('payresolve-theme');
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('payresolve-theme', theme);
}

export function toggleTheme(): ThemeMode {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

// Auto-initialize theme on import
if (typeof window !== 'undefined') {
  applyTheme(getInitialTheme());
  
  // Listen for OS theme changes if user hasn't explicitly set localStorage
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('payresolve-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}
