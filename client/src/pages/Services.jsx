import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaPaintBrush } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Web Development",
    description: "Building fast, responsive, and robust web applications using modern technologies like React, Vite, and Next.js. I focus on writing clean, maintainable code to create scalable products.",
    icon: FaLaptopCode,
    color: "#3b82f6", // blue-500
  },
  {
    id: "02",
    title: "UI/UX Design",
    description: "Designing intuitive, accessible, and stunning user interfaces. I bridge the gap between aesthetics and functionality to deliver exceptional user experiences that keep visitors engaged.",
    icon: FaPaintBrush,
    color: "#60a5fa", // blue-400
  },
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".service-header", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(".service-item", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.4")
      .from(".service-display", {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-ivory-50 dark:bg-ivory-900 pt-24 pb-20 px-4 sm:px-6 flex flex-col justify-center relative transition-colors duration-500">
      <div className="mx-auto w-full max-w-6xl relative z-10">

        {/* Header */}
        <div className="service-header mb-16 md:mb-24 flex flex-col items-center md:items-start">
          <p className="font-mono text-xs tracking-mega uppercase text-blue-400 mb-4">
            Services
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 dark:text-ivory-100 leading-[0.95] tracking-tight">
            My Expertise
          </h1>
          <div className="w-12 h-[2px] bg-blue-500 mt-6" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left: Interactive Typography List */}
          <div className="lg:w-1/2 flex flex-col gap-8 lg:gap-12 justify-center">
            {services.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className="service-item group cursor-pointer flex items-center gap-6"
                >
                  <span                    className={`text-xl md:text-2xl font-mono font-bold transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-ivory-300 dark:text-ivory-600 group-hover:text-ivory-400 dark:group-hover:text-ivory-500'}`}>
                    {service.id}
                  </span>
                   <h2 className={`font-display text-3xl md:text-5xl font-normal tracking-tight transition-all duration-500 ${isActive ? 'text-ivory-800 dark:text-ivory-100 translate-x-6' : 'text-ivory-300 dark:text-ivory-600 group-hover:text-ivory-400 dark:group-hover:text-ivory-500 group-hover:translate-x-2'}`}>
                    {service.title}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Display */}
          <div className="service-display lg:w-1/2 relative min-h-[250px] md:min-h-[350px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              {services.map((service, idx) => {
                if (idx !== activeIdx) return null;
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    {/* Massive Background Icon */}
                    <div
                      className="absolute -top-10 right-0 md:-right-10 opacity-5 pointer-events-none transition-colors duration-500"
                      style={{ color: service.color }}
                    >
                      <Icon size={180} className="md:w-[280px] md:h-[280px]" />
                    </div>

                    <div className="relative z-10">
                      <div
                        className="mb-8 inline-flex p-5 rounded-2xl bg-white/60 dark:bg-ivory-800/60 border border-ivory-200 dark:border-ivory-700 backdrop-blur-xl transition-all duration-500"
                        style={{ boxShadow: `0 0 40px ${service.color}40` }}
                      >
                        <Icon size={56} color={service.color} />
                      </div>

                      <h3 className="font-display text-3xl font-normal text-ivory-800 dark:text-ivory-100 mb-4 tracking-tight">
                        {service.title}
                      </h3>

                      <p className="text-ivory-500 dark:text-ivory-400 text-lg leading-relaxed max-w-lg">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
