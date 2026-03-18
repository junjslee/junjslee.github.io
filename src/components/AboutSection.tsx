import React from 'react'

const AboutSection: React.FC = () => {
  return (
    <section className="xp-content xp-about-system">
      <div className="xp-system-tabs" role="tablist" aria-label="About tabs">
        <button type="button" className="is-active">General</button>
        <button type="button" disabled>Experience</button>
        <button type="button" disabled>Identity</button>
      </div>

      <div className="xp-pane xp-system-panel">
        <div className="xp-system-top">
          <img src="/images/hero.jpg" alt="Junseong Lee" className="xp-system-avatar" />
          <div className="xp-system-headline">
            <h1>Junseong Lee</h1>
            <p className="xp-lead">
              AI research engineer, software builder, and student focused on computer vision,
              product-minded engineering, and quantitative thinking.
            </p>
            <p>
              I study Data Science, Finance, and Computer Science at UIUC and like building software
              that turns fuzzy ideas into something people can actually use.
            </p>
          </div>
        </div>

        <div className="xp-system-specs">
          <div className="xp-system-row">
            <span>Location</span>
            <strong>Champaign, IL</strong>
          </div>
          <div className="xp-system-row">
            <span>Background</span>
            <strong>Korean</strong>
          </div>
          <div className="xp-system-row">
            <span>Focus</span>
            <strong>AI, vision, product-minded software</strong>
          </div>
          <div className="xp-system-row">
            <span>Interests</span>
            <strong>Soccer, billiards, basketball, poker</strong>
          </div>
        </div>

        <div className="xp-system-note">
          <strong>Current Status</strong>
          <p>
            Researching at{' '}
            <a href="https://www.mi2rl.co/" target="_blank" rel="noopener noreferrer">
              Medical Imaging and Intelligent Reality Lab
            </a>{' '}
            with collaboration at{' '}
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

        <div className="xp-system-license">
          <span>Registered to</span>
          <strong>Junseong Lee</strong>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
