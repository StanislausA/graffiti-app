import React from 'react';

const About = () => {
  return (
    <summary id="about-page">
        <section>
          <label htmlFor="purpose">
            Purpose...
            <p className="purpose">
              This project attempts to employ techniques/concepts/theories from
              the field of Oral History in order to contribute present-day
              digitized “archival” records for the future.
            </p>
          </label>
        </section>
        <section>
          <label htmlFor="solution">
            Solution...
            <p className="solution">
            This simple project collects user provided snippets
            (≦ 70 characters) and allows them to be viewable to users.
            </p>
          </label>
        </section>
        <section>
          <label htmlFor="challenges">
            Most interesting technical challenge...
            <ul className="challenges">
              <li>Component libraries</li>
              <li>Schema constraints</li>
            </ul>
          </label>
        </section>
    </summary>
  );
};

export default About;
