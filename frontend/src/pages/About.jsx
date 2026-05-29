// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Techstack from "../components/Techstack";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <main className="min-h-screen text-white px-6 py-28 relative overflow-hidden">
      <motion.div
        className="mx-auto max-w-3xl relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        {/* Title */}
        <motion.h1
          variants={item}
          className="text-3xl md:text-5xl font-bold mb-16"
        >
          About <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">Me</span>
        </motion.h1>

        {/* Interactive Paragraph */}
        <motion.div
          variants={item}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="group relative bg-white/5 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-300"
        >
          {/* Animated accent line */}
          <div className="w-12 h-1 bg-blue-500 mb-8 transition-all duration-500 group-hover:w-24 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

              <p className="text-zinc-300 leading-relaxed text-lg transition duration-300 group-hover:text-white">
              Saya adalah mahasiswa Ilmu Komputer semester empat yang memiliki 
              passion kuat dalam pengembangan perangkat lunak dan kreativitas digital. Saya 
            fokus membangun aplikasi web modern menggunakan{" "}
            <span className="text-white font-medium">React.js</span> dan{" "}
            <span className="text-white font-medium">Tailwind CSS</span>, dengan menekankan 
            pada kode yang bersih, mudah dipelihara, serta desain yang ramah pengguna. 
            Saya sangat tertarik untuk memahami logika sistem, arsitektur perangkat lunak, 
            dan bagaimana teknologi bekerja di balik layar demi menciptakan solusi yang 
            efisien dan terukur. Di luar pemrograman, saya juga menikmati penyuntingan 
            video dan pembuatan konten digital, di mana saya menggabungkan kreativitas dan 
            keterampilan teknis untuk menghasilkan cerita visual yang menarik. Saya terus 
            belajar, membangun proyek nyata, dan mencari peluang untuk berkembang sebagai 
            seorang{" "}
            <span className="text-white font-medium">Web Developer</span> yang mampu 
            menjembatani logika dan kreativitas untuk menciptakan solusi digital yang berdampak.
          </p>
        </motion.div>

        {/* Techstack */}
        <motion.div variants={item} className="mt-24">
          <Techstack />
        </motion.div>
      </motion.div>
    </main>
  );
}