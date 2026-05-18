// API Service untuk semua request ke backend
const API_BASE_URL = "http://localhost:3001/api";

// Helper untuk mengambil headers dengan Authorization Token
const getHeaders = () => {
  const token = localStorage.getItem("dashboardToken");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// ===== AUTH SERVICE =====
export const authService = {
  // Login user ke backend
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

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data.data; // Mengembalikan { token, user: { id, username } }
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

      if (!response.ok) {
        throw new Error(data.message || "Register failed");
      }

      return data.data;
    } catch (error) {
      throw new Error(error.message || "Register failed");
    }
  },
};

// ===== PROJECT SERVICE =====
export const projectService = {
  // Get all projects
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch projects");
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
      if (!response.ok) throw new Error(data.error || "Failed to fetch project");
      return data.data || data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch project");
    }
  },

  // Create project (Protected)
  create: async (title, tech, status, image) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ title, tech, status, image }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Backend error:", data);
        throw new Error(data.message || data.error || "Failed to create project");
      }
      return data.data || data;
    } catch (error) {
      console.error("Create project error:", error);
      throw new Error(error.message || "Failed to create project");
    }
  },

  // Update project (Protected)
  update: async (id, title, tech, status, image) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ title, tech, status, image }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update project");
      return data.data || data;
    } catch (error) {
      throw new Error(error.message || "Failed to update project");
    }
  },

  // Delete project (Protected)
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete project");
      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to delete project");
    }
  },
};

// ===== MESSAGES (INBOX) SERVICE =====
export const messageService = {
  // Kirim pesan baru (Public)
  create: async (name, email, subject, message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send message");
      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to send message");
    }
  },

  // Ambil semua pesan (Protected)
  getAll: async (limit = 20, offset = 0) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages?limit=${limit}&offset=${offset}`, {
        headers: getHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch messages");
      return data.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch messages");
    }
  },

  // Tandai pesan sudah dibaca/belum dibaca (Protected)
  toggleReadStatus: async (id, isRead) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${id}/read`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ is_read: isRead }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update message status");
      return data.data;
    } catch (error) {
      throw new Error(error.message || "Failed to update message status");
    }
  },

  // Hapus pesan (Protected)
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete message");
      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to delete message");
    }
  },
};

// ===== SETTINGS SERVICE =====
export const settingService = {
  // Ambil data profil/setingan website (Public)
  get: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch settings");
      return data.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch settings");
    }
  },

  // Update profil secara massal (Protected)
  update: async (settingsData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(settingsData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update settings");
      return data.data;
    } catch (error) {
      throw new Error(error.message || "Failed to update settings");
    }
  },
};

// ===== ANALYTICS SERVICE =====
export const analyticsService = {
  // Catat page view kunjungan (Public)
  recordView: async (path) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to record page view");
      return data;
    } catch (error) {
      console.warn("Analytics recording failed:", error.message);
    }
  },

  // Ambil statistik kunjungan (Protected)
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/stats`, {
        headers: getHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch analytics stats");
      return data.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch analytics stats");
    }
  },
};
