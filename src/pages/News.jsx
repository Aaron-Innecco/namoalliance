import React, { useEffect, useState } from 'react';

export default function News() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/news.json')
      .then(res => res.json())
      .then(data => setItems(data.news || []))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>News</h1>
      <p>Welcome to the News section of the Nova Associate Micronational Organisation! Here you will find the latest updates and announcements regarding our organisation and its member states.</p>
      <h2>Latest News</h2>
      <ul id="news-container">
        {items.map((news, idx) => (
          <li key={idx} className="news-card">
            <strong>{news.text}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
