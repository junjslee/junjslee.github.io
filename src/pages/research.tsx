import type { NextPage } from 'next'
import ContentPageLayout from '../components/seo/ContentPageLayout'
import { researchEntries } from '../components/ResearchSection'
import { breadcrumbJsonLd, SITE_URL } from '../lib/site'

const ResearchPage: NextPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Research by Junseong Lee',
    itemListElement: researchEntries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': entry.kind === 'Publication' ? 'ScholarlyArticle' : 'CreativeWork',
        name: entry.title,
        description: entry.summary,
        url: entry.href ?? entry.liveLink ?? `${SITE_URL}/research/`,
        datePublished: entry.year,
        isPartOf: entry.venue,
        ...(entry.image ? { image: `${SITE_URL}${entry.image}` } : {}),
        ...(entry.authors
          ? { author: entry.authors.split(', ').map((name) => ({ '@type': 'Person', name })) }
          : { author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Junseong Lee' } }),
      },
    })),
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research/' },
  ])

  return (
    <ContentPageLayout
      title="Research — Junseong Lee"
      description="Research by Junseong Lee, including publications, repositories, and ongoing work in medical AI and human-AI interaction."
      canonicalPath="/research/"
      heading="Research"
      intro="A crawlable index of research work, papers, and public repositories."
      socialImage="/images/projects/biometrail-card.jpg"
      socialImageAlt="The BiomeTrail knowledge-graph interface showing an edge and its source evidence."
      jsonLd={[jsonLd, breadcrumbs]}
    >
      <div className="seo-entry-list">
        {researchEntries.map((entry) => (
          <article key={`${entry.title}-${entry.year}`} className="seo-entry">
            <div className="seo-entry-header">
              <h2>{entry.title}</h2>
              <p className="seo-entry-meta">
                {entry.year} · {entry.venue} · {entry.kind}
              </p>
              <div className="seo-entry-links">
                {entry.liveLink ? (
                  <a href={entry.liveLink} target="_blank" rel="noopener noreferrer">
                    {entry.liveLabel ?? 'Live Site'}
                  </a>
                ) : null}
                {entry.href ? (
                  <a href={entry.href} target="_blank" rel="noopener noreferrer">
                    {entry.linkLabel}
                  </a>
                ) : null}
                {entry.liveNote ? <span className="seo-entry-note">{entry.liveNote}</span> : null}
              </div>
            </div>
            {entry.image ? (
              <figure className="seo-entry-figure">
                <a href={entry.image} target="_blank" rel="noopener noreferrer">
                <img
                  src={entry.image}
                  alt={entry.imageAlt ?? entry.title}
                  loading="lazy"
                  width={1800}
                  height={1012}
                />
                </a>
              </figure>
            ) : null}
            <p>{entry.summary}</p>
            {entry.outputs ? (
              <div className="seo-entry-outputs">
                <strong>Papers from this work</strong>
                <ul>
                  {entry.outputs.map((output) => (
                    <li key={output.title}>
                      {output.title}
                      <span className="seo-entry-note"> — {output.venue}</span>
                    </li>
                  ))}
                </ul>
                {entry.authors ? <p className="seo-entry-note">{entry.authors}</p> : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </ContentPageLayout>
  )
}

export default ResearchPage
