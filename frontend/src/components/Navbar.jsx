  import React from "react";
  import { Link, NavLink, useNavigate } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import axios from "axios";

  export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await axios.get(
          "http://localhost:3000/api/auth/user/logout",
          { withCredentials: true } // ✅ Correct axios usage
        );

        logout(); // removes userId from localStorage
        navigate("/login");

      } catch (error) {
        console.log("Logout error:", error);
      }
    };

    return (
      <header className="navbar">
        <div className="app-container nav-inner">

          <Link to="/" className="brand">
            <div className="brand-logo">T</div>
            Taskly
          </Link>

          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>

            {!isLoggedIn ? (
              <Link className="auth-btn" to="/login">Login</Link>
            ) : (
              <button className="auth-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </nav>

        </div>
      </header>
    );
  }
