import { Mail, ChevronDown, GraduationCap } from "lucide-react";
import {motion } from "framer-motion";
// import Profile from "../assets/profile.jpeg";
import { Link } from "react-router-dom";
import TextPressure from "../components/reactbits/TextPressure.jsx";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden text-white">

        {/* 🔵 CONTENT */}
        <section className="relative z-10 flex min-h-[100svh] items-center px-4 sm:px-6">
          <motion.div
            className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >

            {/* PROFILE IMAGE */}
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
                className="relative p-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl" />
                {/* Placeholder untuk profile image - tambahkan file ke src/assets/profile.jpeg */}
                <div className="relative z-10 h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72 rounded-full object-cover border-2 border-white/20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-white/40">Your Photo</span>
                </div>
              </motion.div>
            </motion.div>

            {/* TEXT */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="order-2 md:order-1 text-center md:text-left px-4 md:px-0"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight flex items-center justify-center md:justify-start gap-2 flex-wrap mb-4">
                Hi, I'm
                <div className="relative h-12 sm:h-16 md:h-20 w-56 sm:w-72 md:w-96">
                  <TextPressure text="Haidar" flex={false} stroke={false} textColor="#60a5fa" />
                </div>
                👋
              </h1>

              <div className="mt-2 sm:mt-3 relative h-8 sm:h-10 md:h-12 w-full max-w-sm mx-auto md:mx-0">
                <TextPressure text="Frontend Developer." flex={true} stroke={false} textColor="#e4e4e7" minFontSize={24} />
              </div>

              {/* 🔥 UPDATED SECTION */}
              <p className="mt-4 sm:mt-6 max-w-xl mx-auto md:mx-0 
                          text-sm sm:text-base md:text-lg 
                          text-zinc-300 leading-relaxed 
                          flex items-center justify-center md:justify-start gap-2">

                <GraduationCap size={18} className="text-blue-400" />

                <span>
                  Informatics Student at{" "}
                  <span className="text-white font-medium">
                    Universitas Putra Bangsa
                  </span>
                </span>
              </p>

              {/* 🔴 BUTTONS */}
              <div className="relative z-20 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="mailto:haidarhabibi178@gmail.com"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600/80 backdrop-blur-md border border-blue-500/50 px-6 py-3 text-sm sm:text-base font-semibold hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 text-white"
                  >
                    Hire Me
                    <Mail size={18} />
                  </Link>
                </motion.div>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-sm sm:text-base font-semibold text-zinc-200 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
                >
                  Contact Me
                  <Mail size={18} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ⬇️ SCROLL DOWN */}
        <motion.div
          className="pointer-events-none absolute bottom-6 inset-x-0 z-20 flex flex-col items-center justify-center text-zinc-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="mb-1 text-xs sm:text-sm tracking-wide text-center">
            Scroll Down
          </span>
          <ChevronDown size={24} className="text-white/50" />
        </motion.div>

      </main>
    </>
  );
}