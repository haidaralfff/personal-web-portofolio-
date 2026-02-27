import { useState, useEffect } from "react";
import { Plus, Trash, Pencil } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { projectService } from "../../services/api";

export default function DashboardProject() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    tech: "",
    status: "Active"
  });

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await projectService.getAll();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load projects");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.title || !form.tech) {
      setError("Title and tech are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const newProject = await projectService.create(form.title, form.tech, form.status);
      setProjects([newProject, ...projects]);
      setShowModal(false);
      setForm({ title: "", tech: "", status: "Active" });
      setError("");
    } catch (err) {
      setError(err.message || "Failed to add project");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await projectService.delete(id);
      setProjects(projects.filter(p => p.id !== id));
      setError("");
    } catch (err) {
      setError(err.message || "Failed to delete project");
      console.error(err);
    }
  };

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Project Dashboard</h1>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:bg-blue-800"
            disabled={isSubmitting}
          >
            <Plus size={18}/>
            Add Project
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-zinc-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-zinc-400">No projects yet. Create one to get started!</p>
          </div>
        ) : (
        <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
          <table className="w-full text-left">
            <thead className="bg-zinc-800 text-zinc-400">
              <tr>
                <th className="p-4">Title</th>
                <th>Tech</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-t border-zinc-800">
                  <td className="p-4">{p.title}</td>
                  <td>{p.tech}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs rounded
                      ${p.status === "Active"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-yellow-600/20 text-yellow-400"}`}>
                      {p.status}
                    </span>
                  </td>

                  <td className="space-x-2">
                    <button className="p-2 bg-blue-600 rounded">
                      <Pencil size={14}/>
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 bg-red-600 rounded"
                    >
                      <Trash size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-zinc-900 p-6 rounded-xl w-96 space-y-4">

              <h2 className="text-lg font-semibold">Add Project</h2>

              <input
                placeholder="Project title"
                className="w-full p-2 bg-zinc-800 rounded"
                value={form.title}
                onChange={e => setForm({...form, title:e.target.value})}
              />

              <input
                placeholder="Tech stack"
                className="w-full p-2 bg-zinc-800 rounded"
                value={form.tech}
                onChange={e => setForm({...form, tech:e.target.value})}
              />

              <select
                className="w-full p-2 bg-zinc-800 rounded"
                value={form.status}
                onChange={e => setForm({...form, status:e.target.value})}
              >
                <option>Active</option>
                <option>Draft</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-zinc-700 rounded disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  onClick={handleAdd}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 rounded disabled:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}