import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/auth/reset-password/${token}`, { password });
      alert("Password updated");
      navigate("/login");
    } catch {
      alert("Invalid or expired link");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">Enter your new password</p>
        </div>

        <form className="auth-form" onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="auth-btn primary">Reset Password</button>

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

export default ResetPassword;
