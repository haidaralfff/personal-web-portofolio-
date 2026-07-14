import { motion } from "framer-motion";
import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiSupabase,
  SiXampp,
  SiGit,
  SiFigma,
} from "react-icons/si";
import LogoLoop from "./reactbits/Logo Loop";

const stacks = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#000000" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "XAMPP", icon: SiXampp, color: "#FB7A24" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
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
    <div className="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer">
      <Icon
        size={40}
        style={{ color: tech.color }}
        className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_12px_currentColor]"
      />
      <span className="text-xs sm:text-sm text-ivory-400 group-hover:text-ivory-800 font-medium transition-colors">
        {tech.name}
      </span>
    </div>
  );
};

export default function Techstack() {
  return (
    <section className="min-h-screen bg-ivory-50 pt-24 px-4 sm:px-6 flex items-center">
      <div className="mx-auto max-w-5xl w-full text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl font-normal text-ivory-800"
        >
          Techstack<span className="text-blue-500">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 font-mono text-xs sm:text-sm text-ivory-400"
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
