import { motion } from "framer-motion";

export default function AuroraBackground({ children }) {
  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-80">
          <motion.div
            animate={{
              transform: [
                "translate(0%, 0%) scale(1)",
                "translate(20%, -10%) scale(1.1)",
                "translate(-20%, 10%) scale(0.9)",
                "translate(0%, 0%) scale(1)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "linear",
            }}
            className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] mix-blend-multiply bg-blue-300/60 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              transform: [
                "translate(0%, 0%) scale(1)",
                "translate(-20%, 20%) scale(1.2)",
                "translate(20%, -20%) scale(0.8)",
                "translate(0%, 0%) scale(1)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
            className="absolute top-[40%] right-[20%] w-[35vw] h-[35vw] mix-blend-multiply bg-purple-300/60 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              transform: [
                "translate(0%, 0%) scale(1)",
                "translate(10%, 20%) scale(1.1)",
                "translate(-10%, -20%) scale(0.9)",
                "translate(0%, 0%) scale(1)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="absolute bottom-[10%] left-[40%] w-[30vw] h-[30vw] mix-blend-multiply bg-pink-300/50 rounded-full blur-[100px]"
          />
        </div>
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        ></div>
      </div>
      <div className="relative z-10">{children}</div>
    </main>
  );
}
