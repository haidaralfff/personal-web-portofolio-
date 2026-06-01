import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Techstack from "../components/Techstack";

// Komponen untuk efek perubahan font Tipis ke Tebal saat di-scroll
const ScrollRevealParagraph = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 50%"], 
  });

  const textShadow = useTransform(scrollYProgress, [0, 1], ["0px 0px 0px rgba(212, 212, 216, 0)", "0px 0px 1.5px rgba(212, 212, 216, 1)"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, textShadow }}
      className="leading-relaxed text-lg sm:text-xl text-zinc-300 font-light"
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <main id="about" className="min-h-screen text-white px-6 py-28 relative overflow-hidden flex flex-col justify-center">
      <motion.div 
        className="mx-auto max-w-4xl w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Me</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-transparent mt-4 rounded-full" />
        </motion.div>

        {/* Elegant Typography Section with Font Weight Reveal */}
        <motion.div
          variants={itemVariants}
          className="relative pl-6 md:pl-8 border-l-2 border-white/10"
        >
          {/* Subtle glowing line overlaid on the border */}
          <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-blue-500/30 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

          <div className="space-y-10">
            <ScrollRevealParagraph>
              I am a fourth-semester Computer Science student with a strong passion for software development and digital creativity. I focus on building modern web applications using React.js and Tailwind CSS, emphasizing clean, maintainable code and user-friendly design.
            </ScrollRevealParagraph>
            
            <ScrollRevealParagraph>
              I am deeply interested in understanding system logic, software architecture, and how technology works behind the scenes to create efficient and scalable solutions. Outside of programming, I also enjoy video editing and digital content creation, where I combine creativity and technical skills to produce engaging visual stories.
            </ScrollRevealParagraph>
            
            <ScrollRevealParagraph>
              I am continuously learning, building real-world projects, and seeking opportunities to grow as a Web Developer who can bridge logic and creativity to create impactful digital solutions.
            </ScrollRevealParagraph>
          </div>
        </motion.div>
        
        {/* Techstack */}
        <motion.div variants={itemVariants} className="mt-20">
          <Techstack />
        </motion.div>
      </motion.div>
    </main>
  );
}