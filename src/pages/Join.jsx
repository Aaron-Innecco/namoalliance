import React from 'react';

export default function Join() {
  return (
    <div className="main-content">
      <h1>Join the Nova Associate Micronational Organisation!</h1>
      <p>
        Joining the Nova Associate Micronational Organisation is very simple,
        however your micronation must meet the following criteria
      </p>
      <ul>
        <li>You must have a MicroWiki OR NAMOwiki Page.</li>
        <li>You must not be far-right.</li>
        <li>
          You must be active on MicroWiki or NAMOwiki, if you aren't active,
          you will be dropped down to observer status unless you have a viable
          excuse.
        </li>
      </ul>
      <br />
      <a
        href="https://forms.office.com/e/VsYCD8Y4CJ"
        className="button-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply
      </a>
    </div>
  );
}
