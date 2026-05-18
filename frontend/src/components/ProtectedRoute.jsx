import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Route Guard untuk memproteksi halaman dashboard
 * Redirect ke /login jika user belum terautentikasi
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-zinc-400 text-sm">Memverifikasi sesi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
