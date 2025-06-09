import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/"); // redirect to home after login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "40px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ padding: "10px 20px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
