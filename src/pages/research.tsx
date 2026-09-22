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
        url: entry.href,
        datePublished: entry.year,
        isPartOf: entry.venue,
        ...(entry.image ? { image: `${SITE_URL}${entry.image}` } : {}),
        author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Junseong Lee' },
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
      socialImage="/images/projects/rad-dino-architecture-card.jpg"
      socialImageAlt="RAD-DINO with LoRA adapters: the model architecture used in the neonatal study."
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
                <a href={entry.href} target="_blank" rel="noopener noreferrer">
                  {entry.linkLabel}
                </a>
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
          </article>
        ))}
      </div>
    </ContentPageLayout>
  )
}

export default ResearchPage
