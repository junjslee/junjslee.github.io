import type { NextPage } from 'next'
import ContentPageLayout from '../components/seo/ContentPageLayout'
import { projects } from '../components/ProjectsSection'
import { breadcrumbJsonLd, SITE_URL } from '../lib/site'

const ProjectsPage: NextPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Junseong Lee',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.description,
        codeRepository: project.repoLink,
        programmingLanguage: project.techStack.join(', '),
        url: project.repoLink ?? project.liveLink,
        ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
        author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Junseong Lee' },
      },
    })),
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects/' },
  ])

  return (
    <ContentPageLayout
      title="Projects — Junseong Lee"
      description="Projects by Junseong Lee across software, machine learning, quantitative analysis, and applied systems work."
      canonicalPath="/projects/"
      heading="Projects"
      intro="A plain index of software and technical work, separate from the XP desktop UI, so it remains easy to read and easy to index."
      socialImage="/images/projects/biometrail-card.jpg"
      socialImageAlt="The BiomeTrail knowledge-graph interface showing an edge and its source evidence."
      jsonLd={[jsonLd, breadcrumbs]}
    >
      <div className="seo-entry-list">
        {projects.map((project) => (
          <article key={project.title} className="seo-entry">
            <div className="seo-entry-header">
              <h2>{project.title}</h2>
              <p className="seo-entry-meta">{project.category}</p>
              <div className="seo-entry-links">
                {project.liveLink ? (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    {project.liveLabel ?? 'Live Site'}
                  </a>
                ) : null}
                {project.repoLink ? (
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    Open Repository
                  </a>
                ) : null}
                {project.liveNote ? (
                  <span className="seo-entry-note">{project.liveNote}</span>
                ) : null}
              </div>
            </div>
            {project.image ? (
              <figure className="seo-entry-figure">
                <a href={project.image} target="_blank" rel="noopener noreferrer">
                <img
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  loading="lazy"
                  width={1470}
                  height={726}
                />
                </a>
              </figure>
            ) : null}
            <p>{project.description}</p>
            <div className="seo-tag-list" aria-label="Technology stack">
              {project.techStack.map((item) => (
                <span key={`${project.title}-${item}`} className="seo-tag">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="seo-note">
        Main site experience: <a href={SITE_URL}>{SITE_URL}</a>
      </p>
    </ContentPageLayout>
  )
}

export default ProjectsPage
