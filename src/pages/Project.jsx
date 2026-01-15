import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Frontend Portfolio",
    description: "Personal portfolio built with React & Tailwind CSS.",
    tech: ["React", "Tailwind", "JavaScript"],
    status: "Coming Soon",
  },
  {
    id: 2,
    title: "Dashboard Admin",
    description: "Admin dashboard with CRUD feature (static for now).",
    tech: ["React", "REST API"],
    status: "Coming Soon",
  },
  {
    id: 3,
    title: "Landing Page",
    description: "Modern responsive landing page design.",
    tech: ["HTML", "CSS", "JS"],
    status: "Coming Soon",
  },
];

export default function Project() {
  return (
    <section className="min-h-screen bg-zinc-950 text-white pt-24 px-6">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10"
          >
            <FolderOpen className="text-blue-500" size={36} />
          </motion.div>

          <h1 className="text-4xl font-bold">
            Projects<span className="text-blue-500">.</span>
          </h1>

          <p className="mt-3 text-zinc-400">
            Projects I have worked on
          </p>
        </div>

        {/* PROJECT CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-blue-500/50 transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* TECH STACK */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* STATUS */}
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xs text-blue-400"
              >
                🚧 {project.status}
              </motion.span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
