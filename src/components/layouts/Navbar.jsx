import { NavLink } from "react-router-dom";
import { Home, User , Folder } from "lucide-react";


export default function Navbar() {
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
        <div className="text-2xl font-bold text-white">
          Darz<span className="text-blue-500">.</span>
        </div>

        {/* Links */}
        <div className="flex gap-4">
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
        </div>
      </div>
    </nav>
  );
}
