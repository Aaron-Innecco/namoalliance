import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "../api/news";

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function load() {
      const n = await fetchNews();
      setNews(n.news || []);
    }
    load();
  }, []);

  return (
    <div className="page">
      <section className="page-section">
        <h1>News</h1>
        <div className="stack">
          {news.map((n, i) => (
            <NewsCard key={i} item={n} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default News;
