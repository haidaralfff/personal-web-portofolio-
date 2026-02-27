import { Home, User, Folder, Briefcase, Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authService, storageService } from "../../services/api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const linkClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg transition text-zinc-300 hover:bg-zinc-800 hover:text-white";

  const handleClick = () => setOpen(false);

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if user already logged in on component mount
  useEffect(() => {
    const user = storageService.getUser();
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await authService.login(loginForm.username, loginForm.password);
      
      // Simpan user data ke localStorage
      storageService.setUser({
        id: response.user_id,
        username: response.username,
      });

      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ username: "", password: "" });
    } catch (error) {
      setLoginError(error.message || "Login gagal");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    storageService.clearUser();
    setIsLoggedIn(false);
    setLoginForm({ username: "", password: "" });
    setLoginError("");
  };

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

        {/* Login Form */}
        <div className="hidden md:flex items-center gap-2">
          {!isLoggedIn ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-300">Logged in</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition"
              >
                Logout
              </button>
              <Link to="/dashboard" className="px-3 py-1 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition">
                Dashboard
              </Link>
            </div>
          )}
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
            <Phone size={18} />
            Contact
          </a>

          {!isLoggedIn ? (
            <button
              onClick={() => {
                setShowLoginModal(true);
                setOpen(false);
              }}
              className="w-full px-3 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/dashboard" className="px-3 py-2 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition text-center">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md min-h-screen">
          <div className="bg-zinc-900 rounded-xl border border-zinc-700 shadow-2xl p-8 w-full max-w-sm mx-4">
            <h2 className="text-2xl font-bold text-white mb-6">Login Dashboard</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Masukkan username"
                  value={loginForm.username}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-600 placeholder-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition"
                  required
                />
              </div>
              {loginError && (
                <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <span className="text-red-400 text-sm font-medium">{loginError}</span>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition transform hover:scale-105 disabled:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
<button
  type="button"
  onClick={() => {
    setShowLoginModal(false);
    setLoginForm({ username: "", password: "" });
    setLoginError("");
  }}
  className="
    w-full sm:flex-1
    px-4 sm:px-6
    py-3 sm:py-2.5
    text-sm sm:text-base
    rounded-xl
    bg-zinc-700
    text-white
    font-semibold
    transition-all duration-200
    active:scale-95
    sm:hover:bg-zinc-600
    focus:outline-none
    focus:ring-2 focus:ring-zinc-500
  "
>
  Cancel
</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
