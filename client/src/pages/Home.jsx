import React, { useEffect, useRef, Suspense, lazy } from "react";
import { Mail, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import gsap from "gsap";
import CVDownload from "../components/CVDownload";

const Lanyard = lazy(() => import("../components/reactbits/LanyardCard.jsx"));
import DotGridBackground from "../components/DotGridBackground.jsx";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-profile", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.2)",
      })
        .from(
          ".hero-line",
          { width: 0, duration: 0.6 },
          "-=0.6"
        )
        .from(
          ".hero-name",
          { y: 40, opacity: 0, duration: 0.8 },
          "-=0.3"
        )
        .from(
          ".hero-subtitle",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".hero-badge",
          { y: 15, opacity: 0, duration: 0.5 },
          "-=0.3"
        )
        .from(
          ".hero-btn",
          { y: 15, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.2"
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ivory-50">
      <DotGridBackground />

      <section
        ref={containerRef}
        className="relative z-10 flex min-h-[100svh] items-center px-6 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* TEXT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="hero-subtitle font-mono text-xs sm:text-sm tracking-mega uppercase text-blue-400 mb-4">
              Frontend Developer
            </p>

            <div className="hero-line w-12 h-[2px] bg-blue-500 mb-6 mx-auto lg:mx-0" />

            <h1 className="hero-name font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-ivory-800 leading-[0.95] tracking-tight">
              Haidar
              <br />
              <span className="text-blue-500">Habibi</span>
              <span className="text-black-400 gap-2">Al Farisi</span>
            </h1>

            <p className="hero-subtitle mt-6 text-base sm:text-lg text-blue-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Building fast, accessible interfaces for modern web applications.
            </p>

            {/* BADGE */}
            <div className="hero-badge mt-8 flex items-center justify-center lg:justify-start gap-2.5 text-sm text-ivory-400">
              <GraduationCap size={16} className="text-blue-500" />
              <span>Informatics Student at</span>
              <span className="font-semibold text-ivory-700">
                Universitas Putra Bangsa
              </span>
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div className="hero-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="mailto:haidarhabibi178@gmail.com"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg bg-blue-500 px-7 py-3.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors duration-200"
                >
                  Get in Touch
                  <Mail size={16} />
                </Link>
              </motion.div>

              <motion.div className="hero-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <CVDownload />
              </motion.div>
            </div>
          </div>

          {/* 3D VISUAL */}
          <div className="hero-profile order-1 lg:order-2 flex justify-center items-center relative w-full h-[320px] sm:h-[400px] lg:h-[560px]">
            <Suspense
              fallback={
                <div className="w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-[26rem] rounded-2xl bg-ivory-100 border border-ivory-200 animate-pulse" />
              }
            >
              <Lanyard position={[0, 0, 13]} fov={25} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}