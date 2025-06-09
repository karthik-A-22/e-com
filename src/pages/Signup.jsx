import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = signup(name, email, password);
    if (success) {
      navigate("/");
    } else {
      setError("User with this email already exists");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "40px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
        />

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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
