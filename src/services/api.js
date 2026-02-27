// API Service untuk semua request ke backend
const API_BASE_URL = "http://localhost:4000/api";

// ===== AUTH ENDPOINTS =====

export const authService = {
  // Login user
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  },

  // Register user
  register: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    } catch (error) {
      throw new Error(error.message || "Register failed");
    }
  },
};

// ===== PROJECT ENDPOINTS =====

export const projectService = {
  // Get all projects
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.data || data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch projects");
    }
  },

  // Get project by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.data || data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch project");
    }
  },

  // Create project
  create: async (title, tech, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, tech, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.data || data;
    } catch (error) {
      throw new Error(error.message || "Failed to create project");
    }
  },

  // Update project
  update: async (id, title, tech, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, tech, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.data || data;
    } catch (error) {
      throw new Error(error.message || "Failed to update project");
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to delete project");
    }
  },
};

// ===== LOCAL STORAGE HELPERS =====

export const storageService = {
  // Set user data
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Get user data
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Clear user data
  clearUser: () => {
    localStorage.removeItem("user");
  },

  // Check if user logged in
  isLoggedIn: () => {
    return localStorage.getItem("user") !== null;
  },
};
