import React, { useEffect, useState } from 'react';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [observers, setObservers] = useState([]);
  const [former, setFormer] = useState([]);

  useEffect(() => {
    fetch('/members.json')
      .then((r) => r.json())
      .then((data) => {
        setMembers(data.members || []);
        setObservers(data.observers || []);
        setFormer(data.former || []);
      })
      .catch(console.error);
  }, []);

  const renderList = (list) => (
    <ul className="members-list">
      {list.map((m, idx) => (
        <li key={idx} className="member-item">
          {m.flag_url && (
            <img src={m.flag_url} alt={`${m.name} flag`} className="member-flag" />
          )}
          {m.wikipage ? (
            <a href={m.wikipage} target="_blank" rel="noopener noreferrer">
              {m.name}
            </a>
          ) : (
            <span>{m.name}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="main-content">
      <h1>Members</h1>
      {renderList(members)}
      {observers.length > 0 && (
        <>
          <h2>Observers</h2>
          {renderList(observers)}
        </>
      )}
      {former.length > 0 && (
        <>
          <h2>Former Members</h2>
          {renderList(former)}
        </>
      )}
    </div>
  );
}
