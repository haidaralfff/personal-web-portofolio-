import { useRef, useEffect } from "react";
import TimelineItem from "../components/TimelineItem";
import { GraduationCap, Code, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Title
      gsap.from(".exp-title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // 2. Scroll Progress Line & Text (direct DOM update, no React state)
      gsap.fromTo(".timeline-line-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.textContent = Math.round(self.progress * 100) + "%";
              }
            }
          }
        }
      );

      // 3. Staggered Items Entrance
      gsap.utils.toArray(".timeline-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.2)"
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-ivory-50 dark:bg-ivory-900 pt-24 px-6 relative transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <div className="mb-10">
          <p className="font-mono text-xs tracking-mega uppercase text-blue-400 mb-4">
            Journey
          </p>
          <h1 className="exp-title font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 dark:text-ivory-100 leading-[0.95] tracking-tight">
            Experience<span className="text-blue-500">.</span>
          </h1>
        </div>

        {/* SCROLL PROGRESS */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 text-xs text-ivory-300 dark:text-ivory-600">
          <span>Scroll</span>
          <span ref={progressRef} className="text-blue-500 font-medium">
            0%
          </span>
        </div>

        <div className="relative">

          {/* TIMELINE LINE */}
          <div className="absolute left-3 md:left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-ivory-200 dark:bg-ivory-700 overflow-hidden">
            <div
              className="timeline-line-progress w-full h-full bg-blue-500 origin-top"
            />
          </div>

          <div className="space-y-16">

            {/* SMK */}
            <TimelineItem
              align="left"
              icon={<Wrench />}
              title="SMK Maarif 9 Kebumen"
              subtitle="Light Vehicle Engineering • 2021 – 2024"
              description="Studied vehicle systems, mechanics, automotive electronics, and engine diagnostics."
              skills={["Mechanical", "Engine", "Diagnostics"]}
            />

            {/* KULIAH */}
            <TimelineItem
              align="right"
              icon={<GraduationCap />}
              title="Computer Science Student"
              subtitle="Universitas Putra Bangsa • Semester 4"
              description="Studying web development, data structures, databases, and building modern applications."
              skills={["Web Development", "Database", "UI/UX"]}
              current
            />

            {/* FREELANCE */}
            <TimelineItem
              align="left"
              icon={<Code />}
              title="Web Developer"
              subtitle="2024 - Present"
              description="Building modern websites and implementing systems."
              skills={["Fullstack Developer", "React", "Tailwind"]}
            />

          </div>
        </div>
      </div>
    </section>
  );
}
