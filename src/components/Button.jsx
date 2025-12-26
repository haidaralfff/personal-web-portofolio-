export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500/40";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700",
    outline:
      "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white",
    ghost:
      "text-zinc-300 hover:bg-zinc-800 hover:text-white",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
