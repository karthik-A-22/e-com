import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount, check if user is saved in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password) => {
    // Mock user validation (replace with real API call later)
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("user", JSON.stringify(existingUser));
      return true; // login successful
    }
    return false; // login failed
  };

  const signup = (name, email, password) => {
    let storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    if (storedUsers.some((u) => u.email === email)) {
      return false; // user already exists
    }

    const newUser = { id: Date.now(), name, email, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
