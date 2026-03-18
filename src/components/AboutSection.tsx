import React, { useState } from 'react'

type AboutTab = 'general' | 'experience' | 'identity'

interface AboutSectionProps {
  onOpenHome?: () => void
}

const experiences = [
  'AI Research Engineer Intern - Asan Medical Center',
  'Sergeant/Software Engineer - 8th U.S. Army (2ID KATUSA)',
  'Quantitative Trading Analyst - Quant @ UIUC',
]

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenHome }) => {
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
                  Interested in  on statistical learning, system design, hci.
                </p>
                <p>
                  B.S. in Finance and Data Science (CS minor) @ UIUC <br />
                  Peeling the onions. Always peeling the onions... :3
                </p>
              </div>
            </div>

            <div className="xp-system-specs">
              <div className="xp-system-row">
                <span>Curr Location</span>
                <strong>Champaign, IL</strong>
              </div>
              <div className="xp-system-row">
                <span>From:</span>
                <strong>Saratoga, California</strong>
              </div>
              <div className="xp-system-row">
                <span>Focus</span>
                <strong>"what? why? how?"</strong>
              </div>
              <div className="xp-system-row">
                <span>Hobbies</span>
                <strong>french billiards, gomoku, soccer, and games</strong>
              </div>
            </div>

            <div className="xp-system-license">
              <span>Registered to</span>
              <strong>Jun</strong>
            </div>

            <div className="xp-system-callout">
              <strong>Want the rest of the site?</strong>
              <p>Open `Jun Lee` for projects, research, and writing.</p>
              <button
                type="button"
                onMouseDown={stopWindowFocus}
                onClick={onOpenHome}
              >
                Open Jun Lee
              </button>
            </div>
          </>
        ) : null}

        {activeTab === 'experience' ? (
          <>
            <div className="xp-system-note">
              <strong>Current Status</strong>
              <p>
                Researching at{' '}
                <a href="https://lmic.mgh.harvard.edu/" target="_blank" rel="noopener noreferrer">
                  LMIC @ Massachusetts General Hospital, Harvard Medical School
                </a>
                ,{' '}
                <a href="https://www.mi2rl.co/" target="_blank" rel="noopener noreferrer">
                  MI2RL @ Asan Medical Center
                </a>
                , and{' '}
                <a href="https://monet.cs.illinois.edu/" target="_blank" rel="noopener noreferrer">
                  MONET Lab @ University of Illinois Urbana-Champaign
                </a>
                .
              </p>
              <p>
                "Discipline. Transparency. Curiosity." <br /> 
                I like to understand the "why" and "how" of things, and then make something impactful out of it.
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
                means research prototypes, production cleanup, or learning something new.
              </p>
            </div>

            <div className="xp-system-specs">
              <div className="xp-system-row">
                <span>Style</span>
                <strong>Direct, experimental, and curious</strong>
              </div>
              <div className="xp-system-row">
                <span>Favorite build loop</span>
                <strong>Sketch, ship, adjust, and repeat</strong>
              </div>
              <div className="xp-system-row">
                <span>Outside the screen</span>
                <strong>french billiards, gomoku, soccer, and games</strong>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

export default AboutSection
