import { LayoutDashboard, Folder, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("projects");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, onClick: () => navigate("/dashboard") },
    { id: "projects", label: "Projects", icon: Folder, onClick: () => setActiveMenu("projects") },
    { id: "settings", label: "Settings", icon: Settings, onClick: () => setActiveMenu("settings") },
  ];

  const handleLogout = () => {
    // Nanti di-integrate dengan API backend
    console.log("Logout clicked");
    navigate("/");
  };

  return (
    <aside className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
      <h2 className="text-xl font-bold text-white mb-8">Dashboard</h2>

      <nav className="space-y-3 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
              activeMenu === item.id
                ? "bg-blue-600 text-white"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-zinc-300 hover:bg-red-600/10 hover:text-red-400 transition border border-zinc-700"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}