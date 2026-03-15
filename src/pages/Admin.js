import React, { useState } from "react";
import PasscodePrompt from "../components/PasscodePrompt";
import AdminPanel from "../components/AdminPanel";

function Admin({ user }) {
  const [unlocked, setUnlocked] = useState(false);

  if (!user) {
    return (
      <div className="page">
        <section className="page-section">
          <h1>Admin</h1>
          <p>You must be logged in to access this page.</p>
        </section>
      </div>
    );
  }

  if (user.is_admin) {
    return (
      <div className="page">
        <AdminPanel />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="page">
        <PasscodePrompt onSuccess={() => setUnlocked(true)} />
      </div>
    );
  }

  return (
    <div className="page">
      <AdminPanel />
    </div>
  );
}

export default Admin;
