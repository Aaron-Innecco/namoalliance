import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);

    const res = await login(username, password);
    if (res.error) {
      setErr(res.error);
      return;
    }

    setUser(res);
    navigate("/account");
  }

  return (
    <div className="page">
      <section className="page-section">
        <h1>Login</h1>

        <form className="form" onSubmit={handleSubmit}>
          {err && <div className="form-error">{err}</div>}

          <label className="form-label">
            Username
            <input
              className="form-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>

          <label className="form-label">
            Password
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <button className="form-button" type="submit">
            Login
          </button>
        </form>

        <div className="login-signup-link">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="signup-link">
              Sign up!
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
