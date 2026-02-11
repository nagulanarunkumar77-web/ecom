import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      const token = res.data.token;

      // ✅ store token
      localStorage.setItem("token", token);

      // ✅ decode ONLY after login success
      const decoded = jwtDecode(token);

      // ✅ role-based redirect
      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="auth-btn primary">Login</button>

          <div className="auth-links">
            <p>
              New user? <a href="/register" className="auth-link">Register here</a>
            </p>
            <p>
              <a href="/forgot-password" className="auth-link">Forgot password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
