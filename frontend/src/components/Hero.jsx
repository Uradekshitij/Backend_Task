import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ✅ useAuth imported

export default function Hero({ active, completed }) {

  const { isLoggedIn } = useAuth();   // ✅ consistent with Navbar

  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">Organize your work. Ship faster.</h1>
        <p className="hero-sub">
          A minimal task management UI to help teams track and complete work
          with focus and clarity.
        </p>

        {/* 👇 Show only if user is NOT logged in */}
        {!isLoggedIn && (
          <Link to="/register">
            <button className="btn-primary">Get Started — It's free</button>
          </Link>
        )}

        <div className="stats" style={{ marginTop: 20 }}>
          <div className="stat-card">
            <div className="stat-value">{active}</div>
            <div className="stat-label">Active Tasks</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{completed}</div>
            <div className="stat-label">Completed Tasks</div>
          </div>
        </div>
      </div>

      <div className="hero-ill">
        <svg width="360" height="240" viewBox="0 0 360 240" fill="none">
          <rect x="10" y="10" width="340" height="220" rx="16" fill="#EEF2FF" />
          <rect x="30" y="36" width="300" height="36" rx="8" fill="#fff" />
          <rect x="30" y="88" width="220" height="20" rx="6" fill="#fff" />
          <rect x="30" y="120" width="300" height="20" rx="6" fill="#fff" />
          <rect x="30" y="152" width="180" height="20" rx="6" fill="#fff" />
          <circle cx="276" cy="160" r="28" fill="#8B5CF6" />
        </svg>
      </div>
    </section>
  );
}
