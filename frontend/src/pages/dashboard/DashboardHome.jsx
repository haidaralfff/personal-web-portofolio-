/**
 * Dashboard Home Page
 * Overview dengan statistik proyek dan analitik pengunjung real-time
 */

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import DashboardStats from "../../components/dashboard/DashboardStats";
import {
  StatusDistributionChart,
  ProjectStatusChart,
  ProjectsGrowthChart
} from "../../components/dashboard/DashboardCharts";
import { analyticsService } from "../../services/api";
import { BarChart3, TrendingUp, Eye, Users, Calendar, ArrowUpRight, FolderHeart } from "lucide-react";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      // 1. Fetch Project Stats
      const token = localStorage.getItem("dashboardToken");
      const projHeaders = {};
      if (token) projHeaders["Authorization"] = `Bearer ${token}`;

      const projResponse = await fetch("http://localhost:3001/api/projects/stats", {
        headers: projHeaders
      });
      if (!projResponse.ok) throw new Error("Failed to fetch project stats");
      const projData = await projResponse.json();
      setStats(projData.data);

      // 2. Fetch Analytics Stats
      const analyticsData = await analyticsService.getStats();
      setAnalytics(analyticsData);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
      console.error(err);
      
      // Fallback untuk development jika database kosong
      setStats({
        total_projects: 0,
        active_projects: 0,
        draft_projects: 0,
        in_progress_projects: 0,
        completed_projects: 0
      });
      setAnalytics({
        totalViews: 0,
        uniqueVisitors: 0,
        viewsToday: 0,
        viewsYesterday: 0,
        popularPages: [],
        dailyTrends: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-auto">
        
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={32} className="text-blue-500 animate-pulse" />
              <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            </div>
            <p className="text-zinc-400">Welcome back! Here's your portfolio analytics & project status.</p>
          </div>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg text-sm transition"
          >
            Refresh Data
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-zinc-400 text-sm">Loading dashboard statistics...</p>
            </div>
          </div>
        ) : (
          <>
            {/* VISITOR TELEMETRY SECTION */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye size={20} className="text-blue-400" />
                <h2 className="text-xl font-bold">Visitor Analytics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Views */}
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm mb-1">Total Page Views</p>
                      <p className="text-3xl font-extrabold text-white">{analytics?.totalViews || 0}</p>
                    </div>
                    <div className="bg-blue-500/10 text-blue-400 p-3 rounded-lg">
                      <Eye size={24} />
                    </div>
                  </div>
                </div>

                {/* Unique Visitors */}
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm mb-1">Unique Visitors</p>
                      <p className="text-3xl font-extrabold text-white">{analytics?.uniqueVisitors || 0}</p>
                    </div>
                    <div className="bg-green-500/10 text-green-400 p-3 rounded-lg">
                      <Users size={24} />
                    </div>
                  </div>
                </div>

                {/* Views Today */}
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm mb-1">Views Today</p>
                      <p className="text-3xl font-extrabold text-white">{analytics?.viewsToday || 0}</p>
                    </div>
                    <div className="bg-yellow-500/10 text-yellow-400 p-3 rounded-lg">
                      <Calendar size={24} />
                    </div>
                  </div>
                </div>

                {/* Views Yesterday */}
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-sm mb-1">Views Yesterday</p>
                      <p className="text-3xl font-extrabold text-white">{analytics?.viewsYesterday || 0}</p>
                    </div>
                    <div className="bg-purple-500/10 text-purple-400 p-3 rounded-lg">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECTS SECTION */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FolderHeart size={20} className="text-pink-400" />
                <h2 className="text-xl font-bold">Project Statistics</h2>
              </div>
              <DashboardStats stats={stats} />
            </div>

            {/* CHARTS SECTION */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-indigo-400" />
                <h2 className="text-xl font-bold">Visitor View Trends</h2>
              </div>

              {/* Growth Chart - Full Width */}
              <div className="mb-6">
                <ProjectsGrowthChart trends={analytics?.dailyTrends} />
              </div>

              {/* CHARTS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Pie Chart */}
                <StatusDistributionChart stats={stats} />

                {/* Bar Chart */}
                <ProjectStatusChart stats={stats} />
              </div>
            </div>

            {/* POPULAR PAGES & QUICK SUMMARY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Popular Pages List (2/3 width) */}
              <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ArrowUpRight size={18} className="text-blue-400" />
                  Top Visited Pages
                </h3>
                {analytics?.popularPages && analytics.popularPages.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-400 font-semibold">
                          <th className="pb-3">Path</th>
                          <th className="pb-3 text-right">Views</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/50">
                        {analytics.popularPages.map((page, idx) => (
                          <tr key={idx} className="text-zinc-300 hover:text-white transition">
                            <td className="py-3 font-mono text-xs text-blue-400">{page.path}</td>
                            <td className="py-3 text-right font-semibold">{page.views}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm text-center py-6">No page views recorded yet</p>
                )}
              </div>

              {/* Quick Summary Cards (1/3 width) */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-4">Quick Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800/50 pb-3">
                      <span className="text-zinc-400 text-sm">Completion Rate</span>
                      <span className="text-lg font-bold text-green-400">
                        {stats?.total_projects > 0
                          ? Math.round(
                              (stats.completed_projects / stats.total_projects) * 100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-zinc-800/50 pb-3">
                      <span className="text-zinc-400 text-sm">Active Projects</span>
                      <span className="text-lg font-bold text-blue-400">
                        {stats?.active_projects || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-zinc-400 text-sm">In Progress</span>
                      <span className="text-lg font-bold text-yellow-400">
                        {stats?.in_progress_projects || 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                  <p className="text-blue-400/90 text-xs leading-relaxed">
                    💡 <strong>Pro Tip:</strong> Gunakan panel ini untuk memonitor performa portofolio Anda secara real-time. Bagikan tautan portofolio Anda ke platform LinkedIn untuk melihat peningkatan pengunjung!
                  </p>
                </div>
              </div>

            </div>
          </>
        )}
      </main>
    </div>
  );
}
