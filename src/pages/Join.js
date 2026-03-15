import React from "react";
import "./Join.css";

function Join() {
  return (
    <div className="page join-page">
      <section className="page-section join-hero">
        <h1>Join NAMO</h1>
        <p className="join-subtitle">
          Become part of the Nova Associate Micronational Organisation
        </p>
      </section>

      <section className="page-section join-criteria">
        <h2>Membership Criteria</h2>
        <p>
          To join NAMO, your micronation must meet the following requirements:
        </p>

        <div className="criteria-list">
          <div className="criteria-item">
            <h3>1. Sovereignty</h3>
            <p>
              Your micronation must demonstrate clear sovereignty and independence
              from any macronation, with established borders and governance.
            </p>
          </div>

          <div className="criteria-item">
            <h3>2. Constitution</h3>
            <p>
              A written constitution or set of foundational laws that outline
              your government's structure, powers, and citizen rights.
            </p>
          </div>

          <div className="criteria-item">
            <h3>3. Active Governance</h3>
            <p>
              Demonstrated active governance with regular activities, citizen
              engagement, and ongoing development of your micronation.
            </p>
          </div>

          <div className="criteria-item">
            <h3>4. Peaceful Intent</h3>
            <p>
              Commitment to peaceful international relations and adherence to
              NAMO's principles of diplomacy and cooperation.
            </p>
          </div>

          <div className="criteria-item">
            <h3>5. Online Presence</h3>
            <p>
              A functional website or online platform where your micronation's
              activities and governance can be observed. Examples include a wiki, blog, or social media presence.
            </p>   
          </div>

          <div className="criteria-item">
            <h3>6. Charter Adoption</h3>
            <p>
              Your micronation must adopt the NAMO Charter, agreeing to uphold the values and principles outlined therein.
            </p>
          </div>
        </div>

        <div className="join-notice">
          <p>
            <strong>Note:</strong> All applications are reviewed by the General Secretary.
            Meeting these criteria does not guarantee acceptance, but helps ensure
            a smooth application process.
          </p>
        </div>
      </section>

      <section className="page-section join-apply">
        <h2>Ready to Apply?</h2>
        <p>
          If your micronation meets these criteria, we're excited to consider
          your application for membership in NAMO.
        </p>

        <div className="apply-section">
          <a
            href="https://forms.office.com/pages/responsepage.aspx?id=oIwf0I3JCk-7KE5OpM-vn0oCVCfGDaNLkSSIrbutuypUMkJCMk1JTjRWMjhWSUpaWVFUOEhJQjkwRy4u&route=shorturl"
            target="_blank"
            rel="noopener noreferrer"
            className="apply-button"
          >
            Apply for Membership
          </a>

          <p className="apply-note">
            This will open our official membership application form in a new tab.
            Please fill out all required information accurately.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Join;