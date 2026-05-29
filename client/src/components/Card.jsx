export default function Card({ title, subtitle, children }) {
  return (
    <div
      className="
        w-full
        sm:max-w-lg
        md:max-w-xl
        rounded-xl
        border border-zinc-800
        bg-zinc-900/60
        p-4 sm:p-5
        transition
        hover:border-blue-500/40
      "
    >
      <h3 className="text-base sm:text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-xs sm:text-sm text-zinc-400">
        {subtitle}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-zinc-300">
        {children}
      </p>
    </div>
  );
}
