import type { NextPage } from 'next'
import ContentPageLayout from '../components/seo/ContentPageLayout'
import { projects } from '../components/ProjectsSection'
import { SITE_URL } from '../lib/site'

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
        url: project.repoLink,
      },
    })),
  }

  return (
    <ContentPageLayout
      title="Projects | Junseong Lee"
      description="Projects by Junseong Lee across software, machine learning, quantitative analysis, and applied systems work."
      canonicalPath="/projects/"
      heading="Projects"
      intro="A plain index of software and technical work, separate from the XP desktop UI, so it remains easy to read and easy to index."
      jsonLd={jsonLd}
    >
      <div className="seo-entry-list">
        {projects.map((project) => (
          <article key={project.title} className="seo-entry">
            <div className="seo-entry-header">
              <div>
                <h2>{project.title}</h2>
                <p className="seo-entry-meta">{project.category}</p>
              </div>
              <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                Open Repository
              </a>
            </div>
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
