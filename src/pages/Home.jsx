import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      
      <section className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          className="max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.15,
              },
            },
          }}
        >

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Hi, I'm <span className="text-blue-500">Darz</span> 👋
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-4 text-xl md:text-2xl text-zinc-300 font-medium"
          >
            Junior Frontend Developer
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed"
          >
            I build clean & modern web experiences using React and Tailwind CSS.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 transition"
            >
              View Projects
              <ArrowRight size={18} />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-zinc-300 hover:bg-zinc-800 transition"
            >
              Contact Me
              <Mail size={18} />
            </motion.a>
          </motion.div>

        </motion.div>
      </section>
    </main>
  );
}
