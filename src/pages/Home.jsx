import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';

export default function Home() {
  const [memberCount, setMemberCount] = useState(null);

  useEffect(() => {
    fetch('/members.json')
      .then((r) => r.json())
      .then((data) => {
        const count = Array.isArray(data.members) ? data.members.length : 0;
        setMemberCount(count);
      })
      .catch(() => setMemberCount(0));
  }, []);

  return (
    <div className="main-content">
      <Carousel />
      <h1>Nova Associate Micronational Organisation</h1>
      <p>
        The Nova Associate Micronational Organisation is currently the largest
        global Intermicronational Organisation, with a total of{' '}
        {memberCount !== null ? memberCount : '...'} members!
      </p>
      <p>
        We welcome all micronations and de-facto states from anywhere in the
        world to join our alliance!
      </p>
      <a href="/join" className="button-link">
        Join Now!
      </a>
    </div>
  );
}
