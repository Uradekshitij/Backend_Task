import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";   // ✅ import Toast

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);      // 🔥 show toast
  const [toastMsg, setToastMsg] = useState("");           // 🔥 toast message

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email';

    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isValid) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );

      login(response.data.token);
      localStorage.setItem("userId", response.data.user.id);

      // 🔥 Show Success Toast
      setToastMsg("Login successful!");
      setShowToast(true);

      // 🔥 Redirect AFTER 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error(error);

      // 🔥 Show Error Toast
      setToastMsg("Invalid credentials or server error");
      setShowToast(true);
    }
  };

  return (
    <div className="app-container">

      {/* 🔥 Toast Component */}
      <Toast 
        show={showToast} 
        message={toastMsg} 
        onClose={() => setShowToast(false)} 
      />

      <div className="auth-root">
        <div className="auth-layout">

          <div className="auth-ill auth-card">
            <svg width="340" height="220" viewBox="0 0 340 220" fill="none">
              <rect width="340" height="220" rx="14" fill="#EEF2FF" />
              <circle cx="60" cy="80" r="30" fill="#A78BFA" />
            </svg>
          </div>

          <div className="auth-card">
            <h2 style={{ marginTop: 0 }}>Welcome back</h2>
            <p className="muted">Sign in to access your tasks and projects.</p>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>

              <div className="form-row">
                <label>Email</label>
                <input
                  className={`input ${touched.email && errors.email ? 'error' : ''}`}
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                />
                {touched.email && errors.email && (
                  <div className="error-text">{errors.email}</div>
                )}
              </div>

              <div className="form-row">
                <label>Password</label>
                <input
                  className={`input ${touched.password && errors.password ? 'error' : ''}`}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, password: true }))}
                />
                {touched.password && errors.password && (
                  <div className="error-text">{errors.password}</div>
                )}
              </div>

              <button className="btn-primary" style={{ width: '100%' }} disabled={!isValid}>
                Sign In
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <small className="muted">Don't have an account?</small>
                <Link to="/register">Register</Link>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
