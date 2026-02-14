import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Database,
  Server,
  GitBranch,
  Figma,
  Cloud,
} from "lucide-react";

const stacks = [
  { name: "React", icon: Code2 },
  { name: "Tailwind CSS", icon: Palette },
  { name: "JavaScript", icon: Code2 },
  { name: "Node.js", icon: Server },
  { name: "Express", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Supabase", icon: Cloud },
  { name: "Git", icon: GitBranch },
  { name: "Figma", icon: Figma },
];

// container animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// item animation
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Techstack() {
  return (
    <section className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 flex items-center">
      <div className="mx-auto max-w-5xl w-full text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold"
        >
          Techstack<span className="text-blue-500">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-xs sm:text-sm text-zinc-400"
        >
          Technologies I have worked with
        </motion.p>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="
            mt-10
            grid grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            gap-3 sm:gap-4
          "
        >
          {stacks.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover={{ y: -6, scale: 1.03 }}
              className="
                group rounded-xl
                border border-zinc-800
                bg-zinc-900/60
                p-4 sm:p-5
                flex flex-col items-center gap-2 sm:gap-3
                transition-colors
                hover:border-blue-500
              "
            >
              <Icon
                size={26}
                className="text-zinc-400 group-hover:text-blue-500 transition-colors"
              />
              <span className="text-xs sm:text-sm text-zinc-200 group-hover:text-white">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
