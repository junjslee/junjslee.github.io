import React from 'react'

interface Project {
  title: string;
  description: string;
  techStack: string[];
  repoLink: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="xp-project-card">
      <img src={project.image} alt={project.title} className="xp-project-image" />
      <div className="xp-project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="xp-project-stack">
          <strong>Tech stack:</strong> {project.techStack.join(', ')}
        </p>
        <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
          Open on GitHub
        </a>
      </div>
    </article>
  )
}

export default ProjectCard
