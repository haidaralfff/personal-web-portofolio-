/**
 * Dashboard Statistics Cards
 * Menampilkan overview stats dari projects
 */

import { FileText, CheckCircle, Clock, Zap } from "lucide-react";

export default function DashboardStats({ stats }) {
  const statCards = [
    {
      label: "Total Projects",
      value: stats?.total_projects || 0,
      icon: FileText,
      color: "bg-blue-500/10 text-blue-400",
      border: "border-blue-500/30"
    },
    {
      label: "Active",
      value: stats?.active_projects || 0,
      icon: Zap,
      color: "bg-green-500/10 text-green-400",
      border: "border-green-500/30"
    },
    {
      label: "In Progress",
      value: stats?.in_progress_projects || 0,
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-400",
      border: "border-yellow-500/30"
    },
    {
      label: "Completed",
      value: stats?.completed_projects || 0,
      icon: CheckCircle,
      color: "bg-purple-500/10 text-purple-400",
      border: "border-purple-500/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`bg-zinc-900 border ${card.border} rounded-lg p-6 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm mb-2">{card.label}</p>
                <p className="text-3xl font-bold text-white">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
