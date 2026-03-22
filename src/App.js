import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Members from "./pages/Members";
import ContactUs from "./pages/ContactUs";
import News from "./pages/News";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Join from "./pages/Join";
import Verify from "./pages/Verify";
import { me } from "./api/auth";
import "./App.css";

function AppInner() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [checkedUser, setCheckedUser] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const u = await me();
      if (!u || u.error) setUser(null);
      else setUser(u);
      setCheckedUser(true);
    }
    loadUser();
  }, []);

  if (!checkedUser) {
    return (
      <div className="app-root">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} user={user} />
        <div className={`app-main ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <main className="app-content">
            <p>Loading…</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} user={user} />
      <div className={`app-main ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/news" element={<News />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/account" element={<Account user={user} setUser={setUser} />} />
            <Route path="/admin" element={<Admin user={user} />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer className="app-footer">
          © {new Date().getFullYear()} Nova Associate Micronational Organisation · namoalliance.org
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return <AppInner />;
}
