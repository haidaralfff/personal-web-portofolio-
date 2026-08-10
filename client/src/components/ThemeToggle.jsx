import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import useDarkMode from '../hooks/useDarkMode';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 z-[9990] w-12 h-12 rounded-full border border-ivory-200 dark:border-ivory-700 bg-white/80 dark:bg-ivory-800/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-ivory-100 dark:hover:bg-ivory-700 transition-colors duration-300"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Moon size={18} className="text-blue-400" />
        ) : (
          <Sun size={18} className="text-blue-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
