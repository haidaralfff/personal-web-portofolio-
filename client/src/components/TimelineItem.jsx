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
    <div className={`timeline-item relative flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
      {/* DOT */}
      <span className="absolute left-3 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/20 animate-pulse" />

      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`ml-8 md:ml-0 w-full md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}
      >
        <div className="bg-white/60 border border-ivory-200 rounded-xl p-6 backdrop-blur-sm hover:border-blue-200 hover:-translate-y-1 transition-all duration-300">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-3">

            {/* ICON */}
            <div className="text-blue-400 text-xl">{icon}</div>

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
              <h3 className="font-display text-lg font-normal leading-none text-ivory-800">
                {title}
              </h3>
              <p className="font-mono text-xs text-ivory-400 mt-1">{subtitle}</p>
            </div>

            {/* CURRENT BADGE */}
            {current && (
              <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                Current
              </span>
            )}
          </div>

          {/* DESC */}
          <p className="text-sm text-ivory-500 mb-4 leading-relaxed">{description}</p>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="font-mono text-xs px-2 py-1 rounded-md bg-ivory-100 text-ivory-600 border border-ivory-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}