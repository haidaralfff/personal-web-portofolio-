import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Card from "../components/Card";

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-10"
        >
          Experience<span className="text-blue-500">.</span>
        </motion.h1>

        {/* Mobile hint */}
        <p className="md:hidden mb-12 text-xs text-zinc-400 text-center">
          Scroll down to explore experience
        </p>

        {/* Desktop progress */}
        <motion.div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 text-xs text-zinc-400">
          <span>Scroll</span>
          <motion.span className="text-blue-500 font-medium">
            {progressText}
          </motion.span>
        </motion.div>

        <div className="relative">

          {/* Timeline line */}
          <div className="absolute left-3 md:left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-zinc-800 overflow-hidden">
            <motion.div
              style={{ height }}
              className="w-full bg-blue-500 origin-top"
            />
          </div>

          <div className="space-y-16">

            {/* ITEM 1 */}
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative flex md:justify-start"
            >
              <span
                className="
                  absolute left-3 md:left-1/2 top-6 -translate-x-1/2
                  w-4 h-4
                  bg-blue-500 rounded-full
                  ring-4 ring-blue-500/20
                  animate-pulse
                "
              />

              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="ml-8 md:ml-0 w-full md:w-1/2 md:pr-12"
              >
                <Card
                  title="Frontend Developer"
                  subtitle="Personal Project • 2024 - Sekarang"
                >
                  Membangun website portfolio, dashboard, dan landing page
                  menggunakan React, Tailwind CSS, Framer Motion, dan React Router.
                </Card>
              </motion.div>
            </motion.div>

            {/* ITEM 2 */}
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative flex md:justify-end"
            >
              <span
                className="
                  absolute left-3 md:left-1/2 top-6 -translate-x-1/2
                  w-4 h-4
                  bg-blue-500 rounded-full
                  ring-4 ring-blue-500/20
                  animate-pulse
                "
              />

              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="ml-8 md:ml-0 w-full md:w-1/2 md:pl-12"
              >
                <Card
                  title="Mahasiswa Informatika"
                  subtitle="Universitas Putra Bangsa • Semester 3"
                >
                  Fokus mempelajari frontend development, UI/UX, struktur data,
                  basis data, dan pengembangan aplikasi web modern.
                </Card>
              </motion.div>
            </motion.div>

            {/* ITEM 3 */}
            <motion.div
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative flex md:justify-start"
            >
              <span
                className="
                  absolute left-3 md:left-1/2 top-6 -translate-x-1/2
                  w-4 h-4
                  bg-blue-500 rounded-full
                  ring-4 ring-blue-500/20
                  animate-pulse
                "
              />

              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="ml-8 md:ml-0 w-full md:w-1/2 md:pr-12"
              >
                <Card
                  title="Freelance Web Developer"
                  subtitle="Self Project • 2023"
                >
                  Membuat website sederhana dan landing page untuk kebutuhan
                  personal dan UMKM.
                </Card>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
