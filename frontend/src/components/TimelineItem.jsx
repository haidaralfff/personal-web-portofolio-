import { motion } from "framer-motion";

export default function TimelineItem({
  align = "left",
  title,
  subtitle,
  description,
  icon,
  logo,
  skills = [],
  current = false
}) {
  const isLeft = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}
    >
      {/* DOT */}
      <span className="absolute left-3 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/20 animate-pulse" />

      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`ml-8 md:ml-0 w-full md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:bg-white/10 transition-all duration-300">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-3">

            {/* ICON */}
            <div className="text-blue-400 text-xl drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">{icon}</div>

            {/* LOGO */}
            {logo && (
              <img
                src={logo}
                className="w-8 h-8 object-contain"
                alt="logo"
              />
            )}

            {/* TITLE */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-none text-white">
                {title}
              </h3>
              <p className="text-xs text-zinc-300 mt-1">{subtitle}</p>
            </div>

            {/* CURRENT BADGE */}
            {current && (
              <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                Current
              </span>
            )}
          </div>

          {/* DESC */}
          <p className="text-sm text-zinc-300 mb-4 leading-relaxed">{description}</p>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-md bg-white/10 text-white border border-white/10 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}