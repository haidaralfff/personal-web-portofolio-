import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Profile from "../assets/profile.jpeg";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <section className="flex min-h-screen items-center px-6">
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* LEFT - TEXT */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="text-blue-500">Darz</span> 👋
            </h1>

            <p className="mt-4 text-xl md:text-2xl text-zinc-300 font-medium">
              Junior Frontend Developer
            </p>

            <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed">
              I build clean & modern web experiences using React and Tailwind CSS.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
            </div>
          </motion.div>

          {/* RIGHT - PROFILE IMAGE */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />
              <img
                src={Profile}
                alt="Darz Profile"
                className="relative z-10 h-64 w-64 md:h-80 md:w-80 rounded-full object-cover border-4 border-zinc-800"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
