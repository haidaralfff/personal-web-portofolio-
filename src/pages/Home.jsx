import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Profile from "../assets/profile.jpeg";
import { Link } from "react-router-dom";
import Techstack from "../components/Techstack";


export default function Home() {
  return (
  <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <section className="flex min-h-[100svh] items-center px-4 sm:px-6">
        <motion.div
          className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >

          {/* PROFILE IMAGE — MOBILE TOP */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="order-1 md:order-2 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />
              <img
                src={Profile}
                alt="Darz Profile"
                className="
                  relative z-10
                  h-48 w-48
                  sm:h-56 sm:w-56
                  md:h-72 md:w-72
                  rounded-full
                  object-cover
                  border-4 border-zinc-800
                "
              />
            </motion.div>
          </motion.div>

          {/* TEXT — MOBILE BOTTOM */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="order-2 md:order-1 text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="text-blue-500">Haidar</span> 👋
            </h1>

            <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-zinc-300 font-medium">
              Junior Frontend Developer
            </p>

            <p className="mt-4 sm:mt-6 max-w-xl mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed">
              Informatics Student at Universitas Putra Bangsa
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
             <motion.div
             whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
                >
            <Link
            to="#project"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm sm:text-base font-semibold hover:bg-blue-500 transition"
            >
            View Projects
            <ArrowRight size={18} />
             </Link>
            </motion.div>


              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-6 py-3 text-sm sm:text-base font-semibold text-zinc-300 hover:bg-zinc-800 transition"
              >
                Contact Me
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}