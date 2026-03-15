import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    const res = await register(username, email, password);

    if (res.error) {
      setErr(res.error);
      return;
    }

    setMsg("Account created!");
    setTimeout(() => navigate("/login"), 1500);
  }

  return (
    <div className="page">
      <section className="page-section">
        <h1>Register</h1>
        <form className="form" onSubmit={handleSubmit}>
          {err && <div className="form-error">{err}</div>}
          {msg && <div className="form-success">{msg}</div>}

          <label className="form-label">
            Username
            <input
              className="form-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>

          <label className="form-label">
            Email
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            Register
          </button>
        </form>
      </section>
    </div>
  );
}

export default Register;