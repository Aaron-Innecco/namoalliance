import React, { useState } from "react";
import { checkCouncilPassword } from "../api/auth";

function PasscodePrompt({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await checkCouncilPassword(password);
      if (res && res.valid) {
        onSuccess();
      } else {
        setErr("Invalid passcode");
      }
    } catch {
      setErr("Failed to verify passcode");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form" style={{ maxWidth: 400 }}>
      <h3>Admin Access</h3>

      <p style={{ fontSize: "0.85rem", color: "#c9d6eb" }}>
        You are logged in but not an administrator.  
        Enter the council/admin passcode to access the admin panel.
      </p>

      {err && <div className="form-error">{err}</div>}

      <label className="form-label">
        Passcode
        <input
          type="password"
          className="form-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <button type="submit" className="form-button" disabled={loading}>
        {loading ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}

export default PasscodePrompt;
