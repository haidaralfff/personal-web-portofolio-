// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Techstack from "../components/Techstack";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <main className="min-h-screen text-white px-6 py-28 relative overflow-hidden">
      <motion.div
        className="mx-auto max-w-3xl relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        {/* Title */}
        <motion.h1
          variants={item}
          className="text-3xl md:text-5xl font-bold mb-16"
        >
          About <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">Me</span>
        </motion.h1>

        {/* Interactive Paragraph */}
        <motion.div
          variants={item}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="group relative bg-white/5 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-300"
        >
          {/* Animated accent line */}
          <div className="w-12 h-1 bg-blue-500 mb-8 transition-all duration-500 group-hover:w-24 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

          <p className="text-zinc-300 leading-relaxed text-lg transition duration-300 group-hover:text-white">
            I am a third-semester Information Technology student with a strong
            passion for software development and digital creativity. I focus on
            building modern web applications using{" "}
            <span className="text-white font-medium">React.js</span> and{" "}
            <span className="text-white font-medium">Tailwind CSS</span>,
            emphasizing clean, maintainable code and user-friendly design. I am
            highly interested in understanding system logic, software
            architecture, and how technology works behind the scenes to create
            efficient and scalable solutions. Beyond programming, I also enjoy
            video editing and digital content creation, where I combine
            creativity and technical skills to produce engaging visual stories.
            I am continuously learning, building real-world projects, and
            seeking opportunities to grow as a{" "}
            <span className="text-white font-medium">
              Software Developer
            </span>{" "}
            who can bridge logic and creativity to build impactful digital
            solutions.
          </p>
        </motion.div>

        {/* Techstack */}
        <motion.div variants={item} className="mt-24">
          <Techstack />
        </motion.div>
      </motion.div>
    </main>
  );
}