import { User, Briefcase, Folder, Phone, HelpCircle, Layout, Award, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: User, label: "About", href: "#about" },
    { icon: Layout, label: "Services", href: "#services" },
    { icon: Briefcase, label: "Experience", href: "#experience" },
    { icon: Award, label: "Certifications", href: "#certifications" },
    { icon: Folder, label: "Projects", href: "#projects" },
    { icon: HelpCircle, label: "F.A.Q", href: "#faq" },
    { icon: Phone, label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Minimal Top Logo */}
      <div className="fixed top-6 left-6 z-40 pointer-events-none hidden sm:block">
        <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          DARZ
        </span>
      </div>

      {/* Floating Toggle & Dock Container (Moved to TOP) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 md:gap-4">
        
        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-5 py-3 md:py-2.5 md:px-6 rounded-full bg-white/80 hover:bg-slate-100 backdrop-blur-xl text-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 border border-slate-200 font-medium text-sm z-50"
        >
          {isExpanded ? (
            <>
              <X size={18} className="text-zinc-400" />
              <span className="text-slate-700">Close</span>
            </>
          ) : (
            <>
              <Menu size={18} className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
              <span className="text-slate-900">Menu</span>
            </>
          )}
        </motion.button>

        {/* The Dock (Collapsible) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ y: -20, opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-1 md:gap-1.5 px-2 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredIndex === index;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      // Optional: Auto close on mobile after click
                      if (window.innerWidth < 768) setIsExpanded(false);
                    }}
                    className="relative group flex items-center justify-center"
                  >
                    {/* Tooltip (Moved to bottom of the icon) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: -5, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute -bottom-12 px-3 py-1.5 bg-white/95 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
                        >
                          {/* Tooltip Arrow (Pointing UP) */}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-slate-200 rotate-45" />
                          
                          {item.label}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Icon Container with jumping/scaling effect (Jumping DOWN) */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.3 : 1,
                        y: isHovered ? 6 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`p-2.5 md:p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isHovered 
                          ? 'bg-blue-50 border-blue-100 text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                          : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Icon size={18} strokeWidth={isHovered ? 2.5 : 2} className="md:w-5 md:h-5" />
                    </motion.div>
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </>
  );
}
