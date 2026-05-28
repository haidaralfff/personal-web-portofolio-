import { motion } from "framer-motion";
import { FolderOpen, ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";

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
    // Static projects data
    const staticProjects = [
      {
        id: 1,
        title: "Personal Portfolio",
        tech: "React, Tailwind CSS, Framer Motion",
        status: "Completed",
        image: ""
      },
      {
        id: 2,
        title: "E-Commerce Platform",
        tech: "Next.js, Node.js, MongoDB",
        status: "In Progress",
        image: ""
      },
      {
        id: 3,
        title: "Task Management App",
        tech: "React, Firebase",
        status: "Planning",
        image: ""
      }
    ];
    setProjects(staticProjects);
    setIsLoading(false);
  }, []);


  return (
    <section className="min-h-screen text-white pt-24 px-6 relative">
      <div className="mx-auto max-w-6xl relative z-10">

        {/* HEADER */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <FolderOpen className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" size={36} />
          </motion.div>

          <h1 className="text-4xl font-bold">
            Projects<span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">.</span>
          </h1>

          <p className="mt-3 text-zinc-300">
            Projects I have worked on
          </p>
        </div>

        {/* GRID */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-zinc-300">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-zinc-300">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:bg-white/10 transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-48 border-b border-white/10">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderImage(index)} opacity-80 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <div className="text-center opacity-90 drop-shadow-md">
                        <p className="text-white font-semibold text-lg">{project.title}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
                    {project.tech}
                  </p>

                  {/* STATUS */}
                  {project.status && (
                    <motion.div
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mb-4 text-xs font-medium text-blue-300 bg-blue-500/10 w-fit px-3 py-1 rounded-full border border-blue-500/20"
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
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600/80 backdrop-blur-md px-4 py-2 text-sm font-semibold hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      View
                    </motion.a>

                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] px-4 py-2 text-sm font-medium transition-all duration-300"
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