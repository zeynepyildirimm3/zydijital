import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      // Default to dark mode as requested by user
      return true;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      aria-label={isDark ? 'Aydınlık Temaya Geç' : 'Karanlık Temaya Geç'}
      title={isDark ? 'Aydınlık Temaya Geç' : 'Karanlık Temaya Geç'}
      className="p-2 rounded-full bg-dark-850 hover:bg-dark-800 border border-white/[0.08] hover:border-violet-500/40 text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center relative group focus-visible:ring-2 focus-visible:ring-violet-400 outline-none theme-toggle-btn shadow-sm"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-violet-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};
