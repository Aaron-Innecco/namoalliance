import React, { useEffect, useState } from 'react';
import '../styles/style.css';

const slides = [
  {
    image: 'https://static.wikitide.net/namowiki/3/34/Flag_of_the_People%27s_Republic_of_Naas.png',
    text: "People's Republic of Naas",
  },
  {
    image: 'https://static.wikitide.net/namowiki/c/c5/Anti-fascist_flag.png',
    text: 'Unified People\'s States',
  }
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`carousel-slide ${idx === current ? 'active' : ''}`}
        >
          <img src={s.image} alt={s.text} />
          <div className="carousel-text">{s.text}</div>
        </div>
      ))}
      <div className="carousel-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
