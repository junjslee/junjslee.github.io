import React, { useState } from 'react'

interface ResearchEntry {
  title: string
  year: string
  href: string
  kind: string
  venue: string
  summary: string
  linkLabel: string
}

export const researchEntries: ResearchEntry[] = [
  {
    title: 'Official Codebase for the Neonatal Human-AI Interaction Study',
    year: '2025',
    href: 'https://github.com/junjslee/neonatal-ai-reliability',
    kind: 'First-Author Research',
    venue: 'Under consideration at a peer-reviewed journal',
    summary: 'First-author research on neonatal human-AI interaction and reliability, with the public repository serving as the official codebase for the study.',
    linkLabel: 'Open Repository',
  },
  {
    title: 'Automated landmark detection and view positioning assessment of shoulder grashey view radiographs using cascade deep learning: A dual-center validation study',
    year: '2026',
    href: 'https://aapm.onlinelibrary.wiley.com/doi/10.1002/mp.70285',
    kind: 'Publication',
    venue: 'Medical Physics',
    summary: 'Co-authored paper on a cascade deep learning framework for shoulder Grashey radiographs that localizes anatomical landmarks and evaluates view positioning across dual-center validation data.',
    linkLabel: 'Open Publication',
  },
]

const ResearchSection: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState(researchEntries[0])

  return (
    <section className="xp-content xp-research-section">
      <div className="xp-pane">
        <h1>Research</h1>
        <p>
          Work across repositories, collaborations, and publications. This tab is structured so new papers
          can be added without reworking the UI.
        </p>
      </div>
      <div className="xp-explorer-stack">
        <div className="xp-pane xp-research-browser">
          <div className="xp-listview-header">
            <span>Research</span>
          </div>
          <div className="xp-project-list xp-research-list" role="listbox" aria-label="Research list">
            {researchEntries.map((entry) => (
              <button
                key={`${entry.title}-${entry.year}`}
                type="button"
                className={`xp-project-row xp-research-row${selectedEntry.title === entry.title ? ' is-selected' : ''}`}
                onClick={() => setSelectedEntry(entry)}
              >
                <span className="xp-project-row-copy">
                  <strong className="xp-project-row-title">{entry.title}</strong>
                  <span className="xp-research-row-meta">
                    <span className="xp-project-row-kind">{entry.year}</span>
                    <span className="xp-project-row-kind">{entry.venue}</span>
                    <span className="xp-project-row-kind">{entry.kind}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <article className="xp-pane xp-research-preview">
          <div className="xp-project-preview-header">
            <div className="xp-preview-copy">
              <span className="xp-preview-label">Selected Item</span>
              <h2>{selectedEntry.title}</h2>
              <div className="xp-research-chips">
                <span className="xp-project-chip">{selectedEntry.year}</span>
                <span className="xp-project-chip">{selectedEntry.venue}</span>
                <span className="xp-project-chip">{selectedEntry.kind}</span>
              </div>
            </div>
          </div>
          <p>{selectedEntry.summary}</p>
          <div className="xp-project-actions">
            <a href={selectedEntry.href} target="_blank" rel="noopener noreferrer">
              {selectedEntry.linkLabel}
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

export default ResearchSection
