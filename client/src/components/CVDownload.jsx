import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { generateAndDownloadCV } from "../lib/generateCV";

export default function CVDownload() {
  const handleDownload = () => {
    try {
      generateAndDownloadCV();
    } catch (err) {
      console.error("Failed to generate CV:", err);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleDownload}
      className="inline-flex items-center gap-2.5 rounded-lg border border-ivory-200 dark:border-ivory-700 bg-white/60 dark:bg-ivory-800/60 px-6 py-3.5 text-sm font-semibold text-ivory-700 dark:text-ivory-200 hover:bg-white dark:hover:bg-ivory-700 hover:border-ivory-300 dark:hover:border-ivory-600 transition-all duration-200"
    >
      <Download size={16} />
      Download CV
    </motion.button>
  );
}
