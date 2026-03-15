import React, { useEffect, useState } from "react";
import "./Carousel.css";

function Carousel({ slides }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides]);

  if (!slides || slides.length === 0) {
    return (
      <div className="carousel-empty">
        No slides configured yet.
      </div>
    );
  }

  const slide = slides[index];

  const prev = () => {
    setIndex(i => (i - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setIndex(i => (i + 1) % slides.length);
  };

  return (
    <div className="carousel-root">
      <button className="carousel-arrow left" onClick={prev}>‹</button>

      <div className="carousel-track">
        <div key={index} className="carousel-slide">
          <div className="carousel-image-wrap">
            <img src={slide.image} alt={slide.caption} className="carousel-image" />
          </div>
          <div className="carousel-caption">{slide.caption}</div>
          <div className="carousel-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={"carousel-dot" + (i === index ? " active" : "")}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <button className="carousel-arrow right" onClick={next}>›</button>
    </div>
  );
}

export default Carousel;
