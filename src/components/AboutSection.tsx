import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="xp-content xp-about-section">
      <div className="xp-profile-header">
        <img src="/images/hero.jpg" alt="Junseong Lee" className="xp-profile-photo" />
        <div className="xp-profile-summary">
          <h1>Junseong Lee</h1>
          <p className="xp-lead">
            AI research engineer, software builder, and student focused on computer vision, product-minded
            engineering, and quantitative thinking.
          </p>
          <p>
            I study Data Science, Finance, and Computer Science at UIUC and like building software that
            turns fuzzy ideas into something people can actually use.
          </p>
        </div>
      </div>

      <div className="xp-info-grid">
        <div className="xp-pane">
          <h2>Quick Facts</h2>
          <ul className="xp-list">
            <li><strong>Location:</strong> Champaign, IL</li>
            <li><strong>Born:</strong> 2002</li>
            <li><strong>Background:</strong> Korean</li>
            <li><strong>Interests:</strong> Soccer, billiards, basketball, poker</li>
          </ul>
        </div>

        <div className="xp-pane">
          <h2>Currently</h2>
          <p>
            Researching at{' '}
            <a href="https://www.mi2rl.co/" target="_blank" rel="noopener noreferrer">
              Medical Imaging and Intelligent Reality Lab
            </a>
            {' '}with collaboration at{' '}
            <a href="https://eng.amc.seoul.kr/gb/lang/main.do" target="_blank" rel="noopener noreferrer">
              Asan Medical Center
            </a>
            .
          </p>
          <p>
            My work tends to sit between research and production: take something useful, make it cleaner,
            faster, and easier for someone else to trust.
          </p>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;
