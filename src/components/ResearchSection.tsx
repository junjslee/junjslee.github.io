import React, { useState } from 'react'

export interface ResearchEntry {
  title: string
  year: string
  /** Omitted when nothing public exists to link to yet. */
  href?: string
  kind: string
  venue: string
  summary: string
  linkLabel: string
  liveLink?: string
  liveLabel?: string
  /** Shown beside the live link when it is not openly reachable. */
  liveNote?: string
  /** Papers that came out of one line of work. */
  outputs?: Array<{ title: string; venue: string }>
  authors?: string
  image?: string
  imageAlt?: string
}

export const researchEntries: ResearchEntry[] = [
  {
    title: 'BiomeTrail: a provenance-gated biomedical knowledge graph',
    year: '2026',
    kind: 'First-Author Research',
    venue: 'NeurIPS 2026 Workshops (under review)',
    summary:
      'A knowledge graph of the microbe to host interface — microbe, metabolite, receptor, pathway, outcome — built at LMIC (Massachusetts General Hospital / Harvard Medical School). Every edge keeps the source sentence that justified it, with its PMID and both endpoints grounded to standard ontologies, so a claim can be checked link by link rather than taken on trust. Two NeurIPS 2026 workshop papers came out of this work, with a journal manuscript in preparation.',
    outputs: [
      {
        title: 'Demo: Preserving Evidence, Context, and Disagreement in Mechanistic Microbe-Host Graph QA',
        venue: 'NeurIPS 2026 Workshop GenAI4Health · Demonstration Paper Track',
      },
      {
        title: 'Bounded Verification and Asymmetric Recoverability in Biomedical Knowledge-Graph Construction',
        venue: 'NeurIPS 2026 Workshop AI4Science',
      },
    ],
    authors:
      'Junseong Lee, Young-Tak Kim, Hyunji Kim, Niranjan Kulkarni, Emma Skybova, Victoria Kim, Jonathan Sheejin Choi, Synho Do',
    linkLabel: 'Open BiomeTrail',
    liveLink: 'https://biometrail.com',
    liveLabel: 'Open BiomeTrail',
    liveNote: 'Private beta — access required',
    image: '/images/projects/biometrail.webp',
    imageAlt:
      'BiomeTrail interface: a 3D typed knowledge graph on the left, and an evidence panel on the right showing a microbe-produces-metabolite edge with its grounded identifiers, verbatim source sentence, and PubMed citation.',
  },
  {
    title: 'Expertise modulates automation bias and sentinel behavior in human-AI collaborative diagnosis of neonatal pneumoperitoneum',
    year: '2025',
    href: 'https://github.com/junjslee/neonatal-ai-reliability',
    kind: 'First-Author Research',
    venue: 'npj Digital Medicine (under revision)',
    summary:
      'A multi-reader, multi-case crossover study of how radiologists of differing expertise respond to a reliable versus an error-injected AI collaborator on cross-table lateral radiographs. The model is RAD-DINO (DINOv2 ViT-B/14) adapted with LoRA adapters (r=12) on the frozen backbone plus a trainable classification head, reaching AUC 0.948 on multi-center external validation. The public repository is the official codebase for the study, and an open educational sandbox lets students and residents practice AI-collaborative cognitive conflicts. Presented at RSNA 2025.',
    linkLabel: 'Open Repository',
    liveLink: 'https://neonatal-ai-sandbox.pages.dev/',
    liveLabel: 'Open Sandbox',
    image: '/images/projects/rad-dino-architecture.webp',
    imageAlt:
      'Model architecture: a lateral-view abdominal radiograph is patch-embedded into a frozen RAD-DINO (DINOv2 ViT-B/14) backbone whose transformer blocks carry trainable LoRA adapters on the query and value projections; the CLS token feeds a trainable two-layer classification head ending in a sigmoid with a Youden threshold.',
  },
  {
    title: 'Automated landmark detection and view positioning assessment of shoulder Grashey view radiographs using cascade deep learning: A dual-center validation study',
    year: '2026',
    href: 'https://aapm.onlinelibrary.wiley.com/doi/10.1002/mp.70285',
    kind: 'Publication',
    venue: 'Medical Physics',
    summary:
      'Co-authored paper on a cascade deep learning framework for shoulder Grashey radiographs. Stage 1 uses RetinaNet with a ResNet101 backbone to propose 14 anatomical regions of interest; stage 2 runs a U-Net with an EfficientNet-Lite4 backbone and SCSE decoder blocks over each ROI, accumulating 14 landmark predictions that are then used to score view positioning. Validated across two centers.',
    linkLabel: 'Open Publication',
    image: '/images/projects/shoulder-cascade-architecture.webp',
    imageAlt:
      'Two-stage cascade: stage 1 is a RetinaNet with a ResNet101 backbone detecting 14 regions of interest on a shoulder radiograph; stage 2 runs a U-Net with an EfficientNet-Lite4 backbone and SCSE decoder blocks per ROI, accumulating 14 landmark predictions.',
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
                  <strong className="xp-project-row-title" title={entry.title}>
                    {entry.title}
                  </strong>
                  <span className="xp-research-row-meta">
                    <span className="xp-project-row-kind">{entry.year}</span>
                    <span className="xp-project-row-kind">{entry.venue}</span>
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
          {selectedEntry.image ? (
            <figure className="xp-preview-figure">
              <a href={selectedEntry.image} target="_blank" rel="noopener noreferrer">
                <img
                  src={selectedEntry.image}
                  alt={selectedEntry.imageAlt ?? selectedEntry.title}
                  loading="lazy"
                />
              </a>
              <figcaption>Model architecture — click to view full size</figcaption>
            </figure>
          ) : null}
          <p>{selectedEntry.summary}</p>
          {selectedEntry.outputs ? (
            <div className="xp-project-meta">
              <strong>Papers from this work</strong>
              <ul className="xp-list">
                {selectedEntry.outputs.map((output) => (
                  <li key={output.title}>
                    {output.title}
                    <span className="xp-subtle"> — {output.venue}</span>
                  </li>
                ))}
              </ul>
              {selectedEntry.authors ? <p className="xp-subtle">{selectedEntry.authors}</p> : null}
            </div>
          ) : null}
          <div className="xp-project-actions">
            {selectedEntry.liveLink ? (
              <a href={selectedEntry.liveLink} target="_blank" rel="noopener noreferrer">
                {selectedEntry.liveLabel ?? 'Open Live Site'}
              </a>
            ) : null}
            {selectedEntry.href ? (
              <a href={selectedEntry.href} target="_blank" rel="noopener noreferrer">
                {selectedEntry.linkLabel}
              </a>
            ) : null}
            {selectedEntry.liveNote ? (
              <span className="xp-action-note">{selectedEntry.liveNote}</span>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  )
}

export default ResearchSection
