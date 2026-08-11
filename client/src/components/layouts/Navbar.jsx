import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Image, Briefcase, Folder, HelpCircle, Phone, Layers } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: Image, label: "Gallery", href: "#photos" },
  { icon: Layers, label: "Services", href: "#services" },
  { icon: Briefcase, label: "Experience", href: "#experience" },
  { icon: Folder, label: "Projects", href: "#projects" },
  { icon: HelpCircle, label: "FAQ", href: "#faq" },
  { icon: Phone, label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-ivory-900/80 backdrop-blur-md shadow-sm border-b border-ivory-200/50 dark:border-ivory-700/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-1">
          <span className="font-display text-2xl text-ivory-800 dark:text-ivory-100">
            Haidar<span className="text-blue-500">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-sm font-sans font-medium text-ivory-600 dark:text-ivory-400 hover:text-ivory-900 dark:hover:text-ivory-100 transition-colors duration-200"
              >
                <Icon size={16} strokeWidth={2} />
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-ivory-600 dark:text-ivory-400 hover:text-ivory-900 dark:hover:text-ivory-100 transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-ivory-900/95 backdrop-blur-md border-b border-ivory-200/50 dark:border-ivory-700/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-base font-sans font-medium text-ivory-600 dark:text-ivory-400 hover:text-ivory-900 dark:hover:text-ivory-100 transition-colors duration-200"
                  >
                    <Icon size={20} strokeWidth={2} />
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
