import axios from "axios";

const API_URL = process.env.REACT_APP_API_BACK_URL || "http://localhost:8889";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userAPI = {
  getAllUsers: () => api.get("/users"),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (user) => api.post("/users", user),
  updateUser: (id, user) => api.put(`/users/${id}`, user),
  deleteUser: (id) => api.delete(`/users/${id}`),
};
export const authAPI = {
  register: (userData) => api.post("/register", userData),
  login: (credentials) => api.post("/login", credentials),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export const formationsAPI = {
  getAllFormations: () => api.get("/formations"),
  getFormation: (id) => api.get(`/formations/${id}`),
  createFormation: (plat) => api.post("/formations", plat),
  updateFormation: (id, plat) => api.put(`/formations/${id}`, plat),
  deleteFormation: (id) => api.delete(`/formations/${id}`),
};
