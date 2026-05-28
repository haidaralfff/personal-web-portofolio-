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
import LogoLoop from "./reactbits/Logo Loop";

const stacks = [
  { name: "React", icon: Code2 },
  { name: "Tailwind CSS", icon: Palette },
  { name: "JavaScript", icon: Code2 },
  { name: "Node.js", icon: Server },
  { name: "Express", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Supabase", icon: Cloud },
  { name: "XAMPP", icon: Database },
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

const renderTechItem = (tech) => {
  const Icon = tech.icon;
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <Icon
        size={40}
        className="text-blue-300 hover:text-blue-400 transition-colors"
      />
      <span className="text-xs sm:text-sm text-white font-medium">
        {tech.name}
      </span>
    </div>
  );
};

export default function Techstack() {
  return (
    <section className="min-h-screen text-white pt-24 px-4 sm:px-6 flex items-center">
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

        {/* Logo Loop Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <LogoLoop
            logos={stacks}
            speed={80}
            direction="left"
            logoHeight={80}
            gap={56}
            pauseOnHover={true}
            scaleOnHover={true}
            renderItem={renderTechItem}
            ariaLabel="Technology stack carousel"
          />
        </motion.div>
      </div>
    </section>
  );
}
