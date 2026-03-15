import React from "react";
import "./NewsCard.css";

function NewsCard({ item }) {
  return (
    <article className="news-card">
      {item.image && (
        <img
          src={item.image}
          alt={item.title || "News"}
          className="news-image"
        />
      )}

      {item.title && <h2 className="news-title">{item.title}</h2>}
      {item.date && <div className="news-date">{item.date}</div>}

      {item.text && (
        <p className="news-text">
          {item.text}
        </p>
      )}
    </article>
  );
}

export default NewsCard;
