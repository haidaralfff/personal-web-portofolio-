import { LayoutDashboard, Folder, Settings, LogOut, BarChart3, Mail, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      path: "/dashboard",
      onClick: () => navigate("/dashboard")
    },
    {
      id: "projects",
      label: "Projects",
      icon: Folder,
      path: "/dashboard/projects",
      onClick: () => navigate("/dashboard/projects")
    },
    {
      id: "messages",
      label: "Inbox Messages",
      icon: Mail,
      path: "/dashboard/messages",
      onClick: () => navigate("/dashboard/messages")
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      onClick: () => navigate("/dashboard/settings")
    }
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <LayoutDashboard size={28} className="text-blue-500 animate-pulse" />
        <h2 className="text-xl font-bold text-white tracking-wide">DailyPorto</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const isCurrentActive = isActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition duration-200 ${
                isCurrentActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t border-zinc-800 my-6" />

      {/* User Info Section */}
      <div className="mb-6 p-3 rounded-lg bg-zinc-850/50 border border-zinc-800 flex items-center gap-3">
        <div className="bg-blue-500/10 text-blue-400 p-2 rounded-full flex-shrink-0">
          <User size={16} />
        </div>
        <div className="overflow-hidden">
          <p className="text-xs text-zinc-400">Authenticated Admin</p>
          <p className="text-sm font-semibold text-white truncate">
            {user?.username || "admin_user"}
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-zinc-300 hover:bg-red-600/10 hover:text-red-400 transition duration-200 border border-zinc-800 hover:border-red-600/30"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}