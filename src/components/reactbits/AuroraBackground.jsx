export default function AuroraBackground({ children }) {
  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-80">
          <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-blue-300/40 rounded-full blur-[80px]" />
          <div className="absolute top-[40%] right-[20%] w-[35vw] h-[35vw] bg-purple-300/40 rounded-full blur-[90px]" />
          <div className="absolute bottom-[10%] left-[40%] w-[30vw] h-[30vw] bg-pink-300/35 rounded-full blur-[80px]" />
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
