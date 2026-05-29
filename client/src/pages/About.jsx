import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Techstack from "../components/Techstack";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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

      tl.from(".about-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main id="about" ref={containerRef} className="min-h-screen text-white px-6 py-28 relative overflow-hidden">
      <div className="mx-auto max-w-3xl relative z-10">
        
        {/* Title */}
        <h1 className="about-item text-3xl md:text-5xl font-bold mb-16">
          About <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">Me</span>
        </h1>

        {/* Interactive Paragraph */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="about-item group relative bg-white/5 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-300"
        >
          {/* Animated accent line */}
          <div className="w-12 h-1 bg-blue-500 mb-8 transition-all duration-500 group-hover:w-24 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

          <p className="text-zinc-300 leading-relaxed text-lg transition duration-300 group-hover:text-white">
            Saya adalah mahasiswa Ilmu Komputer semester empat yang memiliki 
            passion kuat dalam pengembangan perangkat lunak dan kreativitas digital. Saya 
            fokus membangun aplikasi web modern menggunakan{" "}
            <span className="text-white font-medium">React.js</span> dan{" "}
            <span className="text-white font-medium">Tailwind CSS</span>, dengan menekankan 
            pada kode yang bersih, mudah dipelihara, serta desain yang ramah pengguna. 
            Saya sangat tertarik untuk memahami logika sistem, arsitektur perangkat lunak, 
            dan bagaimana teknologi bekerja di balik layar demi menciptakan solusi yang 
            efisien dan terukur. Di luar pemrograman, saya juga menikmati penyuntingan 
            video dan pembuatan konten digital, di mana saya menggabungkan kreativitas dan 
            keterampilan teknis untuk menghasilkan cerita visual yang menarik. Saya terus 
            belajar, membangun proyek nyata, dan mencari peluang untuk berkembang sebagai 
            seorang{" "}
            <span className="text-white font-medium">Web Developer</span> yang mampu 
            menjembatani logika dan kreativitas untuk menciptakan solusi digital yang berdampak.
          </p>
        </motion.div>

        {/* Techstack */}
        <div className="about-item mt-24">
          <Techstack />
        </div>
      </div>
    </main>
  );
}