import { NavLink } from "react-router-dom";
import { Home, User, Folder, Briefcase, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
     }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold text-white transition hover:text-blue-600">
          Haidar<span className="text-blue-500">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <NavLink to="/" className={linkClass}>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            <User size={18} />
            About
          </NavLink>

          <NavLink to="/project" className={linkClass}>
            <Folder size={18} />
            Project
          </NavLink>

          <NavLink to="/experience" className={linkClass}>
            <Briefcase size={18} />
            Experience
          </NavLink>
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
          <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>
            <Home size={18} />
            Home
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/about" className={linkClass}>
            <User size={18} />
            About
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/project" className={linkClass}>
            <Folder size={18} />
            Project
          </NavLink>

          <NavLink
            onClick={() => setOpen(false)}
            to="/experience"
            className={linkClass}
          >
            <Briefcase size={18} />
            Experience
          </NavLink>
        </div>
      )}
    </nav>
  );
}
