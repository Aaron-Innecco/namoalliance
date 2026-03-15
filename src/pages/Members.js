import React, { useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";
import { fetchMembers } from "../api/members";

function Members() {
  const [data, setData] = useState({
    members: [],
    observers: [],
    former: []
  });

  useEffect(() => {
    async function load() {
      const m = await fetchMembers();
      setData({
        members: m.members || [],
        observers: m.observers || [],
        former: m.former || []
      });
    }
    load();
  }, []);

  return (
    <div className="page">
      <section className="page-section">
        <h1>Members</h1>
        <div className="grid">
          {data.members.map((m, i) => (
            <MemberCard key={i} member={m} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2>Observers</h2>
        <div className="grid">
          {data.observers.map((m, i) => (
            <MemberCard key={i} member={m} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2>Former Members</h2>
        <div className="grid">
          {data.former.map((m, i) => (
            <MemberCard key={i} member={m} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Members;
