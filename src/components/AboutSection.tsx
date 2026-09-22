import React, { useState } from 'react'

type AboutTab = 'general' | 'experience' | 'mindset'

interface AboutSectionProps {
  onOpenHome?: () => void
}

interface Role {
  title: string
  org: string
  orgHref?: string
  note?: string
  dates: string
  location: string
  bullets: string[]
}

const education = {
  school: 'University of Illinois Urbana-Champaign',
  degree: 'B.S. in Data Science and Finance · Computer Science minor',
  dates: 'Expected May 2027',
  detail: 'GPA 3.77 / 4.00',
}

const roles: Role[] = [
  {
    title: 'Research Intern',
    org: 'LMIC, Massachusetts General Hospital & Harvard Medical School',
    orgHref: 'https://lmic.mgh.harvard.edu/',
    note: 'PI: Synho Do',
    dates: 'May 2026 – Aug 2026',
    location: 'Boston, MA',
    bullets: [
      'Architecting BiomeTrail, a provenance-gated biomedical knowledge graph mining microbe–metabolite–receptor–disease mechanistic chains from 240K+ papers, grounding entities to standard ontologies (ChEBI, MONDO, NCBITaxon, UniProt) with per-edge PMID and verbatim-sentence provenance.',
      'Built a cost-optimized two-stage pipeline: a deterministic NER and entity-grounding stage (2.5M-surface automaton) narrows 240K papers to an 8.5M candidate-relation pool, then targeted LLM relation extraction verifies each edge against its source sentence. Served via Neo4j and an interactive 3D graph explorer.',
      'Enforced a type-safe ontology schema and LLM-based grounding validation under a measurement-first workflow, with independent precision audits and held-out gold sets gating each pipeline stage before paid scale-up.',
    ],
  },
  {
    title: 'AI Research Engineer Intern',
    org: 'MI2RL, Asan Medical Center',
    orgHref: 'https://www.mi2rl.co/',
    note: 'PI: Namkug Kim',
    dates: 'Feb 2025 – Feb 2026',
    location: 'Seoul, South Korea',
    bullets: [
      'First-authored a human–AI interaction study on neonatal pneumoperitoneum diagnosis (RAD-DINO fine-tuned with LoRA; AUC 0.948 on multi-center external validation), designing a multi-reader crossover with an error-injected model to quantify automation bias. Presented at RSNA 2025; manuscript under revision at npj Digital Medicine.',
      'First-authored a narrative review formalizing behavioral acceptability and role separation for clinical AI (under review at npj Digital Medicine).',
      'Developed and launched an open-source educational sandbox for medical students and residents to practice AI-collaborative cognitive conflicts.',
      'Engineered an imbalance-aware batch sampler for the vision-transformer classifier that improved learning of rare disease patterns, increasing sensitivity by 23% at matched specificity.',
    ],
  },
  {
    title: 'Undergraduate Researcher',
    org: 'MONET Lab, UIUC',
    orgHref: 'https://monet.cs.illinois.edu/',
    note: 'PI: Klara Nahrstedt',
    dates: 'Dec 2025 – May 2026',
    location: 'Urbana, IL',
    bullets: [
      'Designed Gaze-VQA, a benchmark probing vision-language models’ understanding of human gaze across gaze target recognition, relative orientation reasoning, cross-view visibility estimation, and viewpoint-based accessibility.',
      'Generated the benchmark dataset from MVGT and built the evaluation harness, combining standard text metrics with an LLM-as-a-Judge scorer for semantic correctness beyond exact match.',
    ],
  },
  {
    title: 'Squad Leader and Software Engineer',
    org: '8th United States Army (2ID KATUSA)',
    dates: 'Oct 2023 – Apr 2025',
    location: 'Camp Humphreys, South Korea',
    bullets: [
      'Awarded the Army Commendation Medal for building and deploying an event-management web app (Python, Flask, OAuth2, Google API, AWS EC2, Nginx, Gunicorn) processing 800+ participants across 32 events, cutting manual reconciliation by 75% and data-entry errors by 95%.',
      'Provided network and systems support for the technology unit during field exercises; managed 12 soldiers and served as liaison between U.S. and Korean command during joint trainings.',
    ],
  },
]

const recognitions = [
  { name: 'Fred S. Bailey Scholarship', year: '2026', detail: '$3,000 for academic merit and leadership potential · YMCA / UIUC' },
  { name: 'Woojin Scholarship', year: '2026', detail: 'National recipient ($1,500) for excellence in STEM and community service · KSEA' },
  { name: 'Army Commendation Medal', year: '2025', detail: 'Proactive efforts to streamline battalion workflow · 2ID, 8th U.S. Army' },
  { name: 'Army Achievement Medal', year: '2024', detail: 'Outstanding performance, Freedom Shield field exercise · 2ID, 8th U.S. Army' },
]

const skills = [
  { group: 'Languages', items: 'Python, C++, SQL, Java, Bash, Git' },
  { group: 'AI / ML', items: 'PyTorch, CUDA, LangChain, MONAI, scikit-learn, HuggingFace, OpenCV, Ollama' },
  { group: 'Tools & Platforms', items: 'Docker, Slurm, AWS, Neo4j, Linux, Cloudflare' },
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
          className={activeTab === 'mindset' ? 'is-active' : ''}
          onMouseDown={stopWindowFocus}
          onClick={() => setActiveTab('mindset')}
        >
          Mindset
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
                  Understanding how linear models solve non-linear problems. Interested in statistical
                  learning, system design, and medical AI.
                </p>
                <p className="xp-subtle">Peeling the onions. Always peeling the onions... :3</p>
              </div>
            </div>

            <div className="xp-system-specs">
              <div className="xp-system-row">
                <span>Most recently</span>
                <strong>Research Intern @ MGH &amp; Harvard Medical School</strong>
              </div>
              <div className="xp-system-row">
                <span>Studying</span>
                <strong>Data Science &amp; Finance @ UIUC</strong>
              </div>
              <div className="xp-system-row">
                <span>Based in</span>
                <strong>Champaign, IL</strong>
              </div>
              <div className="xp-system-row">
                <span>Grew up in</span>
                <strong>Saratoga, CA &amp;&amp; Seoul, Korea</strong>
              </div>
              <div className="xp-system-row">
                <span>Focus</span>
                <strong>&quot;what? why? how?&quot;</strong>
              </div>
              <div className="xp-system-row">
                <span>Hobbies</span>
                <strong>DJing, french billiards, gomoku, soccer, and games</strong>
              </div>
            </div>

            <div className="xp-system-license">
              <span>Registered to</span>
              <strong>Junseong Lee</strong>
            </div>

            <div className="xp-system-callout">
              <strong>Want the rest of the site?</strong>
              <p>Open `Jun Lee` for research and projects.</p>
              <div className="xp-callout-actions">
                <button type="button" onMouseDown={stopWindowFocus} onClick={onOpenHome}>
                  Open Jun Lee
                </button>
                <a href="/documents/Resume.pdf" target="_blank" rel="noopener noreferrer">
                  Open Resume.pdf
                </a>
              </div>
            </div>
          </>
        ) : null}

        {activeTab === 'experience' ? (
          <>
            <section className="xp-cv-block">
              <h2 className="xp-cv-heading">Education</h2>
              <div className="xp-cv-entry">
                <div className="xp-cv-entry-head">
                  <strong className="xp-cv-title">{education.school}</strong>
                  <span className="xp-cv-dates">{education.dates}</span>
                </div>
                <div className="xp-cv-entry-sub">
                  <span className="xp-cv-org">{education.degree}</span>
                  <span className="xp-cv-where">{education.detail}</span>
                </div>
              </div>
            </section>

            <section className="xp-cv-block">
              <h2 className="xp-cv-heading">Experience</h2>
              <ol className="xp-cv-list">
                {roles.map((role) => (
                  <li key={`${role.title}-${role.org}`} className="xp-cv-entry">
                    <div className="xp-cv-entry-head">
                      <strong className="xp-cv-title">{role.title}</strong>
                      <span className="xp-cv-dates">{role.dates}</span>
                    </div>
                    <div className="xp-cv-entry-sub">
                      <span className="xp-cv-org">
                        {role.orgHref ? (
                          <a href={role.orgHref} target="_blank" rel="noopener noreferrer">
                            {role.org}
                          </a>
                        ) : (
                          role.org
                        )}
                        {role.note ? <span className="xp-cv-note"> ({role.note})</span> : null}
                      </span>
                      <span className="xp-cv-where">{role.location}</span>
                    </div>
                    <ul className="xp-cv-bullets">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section className="xp-cv-block">
              <h2 className="xp-cv-heading">Recognitions</h2>
              <ul className="xp-cv-list xp-cv-list-compact">
                {recognitions.map((item) => (
                  <li key={item.name} className="xp-cv-entry">
                    <div className="xp-cv-entry-head">
                      <strong className="xp-cv-title">{item.name}</strong>
                      <span className="xp-cv-dates">{item.year}</span>
                    </div>
                    <div className="xp-cv-entry-sub">
                      <span className="xp-cv-org">{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="xp-cv-block">
              <h2 className="xp-cv-heading">Key skills</h2>
              <div className="xp-system-specs">
                {skills.map((skill) => (
                  <div key={skill.group} className="xp-system-row">
                    <span>{skill.group}</span>
                    <strong>{skill.items}</strong>
                  </div>
                ))}
              </div>
            </section>

            <div className="xp-system-callout">
              <strong>Full record</strong>
              <p>Publications, presentations, and the complete history live in the resume.</p>
              <div className="xp-callout-actions">
                <a href="/documents/Resume.pdf" target="_blank" rel="noopener noreferrer">
                  Open Resume.pdf
                </a>
              </div>
            </div>
          </>
        ) : null}

        {activeTab === 'mindset' ? (
          <>
            <div className="xp-system-note">
              <strong>How I think and work</strong>
              <p>
                I like projects that begin slightly unformed and get sharper through iteration, whether that
                means research prototypes, production cleanup, or learning something new.
              </p>
              <p className="xp-motto">&quot;Discipline. Transparency. Curiosity.&quot;</p>
              <p>
                I like to understand the `why` and `how` of things, and then make something impactful out of
                it.
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
                <strong>taking the edge off</strong>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

export default AboutSection
