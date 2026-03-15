import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { fetchSlides } from "../api/slides";
import "./Home.css";

function Home() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function load() {
      const s = await fetchSlides();
      setSlides(s.slides || []);
    }
    load();
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .scale-in-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="page-section hero fade-in-on-scroll">
        <h1>Welcome to the Nova Associate Micronational Organisation</h1>
        <p className="lead">
          NAMO is a forward‑thinking alliance of micronations dedicated to
          diplomacy, stability, and collaborative development. We empower
          emerging states with the tools, frameworks, and community needed to
          grow responsibly and sustainably.
        </p>
      </section>

      {/* Carousel */}
      <div className="scale-in-on-scroll">
        <Carousel slides={slides} />
      </div>

      {/* Mission Section */}
      <section className="page-section mission fade-in-on-scroll">
        <h2>Our Mission</h2>
        <p>
          We exist to strengthen the global micronational community through
          shared governance, transparent cooperation, and a commitment to
          peaceful international engagement. NAMO provides a structured
          environment where member states can collaborate, innovate, and
          represent themselves with legitimacy.
        </p>
        <ul>
          <li>Promoting diplomatic dialogue and conflict‑free resolution</li>
          <li>Supporting constitutional development and institutional growth</li>
          <li>Facilitating cultural exchange and intermicronational projects</li>
          <li>Providing technical infrastructure for modern governance</li>
        </ul>
      </section>

      {/* What We Do */}
      <section className="page-section what-we-do fade-in-on-scroll">
        <h2>What We Do</h2>
        <p>
          NAMO operates as a central hub for micronational cooperation. Our
          initiatives span governance, diplomacy, technology, and community
          development—ensuring that every member state has the opportunity to
          thrive.
        </p>

        <div className="features-grid">
          <div className="feature slide-in-left-on-scroll">
            <h3>Diplomacy & Mediation</h3>
            <p>
              We maintain a neutral diplomatic environment where states can
              negotiate, resolve disputes, and build long‑term alliances.
            </p>
          </div>

          <div className="feature slide-in-right-on-scroll">
            <h3>Governance Support</h3>
            <p>
              From constitutional drafting to institutional design, NAMO helps
              member states establish stable, functional systems of government.
            </p>
          </div>

          <div className="feature slide-in-left-on-scroll">
            <h3>Technical Infrastructure</h3>
            <p>
              We provide modern digital tools—including secure communication,
              documentation systems, and app‑based governance platforms—to
              support efficient administration.
            </p>
          </div>

          <div className="feature slide-in-right-on-scroll">
            <h3>Community & Collaboration</h3>
            <p>
              Our organisation fosters a vibrant community of leaders,
              innovators, and creators working together on shared projects and
              cultural initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="page-section cta fade-in-on-scroll">
        <h2>Join the Future of Micronational Cooperation</h2>
        <p>
          Whether you're an established micronation or a newly‑formed state,
          NAMO offers a platform to grow, collaborate, and be recognised within
          a supportive international community.
        </p>
        <a className="cta-button" href="/join">
          Learn More
        </a>
      </section>
    </div>
  );
}

export default Home;
