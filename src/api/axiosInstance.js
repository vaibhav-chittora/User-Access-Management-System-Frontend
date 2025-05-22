import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // ✅ change if different
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
