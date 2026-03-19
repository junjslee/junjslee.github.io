import type { NextPage } from 'next'
import ContentPageLayout from '../components/seo/ContentPageLayout'
import { researchEntries } from '../components/ResearchSection'

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
      },
    })),
  }

  return (
    <ContentPageLayout
      title="Research | Junseong Lee"
      description="Research by Junseong Lee, including publications, repositories, and ongoing work in medical AI and human-AI interaction."
      canonicalPath="/research/"
      heading="Research"
      intro="A crawlable index of research work, papers, and public repositories."
      jsonLd={jsonLd}
    >
      <div className="seo-entry-list">
        {researchEntries.map((entry) => (
          <article key={`${entry.title}-${entry.year}`} className="seo-entry">
            <div className="seo-entry-header">
              <div>
                <h2>{entry.title}</h2>
                <p className="seo-entry-meta">
                  {entry.year} · {entry.venue} · {entry.kind}
                </p>
              </div>
              <a href={entry.href} target="_blank" rel="noopener noreferrer">
                {entry.linkLabel}
              </a>
            </div>
            <p>{entry.summary}</p>
          </article>
        ))}
      </div>
    </ContentPageLayout>
  )
}

export default ResearchPage
