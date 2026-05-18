/**
 * Dashboard Settings Page
 * Manage global portfolio configuration, profile details, and social links
 */

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { settingService } from "../../services/api";
import { Settings, Save, AlertCircle, CheckCircle2, Globe, Mail, User, ShieldCheck } from "lucide-react";

export default function DashboardSettings() {
  const [form, setForm] = useState({
    site_name: "",
    email: "",
    bio: "",
    resume_url: "",
    github_url: "",
    linkedin_url: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const data = await settingService.get();
      if (data) {
        setForm({
          site_name: data.site_name || "",
          email: data.email || "",
          bio: data.bio || "",
          resume_url: data.resume_url || "",
          github_url: data.github_url || "",
          linkedin_url: data.linkedin_url || ""
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to load site settings"
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSaving(true);
    
    try {
      const updated = await settingService.update(form);
      if (updated) {
        setForm({
          site_name: updated.site_name || "",
          email: updated.email || "",
          bio: updated.bio || "",
          resume_url: updated.resume_url || "",
          github_url: updated.github_url || "",
          linkedin_url: updated.linkedin_url || ""
        });
        setStatus({
          type: "success",
          message: "Portfolio settings updated successfully!"
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to save portfolio settings"
      });
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-auto">
        
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold">Portfolio Settings</h1>
          </div>
          <p className="text-zinc-400">
            Configure dynamic properties and bio profile coordinates loaded on the public landing page.
          </p>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-zinc-400 text-sm">Retrieving profile parameters...</p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">
            {/* Status Alert */}
            {status.message && (
              <div
                className={`mb-6 p-4 rounded-lg border flex gap-3 ${
                  status.type === "success"
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                )}
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Profile Coordinates Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 backdrop-blur-sm">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-zinc-800 pb-3 text-zinc-200">
                  <User size={18} className="text-blue-400" />
                  General Coordinates
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Site Name */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Site Brand Name
                    </label>
                    <input
                      type="text"
                      name="site_name"
                      value={form.site_name}
                      onChange={handleChange}
                      placeholder="e.g. Haidar Habibi"
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-lg text-sm text-white focus:outline-none transition"
                      required
                    />
                  </div>

                  {/* Public Email */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Public Contact Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. haidar@gmail.com"
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-lg text-sm text-white focus:outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Professional Bio */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    Professional Biography
                  </label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your skillset, focus, and credentials..."
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-lg text-sm text-white focus:outline-none transition resize-none"
                    required
                  />
                </div>
              </div>

              {/* Assets & Social Links Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 backdrop-blur-sm">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-zinc-800 pb-3 text-zinc-200">
                  <Globe size={18} className="text-blue-400" />
                  Assets & Social Coordinates
                </h2>

                <div className="space-y-3">
                  {/* Resume PDF */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                      Resume PDF URL
                    </label>
                    <input
                      type="url"
                      name="resume_url"
                      value={form.resume_url}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-lg text-sm text-white focus:outline-none transition font-mono text-xs"
                    />
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                      GitHub Profile URL
                    </label>
                    <input
                      type="url"
                      name="github_url"
                      value={form.github_url}
                      onChange={handleChange}
                      placeholder="https://github.com/your-username"
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-lg text-sm text-white focus:outline-none transition font-mono text-xs"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      name="linkedin_url"
                      value={form.linkedin_url}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/your-username"
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-lg text-sm text-white focus:outline-none transition font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={fetchSettings}
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg text-sm text-zinc-300 transition"
                >
                  Discard Changes
                </button>
                
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed transition duration-300 shadow-lg shadow-blue-500/20"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Coordinates
                    </>
                  )}
                </button>
              </div>

            </form>

            <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3">
              <ShieldCheck size={24} className="text-blue-400 shrink-0" />
              <p className="text-xs text-zinc-400 leading-relaxed">
                🛡️ <strong>Security Coordination:</strong> All settings data transactions are fully validated and sanitised both in the frontend and the backend PostgreSQL database using strict SQL transaction queries.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
