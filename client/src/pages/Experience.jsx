import { useState, useRef, useEffect } from "react";
import TimelineItem from "../components/TimelineItem";
import { GraduationCap, Code, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef(null);
  const [progressText, setProgressText] = useState("0%");

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

      // 2. Scroll Progress Line & Text
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
              setProgressText(Math.round(self.progress * 100) + "%");
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
      id="experience"
      ref={containerRef}
      className="min-h-screen text-white pt-24 px-6 relative"
    >
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="exp-title text-4xl font-bold mb-10">
          Experience<span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">.</span>
        </h1>

        {/* SCROLL PROGRESS */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 text-xs text-zinc-400">
          <span>Scroll</span>
          <span className="text-blue-500 font-medium">
            {progressText}
          </span>
        </div>

        <div className="relative">

          {/* TIMELINE LINE */}
          <div className="absolute left-3 md:left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-zinc-800 overflow-hidden">
            <div
              className="timeline-line-progress w-full h-full bg-blue-500 origin-top shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </div>

          <div className="space-y-16">

            {/* SMK */}
            <TimelineItem
              align="left"
              icon={<Wrench />}
              title="SMK Maarif 9 Kebumen"
              subtitle="Teknik Kendaraan Ringan • 2021 – 2024"
              description="Mempelajari sistem kendaraan, mekanika, kelistrikan otomotif, serta troubleshooting mesin."
              skills={["Mechanical", "Engine", "Diagnostics"]}
            />

            {/* KULIAH */}
            <TimelineItem
              align="right"
              icon={<GraduationCap />}
              title="Mahasiswa Ilmu Komputer"
              subtitle="Universitas Putra Bangsa • Semester 4"
              description="Mempelajari pengembangan web, struktur data, database, serta membangun aplikasi modern."
              skills={["Pemrograman Web", "Database", "UI/UX"]}
              current
            />

            {/* FREELANCE */}
            <TimelineItem
              align="left"
              icon={<Code />}
              title="Web Developer"
              subtitle="2024 - Present"
              description="Membangun website modern dan Implementasi Sistem"
              skills={["Fullstack Developer", "React", "Tailwind"]}
            />

          </div>
        </div>
      </div>
    </section>
  );
}