/**
 * Dashboard Login Page
 * Simple login form terhubung dengan backend API
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, User, ArrowLeft, AlertCircle } from "lucide-react";

// Validation rules - simple dan mudah di-maintain
const VALIDATION_RULES = {
  username: {
    min: 3,
    max: 100,
    message: "Username harus 3-100 karakter"
  },
  password: {
    min: 3,
    max: 255,
    message: "Password harus 3-255 karakter"
  }
};

// Validate form input
function validateForm(username, password) {
  const errors = {};

  // Validate username
  if (!username || !username.trim()) {
    errors.username = "Username harus diisi";
  } else if (username.length < VALIDATION_RULES.username.min || username.length > VALIDATION_RULES.username.max) {
    errors.username = VALIDATION_RULES.username.message;
  }

  // Validate password
  if (!password) {
    errors.password = "Password harus diisi";
  } else if (password.length < VALIDATION_RULES.password.min || password.length > VALIDATION_RULES.password.max) {
    errors.password = VALIDATION_RULES.password.message;
  }

  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error untuk field yang sedang diubah
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setErrors({});

    // Validate form
    const validationErrors = validateForm(form.username, form.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Call login dari AuthContext (yang call backend API)
      const result = await login(form.username.trim(), form.password);

      if (result.success) {
        // Login berhasil, redirect ke dashboard
        navigate("/dashboard");
      } else {
        // Login gagal, tampilkan error dari backend
        setApiError(result.error || "Login gagal");
      }
    } catch (error) {
      setApiError("Terjadi kesalahan saat login. Pastikan backend running.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-800">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">

          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock size={32} className="text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Login</h1>
            <p className="text-zinc-400">Access your portfolio management panel</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-5">

            {/* API Error Message */}
            {apiError && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex gap-3">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 text-sm font-medium">Login Gagal</p>
                  <p className="text-red-400/80 text-xs mt-1">{apiError}</p>
                </div>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  Username
                </div>
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition ${
                  errors.username
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-2">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <div className="flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </div>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-2">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 text-xs leading-relaxed">
              💡 <strong>Note:</strong> Login menggunakan user yang terdaftar di database. Sebelumnya register user atau gunakan user yang sudah ada.
            </p>
          </div>

          {/* Backend Status Info */}
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-xs">
              ⚠️ <strong>Penting:</strong> Pastikan backend running di http://localhost:3001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
