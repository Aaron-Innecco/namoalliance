import React, { useState } from 'react';

export default function Admin() {
  const API_BASE = 'https://api.namoalliance.org';
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [newsText, setNewsText] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberFlag, setMemberFlag] = useState('');
  const [memberPage, setMemberPage] = useState('');
  const [memberType, setMemberType] = useState('member');

  const checkPassword = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/auth/check_council_password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.valid) setAuthenticated(true);
    else alert('Invalid password');
  };

  const submitNews = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/admin/add_news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, text: newsText }),
    });
    if (res.ok) {
      alert('News added');
      setNewsText('');
    } else {
      alert('Failed to add news');
    }
  };

  const submitMember = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/admin/add_member`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        type: memberType,
        name: memberName,
        flag_url: memberFlag,
        wikipage: memberPage,
      }),
    });
    if (res.ok) {
      alert('Member added');
      setMemberName('');
      setMemberFlag('');
      setMemberPage('');
    } else {
      alert('Failed to add member');
    }
  };

  if (!authenticated) {
    return (
      <div className="main-content">
        <h2>Admin Login</h2>
        <form onSubmit={checkPassword}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h2>Admin Panel</h2>
      <section>
        <h3>Add News</h3>
        <form onSubmit={submitNews}>
          <textarea
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            placeholder="News text"
            required
          />
          <br />
          <button type="submit">Add News</button>
        </form>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h3>Add Member</h3>
        <form onSubmit={submitMember}>
          <select value={memberType} onChange={(e) => setMemberType(e.target.value)}>
            <option value="member">Member</option>
            <option value="observer">Observer</option>
            <option value="former">Former</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Flag URL"
            value={memberFlag}
            onChange={(e) => setMemberFlag(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Wiki page URL"
            value={memberPage}
            onChange={(e) => setMemberPage(e.target.value)}
          />
          <br />
          <button type="submit">Add Member</button>
        </form>
      </section>
    </div>
  );
}
