import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosConfig"; // 👈 import from central config

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });

      const { user, token } = res.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { success: true };
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      const { user, token } = res.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return { success: true };
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message);
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
