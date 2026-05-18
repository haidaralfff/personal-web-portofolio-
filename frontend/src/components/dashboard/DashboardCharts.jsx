/**
 * Dashboard Charts Component
 * Menampilkan berbagai chart visualization
 */

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#f87171", "#8b5cf6"];

/**
 * Status Distribution Chart (Pie Chart)
 */
export function StatusDistributionChart({ stats }) {
  const data = [
    { name: "Active", value: stats?.active_projects || 0, fill: COLORS[0] },
    { name: "In Progress", value: stats?.in_progress_projects || 0, fill: COLORS[1] },
    { name: "Draft", value: stats?.draft_projects || 0, fill: COLORS[2] },
    { name: "Completed", value: stats?.completed_projects || 0, fill: COLORS[3] }
  ];

  // Filter out zero values untuk pie chart lebih clean
  const filteredData = data.filter(d => d.value > 0);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-white font-semibold mb-4">Project Status Distribution</h3>
      {filteredData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "0.5rem"
              }}
              formatter={(value) => `${value} project${value !== 1 ? "s" : ""}`}
            />
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-zinc-500">
          No data available
        </div>
      )}
    </div>
  );
}

/**
 * Project Status Bar Chart
 */
export function ProjectStatusChart({ stats }) {
  const data = [
    { status: "Active", count: stats?.active_projects || 0 },
    { status: "In Progress", count: stats?.in_progress_projects || 0 },
    { status: "Draft", count: stats?.draft_projects || 0 },
    { status: "Completed", count: stats?.completed_projects || 0 }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-white font-semibold mb-4">Projects by Status</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis dataKey="status" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: "0.5rem"
            }}
          />
          <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Projects Growth Chart (Sample Data)
 * Bisa dikembangkan dengan real data dari database
 */
export function ProjectsGrowthChart({ trends }) {
  const data = trends || [];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
      <h3 className="text-white font-semibold mb-4">Visitor Analytics (Past 7 Days)</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="date" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: "0.5rem"
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="views"
              name="Page Views"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="visitors"
              name="Unique Visitors"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-zinc-500">
          No trends data available
        </div>
      )}
    </div>
  );
}
