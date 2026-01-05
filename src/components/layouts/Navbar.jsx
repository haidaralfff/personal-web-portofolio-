import { Home, User, Folder, Briefcase, Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg transition text-zinc-300 hover:bg-zinc-800 hover:text-white";

  const handleClick = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className="text-2xl font-bold text-white hover:text-blue-500 transition"
        >
          Haidar<span className="text-blue-500">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2">
          <a href="#home" className={linkClass}>
            <Home size={18} />
            Home
          </a>

          <a href="#about" className={linkClass}>
            <User size={18} />
            About
          </a>

          <a href="#experience" className={linkClass}>
            <Briefcase size={18} />
            Experience
          </a>

          <a href="#projects" className={linkClass}>
            <Folder size={18} />
            Projects
          </a>
          <a href="#contact" className={linkClass}>
            <Phone size={18} />
            Contact
          </a>

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-2 bg-zinc-950 border-t border-zinc-800">
          <a onClick={handleClick} href="#home" className={linkClass}>
            <Home size={18} />
            Home
          </a>

          <a onClick={handleClick} href="#about" className={linkClass}>
            <User size={18} />
            About
          </a>

          <a onClick={handleClick} href="#experience" className={linkClass}>
            <Briefcase size={18} />
            Experience
          </a>

          <a onClick={handleClick} href="#projects" className={linkClass}>
            <Folder size={18} />
            Projects
          </a>

          <a onClick={handleClick} href="#contact" className={linkClass}>
            <Folder size={18} />
            Contact
          </a>

        </div>
      )}
    </nav>
  );
}
