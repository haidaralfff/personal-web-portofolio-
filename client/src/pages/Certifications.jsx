import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    title: "Burp Suite for Beginner",
    issuer: "Cyber Academy Indonesia",
    date: "2022",
    credentialId: "BSFB01106252462",
    link: "https://www.cyberacademy.id/certificate/BSFB01106252462",
    file: "/certif/Certificate-of-Completion-Burp-Suite-for-Beginner.pdf",
    color: "from-blue-600 to-blue-400"
  },
  {
    id: 2,
    title: "Introduction to Information Security",
    issuer: "Cyber Academy Indonesia",
    date: "2022",
    credentialId: "PKMI01105251883",
    link: "https://www.cyberacademy.id/certificate/PKMI01105251883",
    file: "/certif/Certificate-of-Completion-Introduction-to-Information-Security.pdf",
    color: "from-blue-500 to-blue-300"
  }
];

export default function Certifications() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".cert-header", {
        opacity: 0,
        y: -30,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.1
      })
        .from(".cert-card", {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out"
        }, "-=0.4");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={containerRef} className="min-h-screen text-white pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl relative z-10">

        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-center">
          <div
            className="cert-header mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <Award className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" size={36} />
          </div>
          <h1
            className="cert-header text-4xl md:text-5xl font-bold uppercase tracking-tight text-center"
          >
            Certifications<span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">.</span>
          </h1>
          <p className="cert-header mt-4 text-zinc-400 text-center max-w-lg">
            Professional achievements and courses completed to enhance my technical skills.
          </p>
        </div>

        {/* Custom Ticket/Certificate Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -8, scale: 1.02 }}
              className="cert-card relative group flex flex-col rounded-3xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Glowing Top Border */}
              <div className={`h-2 w-full bg-gradient-to-r ${cert.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                {/* PDF Viewer / Thumbnail container */}
                <div className="w-full h-64 md:h-72 bg-white/5 rounded-2xl mb-6 overflow-hidden border border-white/10 relative group/pdf">
                  {cert.file ? (
                    <>
                      <iframe
                        src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        className="w-full h-full pointer-events-none"
                        title={cert.title}
                      />
                      {/* Overlay to allow clicking the entire card and prevent scrolling inside iframe */}
                      <a href={cert.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/pdf:opacity-100 bg-black/40 backdrop-blur-sm transition-all duration-300">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow-lg flex items-center gap-2">
                          <ExternalLink size={16} /> View Certificate
                        </span>
                      </a>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <Award size={64} opacity={0.2} />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-400 font-mono mb-4">
                  <span className="bg-white/5 px-2 py-1 rounded-md border border-white/10">{cert.date}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                  {cert.title}
                </h3>

                <p className="text-zinc-400 font-medium mb-8">
                  {cert.issuer}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 border-dashed flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">Credential ID</span>
                    <span className="text-xs text-zinc-300 font-mono">{cert.credentialId}</span>
                  </div>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center p-3 rounded-full bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group/btn z-30"
                  >
                    <ExternalLink size={18} className="text-zinc-400 group-hover/btn:text-blue-400 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
