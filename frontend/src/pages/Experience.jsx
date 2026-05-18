import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TimelineItem from "../components/TimelineItem";
import { GraduationCap, Code, Wrench } from "lucide-react";

export default function Experience() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressText = useTransform(
    scrollYProgress,
    v => `${Math.round(v * 100)}%`
  );

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen bg-zinc-950 text-white pt-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-10"
        >
          Experience<span className="text-blue-500">.</span>
        </motion.h1>

        {/* SCROLL PROGRESS */}
        <motion.div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 text-xs text-zinc-400">
          <span>Scroll</span>
          <motion.span className="text-blue-500 font-medium">
            {progressText}
          </motion.span>
        </motion.div>

        <div className="relative">

          {/* TIMELINE LINE */}
          <div className="absolute left-3 md:left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-zinc-800 overflow-hidden">
            <motion.div
              style={{ height }}
              className="w-full bg-blue-500 origin-top"
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
              skills={["Mechanical", "Engine","Diagnostics"]}
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
              subtitle="2028"
              description="Membangun website modern dan Implementasi Sistem"
              skills={["FullstackDeveloper"]}
            />

          </div>
        </div>
      </div>
    </section>
  );
}