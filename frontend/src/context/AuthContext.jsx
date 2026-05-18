/**
 * Authentication Context
 * Mengelola state login dan autentikasi JWT dengan backend
 */

import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user sudah login sebelumnya (dari localStorage JWT token)
  useEffect(() => {
    const storedAuth = localStorage.getItem("dashboardAuth");
    const storedUser = localStorage.getItem("dashboardUser");
    const storedToken = localStorage.getItem("dashboardToken");
    
    if (storedAuth === "true" && storedUser && storedToken) {
      try {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error restoring auth:", error);
        localStorage.removeItem("dashboardAuth");
        localStorage.removeItem("dashboardUser");
        localStorage.removeItem("dashboardToken");
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Login function - call backend API
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{ success: boolean, error?: string }>}
   */
  const login = async (username, password) => {
    try {
      // Call backend API (mengembalikan { token, user: { id, username } })
      const userData = await authService.login(username, password);
      
      // Simpan ke localStorage
      localStorage.setItem("dashboardAuth", "true");
      localStorage.setItem("dashboardToken", userData.token);
      localStorage.setItem("dashboardUser", JSON.stringify(userData.user));
      
      // Update state
      setIsAuthenticated(true);
      setUser(userData.user);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    localStorage.removeItem("dashboardAuth");
    localStorage.removeItem("dashboardToken");
    localStorage.removeItem("dashboardUser");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook untuk menggunakan AuthContext
 * @returns {object} { isAuthenticated, isLoading, user, login, logout }
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
