import React, { useState } from 'react'

type AboutTab = 'general' | 'experience' | 'identity'

const experiences = [
  'AI Research Engineer Intern - Medical Imaging and Intelligent Reality Lab (MI2RL)',
  'Sergeant (E-5) / Software Engineer - 2nd Infantry Division, KATUSA',
  'Founding Developer - Scroll',
  'Quantitative Trading Analyst - Quant @ UIUC',
]

const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AboutTab>('general')
  const stopWindowFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  return (
    <section className="xp-content xp-about-system">
      <div className="xp-system-tabs" role="tablist" aria-label="About tabs">
        <button
          type="button"
          className={activeTab === 'general' ? 'is-active' : ''}
          onMouseDown={stopWindowFocus}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          type="button"
          className={activeTab === 'experience' ? 'is-active' : ''}
          onMouseDown={stopWindowFocus}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
        <button
          type="button"
          className={activeTab === 'identity' ? 'is-active' : ''}
          onMouseDown={stopWindowFocus}
          onClick={() => setActiveTab('identity')}
        >
          Identity
        </button>
      </div>

      <div className="xp-pane xp-system-panel">
        {activeTab === 'general' ? (
          <>
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

            <div className="xp-system-license">
              <span>Registered to</span>
              <strong>Junseong Lee</strong>
            </div>
          </>
        ) : null}

        {activeTab === 'experience' ? (
          <>
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

            <div className="xp-system-experience">
              <strong>Highlights</strong>
              <ul className="xp-list">
                {experiences.map((experience) => (
                  <li key={experience}>{experience}</li>
                ))}
              </ul>
            </div>
          </>
        ) : null}

        {activeTab === 'identity' ? (
          <>
            <div className="xp-system-note">
              <strong>How I work</strong>
              <p>
                I like projects that begin slightly unformed and get sharper through iteration, whether that
                means research prototypes, production cleanup, or rebuilding my own website into something
                more opinionated.
              </p>
            </div>

            <div className="xp-system-specs">
              <div className="xp-system-row">
                <span>Style</span>
                <strong>Direct, experimental, product-minded</strong>
              </div>
              <div className="xp-system-row">
                <span>Favorite build loop</span>
                <strong>Sketch, ship, adjust, tighten</strong>
              </div>
              <div className="xp-system-row">
                <span>Outside the screen</span>
                <strong>Soccer, billiards, late-night conversations</strong>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

export default AboutSection
