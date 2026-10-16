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
    date: "2025",
    link: "https://www.cyberacademy.id/certificate/BSFB01106252462",
    file: "/certif/Certificate-of-Completion-Burp-Suite-for-Beginner.pdf",
    color: "from-blue-600 to-blue-400"
  },
  {
    id: 2,
    title: "Introduction to Information Security",
    issuer: "Cyber Academy Indonesia",
    date: "2025",
    link: "https://www.cyberacademy.id/certificate/PKMI01105251883",
    file: "/certif/Certificate-of-Completion-Introduction-to-Information-Security.pdf",
    color: "from-blue-500 to-blue-300"
  },
  {
    id: 3,
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    date: "2026",
    link: "https://www.dicoding.com/certificates/07Z6Q55NRZQR",
    file: "/certif/sertifikat_course_123_5028110_240826132406.pdf",
    color: "from-emerald-600 to-emerald-400"
  },
  {
    id: 4,
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding",
    date: "2026",
    link: "https://www.dicoding.com/certificates/JLX1K1L6JP72",
    file: "/certif/sertifikat_course_237_5028110_190826205121.pdf",
    color: "from-violet-600 to-violet-400"
  },
  {
    id: 5,
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding",
    date: "2026",
    link: "https://www.dicoding.com/certificates/N9ZO0DY5YXG5",
    file: "/certif/sertifikat_course_317_5028110_200826221625.pdf",
    color: "from-amber-600 to-amber-400"
  },
  {
    id: 6,
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding",
    date: "2026",
    link: "https://www.dicoding.com/certificates/GRX50NG6RZ0M",
    file: "/certif/sertifikat_course_256_5028110_080826210124.pdf",
    color: "from-rose-600 to-rose-400"
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
    <section ref={containerRef} className="bg-ivory-50 pt-20 pb-16 px-4 sm:px-6 relative overflow-hidden transition-colors duration-500">
      <div className="mx-auto w-full max-w-5xl relative z-10">

        {/* Header */}
        <div className="mb-10 md:mb-14 flex flex-col items-center">
          <p className="cert-header font-mono text-xs tracking-mega uppercase text-blue-400 mb-4">
            Certifications
          </p>
          <h1
            className="cert-header font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 leading-[0.95] tracking-tight text-center"
          >
            Achievements & Certification<span className="text-blue-500">.</span>
          </h1>
          <p className="cert-header mt-6 text-ivory-400 text-center max-w-lg">
            Professional achievements and courses completed to enhance my technical skills.
          </p>
        </div>

        {/* Ticket/Certificate Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6, scale: 1.02 }}
              className="cert-card relative group flex flex-col rounded-3xl bg-white/60 border border-ivory-200 overflow-hidden"
            >
              {/* Glowing Top Border */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${cert.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="p-4 md:p-5 flex flex-col flex-grow relative z-10">
                {/* PDF Viewer / Thumbnail container */}
                <div className="w-full h-40 md:h-48 bg-ivory-100 rounded-xl mb-4 overflow-hidden border border-ivory-200 relative group/pdf">
                  {cert.file ? (
                    <>
                      <iframe
                        src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        className="w-full h-full pointer-events-none"
                        title={cert.title}
                      />
                      <a href={cert.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/pdf:opacity-100 bg-black/40 backdrop-blur-sm transition-all duration-300">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow-lg flex items-center gap-2">
                          <ExternalLink size={16} /> View Certificate
                        </span>
                      </a>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ivory-300">
                      <Award size={56} opacity={0.2} />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-ivory-400 font-mono mb-3">
                  <span className="bg-ivory-100 px-2 py-1 rounded-md border border-ivory-200">{cert.date}</span>
                </div>

                <h3 className="font-display text-lg md:text-xl font-normal text-ivory-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {cert.title}
                </h3>

                <p className="text-sm text-ivory-400 mb-4">
                  {cert.issuer}
                </p>

                <div className="mt-auto pt-4 border-t border-ivory-200 border-dashed flex items-center justify-end">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center p-2.5 rounded-full bg-ivory-100 hover:bg-blue-50 hover:text-blue-600 border border-ivory-200 hover:border-blue-300 transition-all duration-300 group/btn z-30"
                  >
                    <ExternalLink size={16} className="text-ivory-400 group-hover/btn:text-blue-600 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
