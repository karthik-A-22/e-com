import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // 🔁 Replace with your actual backend base URL
  withCredentials: true, // optional: for cookies if using sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Auto-add token from localStorage (if present)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ Optional: Global error handler
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error?.response?.data?.message || error.message
    );
    return Promise.reject(error);
  }
);

export default instance;
