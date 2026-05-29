import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import TextPressure from "./reactbits/TextPressure";

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide scrollbar while loading
    document.body.style.overflow = "hidden";

    // Show splash for 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "unset";
        if (onComplete) onComplete();
      }, 800); // Wait for the exit animation to finish
    }, 2200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[#0d1117] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Ambient Background Glow */}
            <motion.div 
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.2, 0.9] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none"
            />
            
            <div className="relative h-20 w-48 sm:h-24 sm:w-64 md:h-32 md:w-80">
              <TextPressure text="Darz." flex={false} stroke={false} textColor="#ffffff" />
            </div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
              className="h-[3px] bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-full w-full max-w-[150px] mt-2 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
