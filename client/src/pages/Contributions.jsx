import React, { useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Contributions() {
  const containerRef = useRef(null);
  const calendarRef = useRef(null);

  // Theme github modern dark mode - CYBER BLUE THEME
  const explicitTheme = {
    light: ["#ebf8ff", "#bee3f8", "#90cdf4", "#4299e1", "#2b6cb0"],
    dark: ["#161b22", "#0c2e4e", "#0a4b85", "#1d70b8", "#3b82f6"], // Blue shades
  };

  useEffect(() => {
    // gsap.context helps with cleanup in React
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate text elements
      tl.from(".contrib-text", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      })
      // Animate calendar container with a slight bounce
      .from(calendarRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.2)"
      }, "-=0.4");
      
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="contributions"
      className="min-h-screen py-20 px-4 sm:px-6 flex flex-col items-center justify-center relative z-10 text-white"
    >
      <div className="w-full max-w-5xl">
        <h2 className="contrib-text text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Contributions<span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">.</span>
        </h2>
        
        <p className="contrib-text text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          A visual timeline of my coding journey, daily commits, and open-source activities on GitHub.
        </p>

        <div 
          ref={calendarRef}
          className="w-full bg-[#0d1117] border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-x-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />
          
          <div className="min-w-[800px] flex justify-center relative z-10">
            <GitHubCalendar
              username="haidaralfff"
              colorScheme="dark"
              theme={explicitTheme}
              blockSize={14}
              blockMargin={5}
              fontSize={14}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
