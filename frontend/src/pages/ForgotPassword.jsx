import { useState } from "react";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      alert("Reset email sent");
    } catch {
      alert("User not found");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2 className="auth-title">Forgot Password</h2>
          <p className="auth-subtitle">Enter your email to receive a reset link</p>
        </div>

        <form className="auth-form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="auth-btn primary">Send Reset Link</button>

          <div className="auth-links">
            <p>
              <a href="/login" className="auth-link">Back to Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
