"use client";
import { useEffect } from 'react';
import { useCookie } from '../hooks/useCookie';
export default function ThemeToggle() {
  const [theme, setTheme] = useCookie('lab_theme', 'light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <button 
      onClick={toggleTheme} 
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
    </button>
  );
}
