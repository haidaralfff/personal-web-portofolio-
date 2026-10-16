import { useRef, useEffect } from "react";
import TimelineItem from "../components/TimelineItem";
import { GraduationCap, Code, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperiences } from "../hooks/useExperiences";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  education: <GraduationCap />,
  work: <Code />,
};

export default function Experience() {
  const containerRef = useRef(null);
  const { experiences, loading } = useExperiences();

  useEffect(() => {
    if (loading) return;

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
            scrub: true
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
  }, [loading, experiences]);

  if (loading) {
    return (
      <section className="bg-ivory-50 pt-20 px-6 relative transition-colors duration-500">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-ivory-200 rounded w-20"></div>
            <div className="h-12 bg-ivory-200 rounded w-64"></div>
            <div className="space-y-8 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-ivory-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="bg-ivory-50 pt-20 px-6 relative transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <div className="mb-10">
          <p className="font-mono text-xs tracking-mega uppercase text-blue-400 mb-4">
            Journey
          </p>
          <h1 className="exp-title font-display text-5xl sm:text-6xl md:text-7xl font-normal text-ivory-800 leading-[0.95] tracking-tight">
            Experience<span className="text-blue-500">.</span>
          </h1>
        </div>

        <div className="relative">

          {/* TIMELINE LINE */}
          <div className="absolute left-3 md:left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-ivory-200 overflow-hidden">
            <div
              className="timeline-line-progress w-full h-full bg-blue-500 origin-top"
            />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                align={index % 2 === 0 ? "left" : "right"}
                icon={iconMap[exp.type] || <Wrench />}
                title={exp.title}
                subtitle={`${exp.organization || ''} ${exp.organization && exp.period ? '•' : ''} ${exp.period || ''}`}
                description={exp.description}
                skills={exp.skills || []}
                current={exp.is_current}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
