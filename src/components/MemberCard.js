import React from "react";
import "./MemberCard.css";

function MemberCard({ member }) {
  const cardContent = (
    <>
      {member.flag_url && (
        <img src={member.flag_url} alt={member.name} className="member-flag" />
      )}

      <h3 className="member-name">{member.name}</h3>
    </>
  );

  return (
    <div className="member-card">
      {member.wikipage ? (
        <a
          href={member.wikipage}
          target="_blank"
          rel="noreferrer"
          className="member-card-link"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
}

export default MemberCard;
