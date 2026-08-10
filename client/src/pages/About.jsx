import { motion } from "framer-motion";
import Techstack from "../components/Techstack";

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
          <p>
            I am a fourth-semester Computer Science student at Universitas Putra Bangsa with a strong passion for software development and digital creativity. I focus on building modern web applications using React and Tailwind CSS, emphasizing clean, maintainable code and user-friendly design.
          </p>
          <p>
            I am deeply interested in understanding system logic, software architecture, and how technology works behind the scenes to create efficient and scalable solutions. Outside of programming, I also enjoy video editing and digital content creation, where I combine creativity and technical skills to produce engaging visual stories.
          </p>
          <p>
            I am continuously learning, building real-world projects, and seeking opportunities to grow as a Web Developer who can bridge logic and creativity to create impactful digital solutions.
          </p>
        </motion.div>

        {/* Techstack */}
        <motion.div variants={itemVariants} className="mt-20">
          <Techstack />
        </motion.div>
      </motion.div>
    </main>
  );
}
