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

const renderTechItem = (tech) => {
  const Icon = tech.icon;
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer">
      <Icon
        size={40}
        style={{ color: tech.color }}
        className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_12px_currentColor]"
      />
      <span className="text-xs sm:text-sm text-ivory-400 dark:text-ivory-500 group-hover:text-ivory-800 dark:group-hover:text-ivory-100 font-medium transition-colors">
        {tech.name}
      </span>
    </div>
  );
};

export default function Techstack() {
  return (
    <section className="min-h-screen bg-ivory-50 dark:bg-ivory-900 pt-24 px-4 sm:px-6 flex items-center transition-colors duration-500">
      <div className="mx-auto max-w-5xl w-full text-center">
        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl font-normal text-ivory-800 dark:text-ivory-100 transition-colors duration-500">
          Techstack<span className="text-blue-500">.</span>
        </h1>

        <p className="mt-4 font-mono text-xs sm:text-sm text-ivory-400 dark:text-ivory-500 transition-colors duration-500">
          Technologies I have worked with
        </p>

        {/* Logo Loop Carousel */}
        <div className="mt-10">
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
        </div>
      </div>
    </section>
  );
}
