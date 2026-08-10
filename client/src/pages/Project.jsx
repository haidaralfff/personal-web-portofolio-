import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoffeImg from "../portofolio/coffe.png";
import SipbansosImg from "../portofolio/sipbansos.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "SIPBANSOS",
    category: "Social Assistance",
    tech: ["Reactjs", "Tailwind CSS", "Go", "PostgreSQL"],
    status: "Completed",
    image: SipbansosImg,
    description:
      "Sistem Informasi Bantuan Sosial — a platform for managing social assistance data, streamlining the process from application to distribution with a clean, accessible interface.",
    features: [
      "Data Management",
      "Application Tracking",
      "Secure Auth",
      "Responsive Design",
    ],
    github: "https://github.com/haidaralfff/SIPBANSOS",
    live: "https://sipbansos.vercel.app/",
  },
  {
    id: 2,
    title: "Simple Coffee Landing Page",
    category: "Landing Page",
    tech: ["HTML", "CSS", "JavaScript", "AOS Library"],
    status: "Completed",
    image: CoffeImg,
    description:
      "Digital menu and POS system for a modern coffee shop. Built to handle the flow from browsing to checkout with an interface that feels as warm as the coffee it serves.",
    features: ["Navigation", "Section", "Responsive Design", "Animations"],
    github: "https://github.com/haidaralfff/simple-coffeshop",
    live: "https://simple-coffeshop.vercel.app/",
  },
];

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });

      gsap.utils.toArray(".proj-section").forEach((section) => {
        const img = section.querySelector(".proj-image");
        const content = section.querySelector(".proj-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          img,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );

        tl.fromTo(
          content,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section
      ref={containerRef}
      className="bg-ivory-50 dark:bg-ivory-900 text-ivory-800 dark:text-ivory-100 pt-32 pb-24 relative transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <span className="proj-header font-mono text-xs tracking-mega text-amber-700 dark:text-amber-400 uppercase block mb-4 transition-colors duration-500">
            Selected Works
          </span>
          <h2 className="proj-header font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-ivory-800 dark:text-ivory-100">
            Work
          </h2>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-20 sm:gap-32 md:gap-40">
          {projects.map((project, index) => (
            <article key={project.id} className="proj-section group">
              {/* Project label */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs tracking-mega text-amber-700 dark:text-amber-400 uppercase transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-ivory-200 dark:bg-ivory-700" />
                <span className="font-mono text-xs tracking-wider text-ivory-400 dark:text-ivory-500 uppercase">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-ivory-800 dark:text-ivory-100 mb-8 md:mb-12">
                {project.title}
              </h3>

              {/* Screenshot */}
              <div
                className="proj-image relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer mb-8 md:mb-12 border border-ivory-200 dark:border-ivory-700"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-ivory-800/0 group-hover:bg-ivory-800/10 dark:group-hover:bg-white/5 transition-colors duration-500" />

                {/* View overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-2 bg-ivory-800 dark:bg-ivory-100 text-ivory-50 dark:text-ivory-900 px-6 py-3 rounded-full font-mono text-sm tracking-wide transition-colors duration-500">
                    View Project <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="proj-content grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-7">
                  <p className="text-ivory-500 dark:text-ivory-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono text-xs tracking-wider text-amber-700 dark:text-amber-400 bg-amber-700/10 dark:bg-amber-400/10 px-3 py-1.5 rounded-md border border-amber-700/20 dark:border-amber-400/20 transition-colors duration-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-6">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 font-mono text-sm text-ivory-400 dark:text-ivory-500 hover:text-ivory-800 dark:hover:text-ivory-100 transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-2 font-mono text-sm text-ivory-400 dark:text-ivory-500 hover:text-ivory-800 dark:hover:text-ivory-100 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal — slide-in panel */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-stretch justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-ivory-900/40 backdrop-blur-[4px]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-ivory-50 dark:bg-ivory-900 border-l border-ivory-200 dark:border-ivory-700 overflow-y-auto"
            >
              {/* Sticky header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-ivory-50/90 dark:bg-ivory-900/90 backdrop-blur-sm border-b border-ivory-200 dark:border-ivory-700">
                <span className="font-mono text-xs tracking-mega text-ivory-400 dark:text-ivory-500 uppercase">
                  Project Detail
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 -mr-2 text-ivory-400 dark:text-ivory-500 hover:text-ivory-800 dark:hover:text-ivory-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Banner */}
              <div className="relative w-full aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 md:p-10">
                <span className="inline-block font-mono text-xs tracking-mega text-amber-700 dark:text-amber-400 uppercase mb-4 transition-colors duration-500">
                  {selectedProject.status}
                </span>

                <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight text-ivory-800 dark:text-ivory-100 mb-6">
                  {selectedProject.title}
                </h2>

                <p className="text-ivory-500 dark:text-ivory-400 text-lg leading-relaxed mb-10">
                  {selectedProject.description}
                </p>

                {/* Features */}
                {selectedProject.features && (
                  <div className="mb-10">
                    <h4 className="font-mono text-xs tracking-mega text-ivory-400 dark:text-ivory-500 uppercase mb-4">
                      What it does
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-ivory-600 dark:text-ivory-400 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-700 dark:bg-amber-400 shrink-0 transition-colors duration-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech */}
                <div className="mb-10">
                  <h4 className="font-mono text-xs tracking-mega text-ivory-400 dark:text-ivory-500 uppercase mb-4">
                    Built with
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span
                        key={i}
                        className="font-mono text-xs tracking-wider text-amber-700 dark:text-amber-400 bg-amber-700/10 dark:bg-amber-400/10 px-3 py-1.5 rounded-md border border-amber-700/20 dark:border-amber-400/20 transition-colors duration-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-ivory-200 dark:border-ivory-700">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-ivory-800 dark:bg-ivory-100 text-ivory-50 dark:text-ivory-900 font-mono text-sm tracking-wide rounded-lg hover:bg-ivory-700 dark:hover:bg-ivory-200 transition-colors"
                  >
                    Visit Live <ExternalLink size={16} />
                  </a>
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 flex-1 px-6 py-3 border border-ivory-200 dark:border-ivory-700 text-ivory-600 dark:text-ivory-400 font-mono text-sm tracking-wide rounded-lg hover:border-ivory-400 dark:hover:border-ivory-500 transition-colors"
                  >
                    Source Code <Github size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
