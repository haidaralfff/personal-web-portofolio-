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
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-blue-500/10 transition">

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
              <h3 className="font-semibold text-lg leading-none">
                {title}
              </h3>
              <p className="text-xs text-zinc-400">{subtitle}</p>
            </div>

            {/* CURRENT BADGE */}
            {current && (
              <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Current
              </span>
            )}
          </div>

          {/* DESC */}
          <p className="text-sm text-zinc-300 mb-4">{description}</p>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
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