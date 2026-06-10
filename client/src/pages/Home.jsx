import React, { useEffect, useRef, Suspense, lazy } from "react";
import { Mail, GraduationCap, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TextPressure from "../components/reactbits/TextPressure.jsx";
import gsap from "gsap";

// Lazy load the massive 3D library so the text renders instantly
const Lanyard = lazy(() => import("../components/reactbits/LanyardCard.jsx"));

import DotGridBackground from "../components/DotGridBackground.jsx";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Profile image entrance
      tl.from(".hero-profile", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.2)"
      })
      // "Hi, I'm" characters stagger
      .from(".hero-char", {
        y: 20,
        opacity: 0,
        filter: "blur(5px)",
        duration: 0.6,
        stagger: 0.05
      }, "-=0.6")
      // Main text elements
      .from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
      }, "-=0.4")
      // Buttons stagger
      .from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
      }, "-=0.4");
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden text-slate-900 bg-slate-50/50">
        <DotGridBackground />
        <section ref={containerRef} className="relative z-10 flex min-h-[100svh] items-center px-4 sm:px-6">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

            {/* CREATIVE 3D VISUAL SECTION */}
            <div className="hero-profile order-1 md:order-2 flex justify-center items-center relative w-full h-[400px] sm:h-[500px] md:h-[600px] z-20">
              <Suspense fallback={
                <div className="w-56 h-72 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] rounded-[1.5rem] bg-blue-900/10 border border-blue-500/20 animate-pulse shadow-2xl" />
              }>
                <Lanyard position={[0, 0, 13]} fov={25} />
              </Suspense>
            </div>

            {/* TEXT */}
            <div className="order-2 md:order-1 text-center md:text-left px-4 md:px-0">
              <div className="flex flex-col items-center md:items-start mb-4 gap-1">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight flex py-1">
                  {"Hi, I'm".split("").map((char, index) => (
                    <span key={index} className="hero-char inline-block text-slate-800">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h1>
                <div className="hero-text relative h-16 sm:h-20 md:h-24 w-56 sm:w-72 md:w-96">
                  <TextPressure text="Haidar" flex={false} stroke={false} textColor="#3b82f6" />
                </div>
              </div>

              <div className="hero-text mt-2 sm:mt-3 relative h-8 sm:h-10 md:h-12 w-full max-w-sm mx-auto md:mx-0">
                <TextPressure text="Frontend Developer." flex={true} stroke={false} textColor="#64748b" minFontSize={24} />
              </div>

              {/* INFO BADGE */}
              <div className="hero-text mt-6 sm:mt-8 flex items-center justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-slate-200 backdrop-blur-md text-xs sm:text-sm md:text-base text-slate-600 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-colors duration-300">
                  <GraduationCap size={18} className="text-blue-500" />
                  <span>
                    Informatics Student at{" "}
                    <span className="text-slate-900 font-semibold tracking-wide">
                      Universitas Putra Bangsa
                    </span>
                  </span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="relative z-20 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <motion.div className="hero-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="mailto:haidarhabibi178@gmail.com"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600/80 backdrop-blur-md border border-blue-500/50 px-6 py-3 text-sm sm:text-base font-semibold hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 text-white"
                  >
                    Hire Me
                    <Mail size={18} />
                  </Link>
                </motion.div>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hero-btn inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white backdrop-blur-md px-6 py-3 text-sm sm:text-base font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300"
                >
                  Contact Me
                  <Mail size={18} />
                </motion.a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}