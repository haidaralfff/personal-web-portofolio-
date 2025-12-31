// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { GraduationCap, Code2, Target } from "lucide-react";


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-24">
      <motion.div
        className="mx-auto max-w-4xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
      >

        {/* Title */}
        <motion.h1
          variants={item}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          About <span className="text-blue-500">Me</span>
        </motion.h1>

        {/* Content */}
        <div className="space-y-8">

          {/* Profile */}
          <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            className="flex items-start gap-4 rounded-xl border border-zinc-800 p-6 hover:border-blue-500/50 transition"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <GraduationCap className="text-blue-500" />
            </motion.div>

            <p className="text-zinc-300 leading-relaxed">
              I am a third-semester student at{" "}
              <span className="text-white font-medium">
                Universitas Putra Bangsa
              </span>
              , currently focusing on developing my skills in frontend web
              development. I have a strong interest in building modern,
              responsive, and user-friendly web interfaces.
            </p>
          </motion.div>

          {/* Skills Focus */}
          <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            className="flex items-start gap-4 rounded-xl border border-zinc-800 p-6 hover:border-blue-500/50 transition"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              <Code2 className="text-blue-500" />
            </motion.div>

            <p className="text-zinc-300 leading-relaxed">
              I mainly work with{" "}
              <span className="text-white font-medium">React.js</span> and{" "}
              <span className="text-white font-medium">Tailwind CSS</span> to
              create clean and maintainable UI components. I enjoy turning
              designs into functional web experiences while paying attention to
              detail and usability.
            </p>
          </motion.div>

          {/* Goal */}
          <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            className="flex items-start gap-4 rounded-xl border border-zinc-800 p-6 hover:border-blue-500/50 transition"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              <Target className="text-blue-500" />
            </motion.div>

            <p className="text-zinc-300 leading-relaxed">
              My goal is to grow as a{" "}
              <span className="text-white font-medium">
                Junior Frontend Developer
              </span>{" "}
              and gain real-world experience by working on meaningful projects,
              collaborating with teams, and continuously learning new
              technologies in the frontend ecosystem.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </main>
  );
}
