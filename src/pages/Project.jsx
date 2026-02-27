import { motion } from "framer-motion";
import { FolderOpen, ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { projectService } from "../services/api";

const getPlaceholderImage = (index) => {
  const colors = [
    "from-blue-600 to-blue-400",
    "from-purple-600 to-purple-400",
    "from-pink-600 to-pink-400",
    "from-green-600 to-green-400",
    "from-yellow-600 to-yellow-400",
  ];
  return colors[index % colors.length];
};

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* GRID */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-zinc-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-zinc-400">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col h-full rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-blue-500/50 transition"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-48">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderImage(index)} flex items-center justify-center`}>
                      <div className="text-center opacity-80">
                        <p className="text-white font-semibold">{project.title}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                    {project.tech}
                  </p>

                  {/* STATUS */}
                  {project.status && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mb-4 text-xs text-yellow-400"
                    >
                      {project.status}
                    </motion.div>
                  )}

                  {/* BUTTON */}
                  <div className="flex gap-3 mt-auto">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium transition"
                    >
                      <ExternalLink size={16} />
                      View
                    </motion.a>

                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center rounded-lg border border-zinc-700 hover:border-blue-500 hover:bg-blue-500/10 px-4 py-2 text-sm font-medium transition"
                    >
                      <Github size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}