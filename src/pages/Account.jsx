import React, { useState } from 'react';

const API_BASE = 'https://api.namoalliance.org';

export default function Account() {
  const [view, setView] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPwd, setLoginPwd] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE}/api/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
      credentials: 'include',
    });
    const result = await response.json();
    if (response.ok) {
      alert('Registered successfully');
      setView('login');
    } else {
      alert(result.error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: loginPwd }),
      credentials: 'include',
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('loggedInUser', username);
      window.location.href = '/';
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="main-content">
      <button onClick={() => setView('register')}>Register</button>
      <button onClick={() => setView('login')}>Login</button>
      <button
        onClick={async () => {
          await fetch(`${API_BASE}/api/user/logout`, { method: 'POST', credentials: 'include' });
          localStorage.removeItem('loggedInUser');
          window.location.reload();
        }}
      >
        Logout
      </button>

      {view === 'register' ? (
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPwd}
            onChange={(e) => setLoginPwd(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}
