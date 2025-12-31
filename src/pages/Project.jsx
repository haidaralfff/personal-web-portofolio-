import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";

export default function Project() {
  return (
    <section className="min-h-screen bg-zinc-950 text-white pt-24 px-6 flex items-center">
      <div className="mx-auto max-w-4xl text-center">

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10"
        >
          <FolderOpen className="text-blue-500" size={36} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold"
        >
          Projects<span className="text-blue-500">.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-4 text-zinc-400 text-lg"
        >
          Projek Masi Dalam Pencarian
        </motion.p>

        {/* Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6"
        >
          <p className="text-zinc-300 leading-relaxed">
            I’m currently working on several frontend projects to sharpen my
            skills in <span className="text-white font-medium">React</span>,
            <span className="text-white font-medium"> Tailwind CSS</span>, and
            <span className="text-white font-medium"> Javascript</span>.
            <br />
            <br />
            This page will be updated soon with real projects and case studies.
          </p>

          {/* Animated text */}
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-4 text-sm text-blue-400"
          >
            🚧 Coming Soon
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
