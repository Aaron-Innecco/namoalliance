import React from "react";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Account({ user, setUser }) {
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate("/");
  }

  return (
    <div className="page">
      <section className="page-section">
        <h1>Account</h1>

        <p>Logged in as: <strong>{user.username}</strong></p>

        {user.is_admin && (
          <p style={{ color: "#3a6ea5" }}>
            You are an administrator.
          </p>
        )}

        <button className="form-button" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </div>
  );
}

export default Account;
