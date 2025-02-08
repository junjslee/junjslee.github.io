// src/components/ProjectCard.tsx
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
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded overflow-hidden">
      flex flex-col items-center justify-center h-screen bg-cover bg-center text-center px-4
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <strong>Tech Stack:</strong> {project.techStack.join(', ')}
        </p>
        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
