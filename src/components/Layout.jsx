import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('loggedInUser');
    if (username) setUser(username);
  }, []);

  function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('sessionId');
    setUser(null);
    window.location.href = '/';
  }

  return (
    <div className="app-container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}> 
        <button
          className="collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          aria-label="toggle sidebar"
        >
          {collapsed ? '→' : '☰'}
        </button>
        <nav className="sidebar-nav">
          <Link to="/">Home</Link>
          <Link to="/join">Join</Link>
          <Link to="/members">Members</Link>
          <a href="https://wiki.namoalliance.org/wiki/Main_Page" target="_blank" rel="noopener noreferrer">
            Wiki
          </a>
          <Link to="/discussion">Discussion</Link>
          <Link to="/council">Council</Link>
          <Link to="/news">News</Link>
          <Link to="/account">Account</Link>
          <Link to="/contact">Contact us</Link>
        </nav>
        <div className="user-display">
          {user && (
            <span>
              Logged in as <strong>{user}</strong>{' '}
              <button onClick={logout}>Logout</button>
            </span>
          )}
        </div>
      </div>

      <div className="content">
        {children}
        <div id="bottombar-container" className="bottombar-container">
          <div id="bottombar-nav" className="bottombar-nav">
            <a
              href="https://wiki.namoalliance.org/wiki/Nova_Associate_Micronational_Organisation"
              target="_blank"
              rel="noopener noreferrer"
            >
              NAMOwiki Page
            </a>
          </div>
        </div>
      </div>

      <footer>&copy; {new Date().getFullYear()} NAMO</footer>
    </div>
  );
}
