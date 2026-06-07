import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X, Info, Code2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoffeImg from "../portofolio/coffe.png";
import DashboardImg from "../portofolio/dashboard.jpeg";
import DompetkuImg from "../portofolio/dompetku.png";

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const staticProjects = [
      {
        id: 1,
        title: "DompetKu",
        tech: ["React", "Tailwind CSS", "Firebase"],
        status: "Completed",
        image: DompetkuImg,
        description: "A comprehensive personal finance and expense tracking application. DompetKu helps users manage their daily transactions, visualize spending habits, and maintain a healthy budget with an intuitive interface.",
        features: ["Expense Tracking", "Budget Visualization", "Secure Authentication", "Responsive UI"],
        github: "#",
        live: "#",
        color: "from-blue-600 to-indigo-600"
      },
      {
        id: 2,
        title: "Coffee Shop POS",
        tech: ["Next.js", "Node.js", "MongoDB"],
        status: "Completed",
        image: CoffeImg, 
        description: "A digital menu and Point of Sale (POS) system designed for a modern coffee shop. Features a beautifully crafted user interface for browsing coffee varieties, managing cart items, and placing orders seamlessly.",
        features: ["Digital Menu", "Order Management", "Cart System", "Modern UI"],
        github: "#",
        live: "#",
        color: "from-amber-600 to-orange-500"
      },
      {
        id: 3,
        title: "Admin Dashboard",
        tech: ["React", "Chart.js", "Tailwind"],
        status: "In Progress",
        image: DashboardImg,
        description: "An advanced administrative dashboard for data analytics and monitoring. Provides comprehensive visual insights into user metrics, sales data, and system performance indicators in real-time.",
        features: ["Real-time Metrics", "Interactive Charts", "Data Visualization", "Dark Mode UI"],
        github: "#",
        live: "#",
        color: "from-cyan-500 to-blue-500"
      }
    ];
    setProjects(staticProjects);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (projects.length > 0) {
      const ctx = gsap.context(() => {
        // Header animation
        gsap.from(".proj-header", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: -50,
          scale: 0.9,
          duration: 1,
          ease: "power4.out",
          stagger: 0.15
        });

        // Massive rows animation
        const rows = gsap.utils.toArray(".proj-showcase");
        rows.forEach((row, i) => {
          const content = row.querySelector(".proj-content");
          const visual = row.querySelector(".proj-visual");
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          });

          tl.fromTo(content, 
            { opacity: 0, x: -50 }, 
            { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
          );

          tl.fromTo(visual, 
            { opacity: 0, scale: 0.8, rotateY: 15 }, 
            { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "back.out(1.2)" }, 
            "-=0.6"
          );
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [projects]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);


  return (
    <section ref={containerRef} className="min-h-screen text-slate-900 pt-32 pb-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 -left-64 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl relative z-10">

        {/* HEADER */}
        <div className="mb-24 md:mb-32 flex flex-col items-center">
          <div className="proj-header mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Code2 className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" size={36} />
          </div>
          <h1 className="proj-header text-5xl md:text-7xl font-black uppercase tracking-tighter text-center leading-none mb-6">
            Selected<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Works.</span>
          </h1>
          <p className="proj-header text-slate-600 text-center max-w-xl text-lg">
            A curated collection of my most impactful and creative digital experiences.
          </p>
        </div>

        {/* PREMIUM SHOWCASE LIST */}
        <div className="flex flex-col gap-32 lg:gap-40">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={project.id} className={`proj-showcase relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                
                {/* Content Side */}
                <div className="proj-content w-full lg:w-1/2 flex flex-col items-start z-20">
                  <span className="text-blue-400 font-mono text-sm tracking-widest mb-4 border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/10 backdrop-blur-sm">
                    PROJECT_0{index + 1}
                  </span>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
                    {project.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs md:text-sm font-medium bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-lg">
                    {project.description}
                  </p>

                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white shadow-sm border border-slate-200 rounded-full overflow-hidden hover:border-blue-300 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <span className="relative z-10 text-slate-800 font-semibold tracking-wide flex items-center gap-2 group-hover:text-blue-700">
                      Explore Case Study
                      <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </div>

                {/* Visual Side */}
                <div className="proj-visual w-full lg:w-1/2 relative perspective-1000 z-10 cursor-pointer" onClick={() => setSelectedProject(project)}>
                  {/* Huge background number */}
                  <div className={`absolute top-1/2 ${isEven ? '-right-10' : '-left-10'} -translate-y-1/2 text-[15rem] font-black text-white/[0.03] select-none pointer-events-none z-0`}>
                    {index + 1}
                  </div>
                  
                  <div className={`relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 group transform-gpu transition-all duration-700 hover:rotate-y-0 hover:rotate-x-0 ${isEven ? 'rotate-y-[-5deg] rotate-x-[2deg]' : 'rotate-y-[5deg] rotate-x-[2deg]'}`}>
                    
                    {/* Glowing Aura */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-50 transition-opacity duration-700 blur-3xl`} />
                    
                    {/* Image Container */}
                    <div className="absolute inset-2 md:inset-4 rounded-[1.5rem] overflow-hidden bg-black/50 border border-white/5">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover filter contrast-110 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      
                      {/* Status indicator on image */}
                      <div className="absolute top-6 right-6">
                        <span className="flex items-center gap-2 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                          <div className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* PREMIUM PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/70"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col max-h-[90vh]"
            >
              {/* Floating Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md hover:bg-red-50 hover:text-red-500 border border-slate-200 rounded-full text-slate-500 transition-colors group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Modal Banner */}
              <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                
                {/* Title overlaying banner */}
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="inline-block mb-3 text-xs font-bold text-slate-800 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200">
                    {selectedProject.status}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">{selectedProject.title}</h2>
                </div>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-8 sm:p-10 overflow-y-auto custom-scrollbar flex flex-col md:flex-row gap-10">
                
                {/* Left Col: Details */}
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Info size={20} className="text-blue-500" />
                    Overview
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-10 text-lg">
                    {selectedProject.description}
                  </p>

                  {selectedProject.features && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Key Features</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 shadow-sm" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Col: Tech & Links */}
                <div className="w-full md:w-1/3 flex flex-col gap-8">
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, i) => (
                         <span key={i} className="text-sm font-medium text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                           {t}
                         </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-blue-600/90 backdrop-blur-md text-white font-semibold hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
                    >
                      Visit Live Site
                      <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>

                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 backdrop-blur-md text-slate-800 font-medium hover:bg-slate-100 hover:border-slate-300 transition-all duration-300"
                    >
                      Source Code
                      <Github size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}