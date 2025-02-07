// src/components/ProjectsSection.tsx
import React from 'react'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: "AI Model Deployment",
    description: "Developed a scalable solution for deploying AI models in production.",
    techStack: ["Python", "TensorFlow", "Docker"],
    repoLink: "https://github.com/username/ai-deployment",
    image: "/images/projects/ai.jpg",
  },
  {
    title: "Financial Dashboard",
    description: "Built a real-time financial dashboard to monitor key metrics.",
    techStack: ["React", "Next.js", "D3.js"],
    repoLink: "https://github.com/username/financial-dashboard",
    image: "/images/projects/finance.jpg",
  },
]

const ProjectsSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  )
}

export default ProjectsSection
