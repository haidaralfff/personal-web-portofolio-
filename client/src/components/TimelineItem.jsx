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

      <div
        className={`ml-8 md:ml-0 w-full md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}
      >
        <div className="bg-white/60 dark:bg-ivory-800/60 border border-ivory-200 dark:border-ivory-700 rounded-xl p-6 backdrop-blur-sm hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 transition-all duration-300">

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
              <h3 className="font-display text-lg font-normal leading-none text-ivory-800 dark:text-ivory-100 transition-colors duration-500">
                {title}
              </h3>
              <p className="font-mono text-xs text-ivory-400 dark:text-ivory-500 mt-1 transition-colors duration-500">{subtitle}</p>
            </div>

            {/* CURRENT BADGE */}
            {current && (
              <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors duration-500">
                Current
              </span>
            )}
          </div>

          {/* DESC */}
          <p className="text-sm text-ivory-500 dark:text-ivory-400 mb-4 leading-relaxed transition-colors duration-500">{description}</p>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="font-mono text-xs px-2 py-1 rounded-md bg-ivory-100 dark:bg-ivory-700/50 text-ivory-600 dark:text-ivory-300 border border-ivory-200 dark:border-ivory-600 transition-colors duration-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
