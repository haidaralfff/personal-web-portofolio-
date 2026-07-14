import { motion } from "framer-motion";
import Techstack from "../components/Techstack";
import CVDownload from "../components/CVDownload";

const stats = [
  { value: "4", label: "Semesters" },
  { value: "2", label: "Shipped Projects" },
  { value: "React +", label: "Tailwind" },
];

export default function About() {
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

  return (
    <main className="min-h-screen bg-ivory-50 px-6 py-28 relative overflow-hidden flex flex-col justify-center">
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
        <motion.div variants={itemVariants} className="mb-16">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 leading-[0.95] tracking-tight">
            About Me
          </h1>
          <div className="w-12 h-[2px] bg-blue-500 mt-6" />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center md:justify-start gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="font-display text-4xl sm:text-5xl text-ivory-800">
                {stat.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-ivory-400">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Download CV */}
        <motion.div variants={itemVariants} className="mt-10">
          <CVDownload />
        </motion.div>

        {/* Techstack */}
        <motion.div variants={itemVariants} className="mt-20">
          <Techstack />
        </motion.div>
      </motion.div>
    </main>
  );
}
