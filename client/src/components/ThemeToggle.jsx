import { Sun, Moon } from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={`relative flex h-7 w-14 shrink-0 items-center rounded-full border border-ivory-300 dark:border-ivory-600 bg-ivory-200/80 dark:bg-ivory-700/60 transition-colors duration-300 ${className}`}
    >
      <span className="absolute left-2 text-blue-500">
        <Sun size={13} />
      </span>
      <span className="absolute right-2 text-blue-400">
        <Moon size={13} />
      </span>
      <span
        className={`absolute left-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow transition-transform duration-300 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  );
}
