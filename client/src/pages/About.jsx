import { motion } from "framer-motion";
import Techstack from "../components/Techstack";
import { useAbout } from "../hooks/useAbout";

export default function About() {
  const { about, loading } = useAbout();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory-50 dark:bg-ivory-900 px-6 py-28 relative overflow-hidden flex flex-col justify-center transition-colors duration-500">
        <div className="mx-auto max-w-4xl w-full relative z-10">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-ivory-200 dark:bg-ivory-700 rounded w-20"></div>
            <div className="h-12 bg-ivory-200 dark:bg-ivory-700 rounded w-64"></div>
            <div className="space-y-4">
              <div className="h-4 bg-ivory-200 dark:bg-ivory-700 rounded"></div>
              <div className="h-4 bg-ivory-200 dark:bg-ivory-700 rounded"></div>
              <div className="h-4 bg-ivory-200 dark:bg-ivory-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory-50 dark:bg-ivory-900 px-6 py-28 relative overflow-hidden flex flex-col justify-center transition-colors duration-500">
      <motion.div
        className="mx-auto max-w-4xl w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Overline */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs tracking-mega uppercase text-blue-400 mb-4"
        >
          About
        </motion.p>

        {/* Title */}
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 dark:text-ivory-100 leading-[0.95] tracking-tight">
            About Me
          </h1>
          <div className="w-12 h-[2px] bg-blue-500 mt-6" />
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl space-y-6 text-ivory-500 dark:text-ivory-400 text-base sm:text-lg leading-relaxed"
        >
          {about?.bio_paragraph_1 && <p>{about.bio_paragraph_1}</p>}
          {about?.bio_paragraph_2 && <p>{about.bio_paragraph_2}</p>}
          {about?.bio_paragraph_3 && <p>{about.bio_paragraph_3}</p>}
        </motion.div>

        {/* Techstack */}
        <motion.div variants={itemVariants} className="mt-20">
          <Techstack />
        </motion.div>
      </motion.div>
    </main>
  );
}
