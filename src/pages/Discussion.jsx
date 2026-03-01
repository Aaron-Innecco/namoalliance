import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const API_BASE = 'https://api.namoalliance.org';

export default function Discussion() {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState({});

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/discussion`);
      const data = await response.json();
      const list = Object.entries(data || {}).map(([key, value]) => ({
        _id: key,
        ...value,
      }));
      setComments(list);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE}/api/auth/check_password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: inputPassword }),
      credentials: 'include',
    });
    const result = await response.json();
    if (result.valid) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
      alert('You need to log into your account to send a message.');
      return;
    }
    if (message) {
      const response = await fetch(`${API_BASE}/api/discussion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: DOMPurify.sanitize(username),
          message: DOMPurify.sanitize(message),
          timestamp: Date.now(),
        }),
        credentials: 'include',
      });
      if (response.ok) {
        setMessage('');
        fetchComments();
      } else {
        alert('Error posting comment.');
      }
    }
  };

  const handleReply = async (e, commentId) => {
    e.preventDefault();
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
      alert('You need to log into your account to send a reply.');
      return;
    }
    const rMessage = replyMessage[commentId];
    if (rMessage) {
      const response = await fetch(
        `${API_BASE}/api/discussion/${commentId}/reply`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: DOMPurify.sanitize(username),
            message: DOMPurify.sanitize(rMessage),
            timestamp: Date.now(),
          }),
          credentials: 'include',
        }
      );
      if (response.ok) {
        setReplyMessage({ ...replyMessage, [commentId]: '' });
        fetchComments();
      } else {
        alert('Error posting reply.');
      }
    }
  };

  if (!authenticated) {
    return (
      <form onSubmit={handleLogin} className="main-content">
        <h2>Enter Admin Password to Access Discussion</h2>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Enter</button>
      </form>
    );
  }

  return (
    <div className="main-content">
      <h2>Discussion Board</h2>
      <h3>
        <strong>You need to log into an account to send a message.</strong>
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={localStorage.getItem('loggedInUser') || ''}
          readOnly
          placeholder="Your username"
        />
        <br />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your comment"
          required
        />
        <br />
        <button type="submit">Post Comment</button>
      </form>

      <hr />
      <br />
      <h3>Comments</h3>

      {comments.map((c, i) => (
        <div key={i} className="comment">
          <strong>{DOMPurify.sanitize(c.name)}</strong>
          <br />
          <p
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.message) }}
          ></p>
          <br />

          {c.replies &&
            Object.values(c.replies).map((r, j) => (
              <div key={j} className="reply">
                <strong>{DOMPurify.sanitize(r.name)}</strong>
                <br />
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(r.message),
                  }}
                ></p>
                <br />
              </div>
            ))}

          <form onSubmit={(e) => handleReply(e, c._id)}>
            <input
              type="text"
              value={localStorage.getItem('loggedInUser') || ''}
              readOnly
              placeholder="Your username"
            />
            <br />
            <br />
            <textarea
              placeholder="Your reply"
              value={replyMessage[c._id] || ''}
              onChange={(e) =>
                setReplyMessage({ ...replyMessage, [c._id]: e.target.value })
              }
              required
            />
            <br />
            <button type="submit">Reply</button>
          </form>
        </div>
      ))}
    </div>
  );
}
