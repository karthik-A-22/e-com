import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Container className="d-flex justify-content-center">
        <Card
          style={{ width: "100%", maxWidth: "400px" }}
          className="p-4 shadow"
        >
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <div className="d-grid mb-3">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>

              <div className="text-center">
                <small>
                  Don't have an account? <Link to="/signup">Register</Link>
                </small>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
