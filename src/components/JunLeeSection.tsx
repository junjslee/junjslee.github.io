import React, { useMemo, useState } from 'react'

function IEToolbar({ url, onGo }: { url: string; onGo: () => void }): React.ReactElement {
  return (
    <div className="xp-ie-toolbar">
      <button type="button" className="xp-ie-nav-btn" disabled aria-label="Back">&#9668;</button>
      <button type="button" className="xp-ie-nav-btn" disabled aria-label="Forward">&#9658;</button>
      <div className="xp-ie-address-row">
        <span className="xp-ie-address-label">Address</span>
        <div className="xp-ie-address-bar">
          <span className="xp-ie-url">{url}</span>
        </div>
        <button type="button" className="xp-ie-go-btn" onClick={onGo}>Go</button>
      </div>
    </div>
  )
}

type KindVisual = { icon: string; accent: string }

function getKindVisual(folder: FolderId, kind: string): KindVisual {
  if (folder === 'writing') return { icon: '✎', accent: '#c46b2a' }
  if (folder === 'research') return { icon: '◈', accent: '#2b7a7a' }
  const k = kind.toLowerCase()
  if (k.includes('agent')) return { icon: '⌬', accent: '#6e3bd8' }
  if (k.includes('web')) return { icon: '◉', accent: '#d63a7a' }
  if (k.includes('ml')) return { icon: '∿', accent: '#1f8a4a' }
  if (k.includes('finance')) return { icon: '$', accent: '#1e6db0' }
  if (k.includes('operation')) return { icon: '⚙', accent: '#5b6472' }
  return { icon: '▣', accent: '#546b8a' }
}
import type { BlogPost } from './BlogSection'
import { projects } from './ProjectsSection'
import { researchEntries } from './ResearchSection'

type FolderId = 'projects' | 'research' | 'writing'

interface JunLeeSectionProps {
  onOpenPost?: (post: BlogPost) => void
}

interface ExplorerEntry {
  id: string
  title: string
  folder: FolderId
  kind: string
  meta: string
  summary: string
  actionLabel: string
  href?: string
  liveLink?: string
  liveLabel?: string
  liveNote?: string
  outputs?: Array<{ title: string; venue: string }>
  authors?: string
  image?: string
  imageAlt?: string
  post?: BlogPost
}

const folderCopy: Record<FolderId, { label: string; description: string }> = {
  projects: {
    label: 'Projects',
    description: 'Software and technical work.',
  },
  research: {
    label: 'Research',
    description: 'Repositories, papers, and collaborations.',
  },
  writing: {
    label: 'Writing',
    description: 'Long-form reflections and essays.',
  },
}

const explorerEntries: ExplorerEntry[] = [
  ...projects.map((project) => ({
    id: `project-${project.title}`,
    title: project.title,
    folder: 'projects' as const,
    kind: project.category,
    meta: [project.repoLink ? 'GitHub' : null, project.liveLink ? 'Live Site' : null]
      .filter(Boolean)
      .join(' + ') || 'Case study',
    summary: project.description,
    actionLabel: 'Open on GitHub',
    href: project.repoLink,
    liveLink: project.liveLink,
    liveLabel: project.liveLabel,
    liveNote: project.liveNote,
    image: project.image,
    imageAlt: project.imageAlt,
  })),
  ...researchEntries.map((entry) => ({
    id: `research-${entry.title}`,
    title: entry.title,
    folder: 'research' as const,
    kind: entry.kind,
    meta: `${entry.year} · ${entry.venue}`,
    summary: entry.summary,
    actionLabel: entry.linkLabel,
    href: entry.href,
    liveLink: entry.liveLink,
    liveLabel: entry.liveLabel,
    liveNote: entry.liveNote,
    outputs: entry.outputs,
    authors: entry.authors,
    image: entry.image,
    imageAlt: entry.imageAlt,
  })),
]

/* Writing is archived: the /writing pages stay live and indexed, but the
   folder is no longer surfaced in the shell. */
const folderOrder: FolderId[] = ['research', 'projects']

const JunLeeSection: React.FC<JunLeeSectionProps> = ({ onOpenPost }) => {
  const [activeFolder, setActiveFolder] = useState<FolderId>('research')
  const visibleEntries = useMemo(
    () => explorerEntries.filter((entry) => entry.folder === activeFolder),
    [activeFolder]
  )
  const [selectedEntryId, setSelectedEntryId] = useState(visibleEntries[0]?.id ?? explorerEntries[0]?.id ?? '')

  const selectedEntry =
    visibleEntries.find((entry) => entry.id === selectedEntryId) ??
    visibleEntries[0] ??
    explorerEntries[0]

  const handleFolderChange = (folder: FolderId) => {
    const nextEntries = explorerEntries.filter((entry) => entry.folder === folder)
    setActiveFolder(folder)
    setSelectedEntryId(nextEntries[0]?.id ?? '')
  }

  const openEntry = (entry: ExplorerEntry | undefined) => {
    if (!entry) {
      return
    }

    if (entry.post) {
      onOpenPost?.(entry.post)
      return
    }

    if (entry.href) {
      window.open(entry.href, '_blank', 'noopener,noreferrer')
    }
  }

  const handlePrimaryAction = () => {
    openEntry(selectedEntry)
  }

  return (
    <section className="xp-content xp-home-explorer">
      <div className="xp-pane xp-home-header">
        <h1>Notes from Junseong Lee</h1>
        <p>
          A running place for research and projects. Use the folders on the left to browse what
          I have been learning, building, and thinking through.
        </p>
      </div>

      <div className="xp-home-shell">
        <aside className="xp-pane xp-home-sidebar">
          <div className="xp-home-path">Home</div>
          <div className="xp-home-folders" role="tablist" aria-label="Junseong Lee sections">
            {folderOrder.map((folder) => (
              <button
                key={folder}
                type="button"
                className={`xp-home-folder${activeFolder === folder ? ' is-active' : ''}`}
                onClick={() => handleFolderChange(folder)}
              >
                <span className="xp-home-folder-label">{folderCopy[folder].label}</span>
                <small>{folderCopy[folder].description}</small>
              </button>
            ))}
          </div>
        </aside>

        <div className="xp-home-main-wrap">
          {activeFolder === 'projects' && (
            <IEToolbar
              url={selectedEntry?.liveLink ?? selectedEntry?.href ?? 'https://github.com/junjslee'}
              onGo={() => {
                const url = selectedEntry?.liveLink ?? selectedEntry?.href ?? 'https://github.com/junjslee'
                window.open(url, '_blank', 'noopener,noreferrer')
              }}
            />
          )}
        <div className="xp-home-main">
          <div className="xp-pane xp-home-browser">
            <div className="xp-listview-header">
              <span>Name</span>
              <span>{visibleEntries.length} item{visibleEntries.length === 1 ? '' : 's'}</span>
            </div>
            <div className="xp-home-list" role="listbox" aria-label={`${folderCopy[activeFolder].label} list`}>
              {visibleEntries.map((entry) => {
                const visual = getKindVisual(entry.folder, entry.kind)
                return (
                  <button
                    key={entry.id}
                    type="button"
                    className={`xp-home-row${selectedEntry?.id === entry.id ? ' is-selected' : ''}`}
                    onClick={() => setSelectedEntryId(entry.id)}
                    onDoubleClick={() => openEntry(entry)}
                    title={entry.title}
                  >
                    <span className="xp-home-row-title">
                      <span
                        className="xp-home-row-glyph"
                        style={{ color: visual.accent, borderColor: visual.accent }}
                        aria-hidden="true"
                      >
                        {visual.icon}
                      </span>
                      <span className="xp-home-row-copy">
                        <span className="xp-home-row-name">
                          {entry.title}
                          {entry.liveLink ? <span className="xp-home-row-live">LIVE</span> : null}
                        </span>
                        <span className="xp-home-row-kind">{entry.kind}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {selectedEntry ? (
            <article className="xp-pane xp-home-preview">
              <div className="xp-project-preview-header">
                {selectedEntry.image ? null : (
                  <div
                    className="xp-preview-hero"
                    style={{
                      background: `linear-gradient(135deg, ${getKindVisual(selectedEntry.folder, selectedEntry.kind).accent} 0%, #0f1b3a 100%)`,
                    }}
                    aria-hidden="true"
                  >
                    <span className="xp-preview-hero-glyph">
                      {getKindVisual(selectedEntry.folder, selectedEntry.kind).icon}
                    </span>
                  </div>
                )}
                <div className="xp-preview-copy">
                  <span className="xp-preview-label">{folderCopy[activeFolder].label}</span>
                  <h2>{selectedEntry.title}</h2>
                  <div className="xp-research-chips">
                    <span className="xp-project-chip">{selectedEntry.kind}</span>
                    <span className="xp-project-chip">{selectedEntry.meta}</span>
                    {selectedEntry.liveLink ? <span className="xp-project-chip is-live">LIVE</span> : null}
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
                  <figcaption>Click to view full size</figcaption>
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
                  {selectedEntry.authors ? (
                    <p className="xp-subtle">{selectedEntry.authors}</p>
                  ) : null}
                </div>
              ) : null}
              <div className="xp-project-actions">
                {selectedEntry.liveLink ? (
                  <button
                    type="button"
                    onClick={() => window.open(selectedEntry.liveLink!, '_blank', 'noopener,noreferrer')}
                  >
                    {selectedEntry.liveLabel ?? 'Open Live Site'}
                  </button>
                ) : null}
                {selectedEntry.href || selectedEntry.post ? (
                  <button type="button" onClick={handlePrimaryAction}>
                    {selectedEntry.actionLabel}
                  </button>
                ) : null}
                {selectedEntry.liveNote ? (
                  <span className="xp-action-note">{selectedEntry.liveNote}</span>
                ) : null}
              </div>
            </article>
          ) : null}
        </div>
          {activeFolder === 'projects' && (
            <div className="xp-ie-statusbar">
              <span>Done</span>
              <span>Internet</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default JunLeeSection
