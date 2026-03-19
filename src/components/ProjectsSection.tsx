import React, { useState } from 'react'

export interface ProjectEntry {
  title: string
  description: string
  techStack: string[]
  repoLink: string
  category: string
}

export const projects: ProjectEntry[] = [
  {
    title: "Will You Be My Valentine?",
    description: "Made a website for my partner with Bugcat-Capoo GIFs",
    techStack: ["HTML, CSS , Javascript"],
    repoLink: "https://github.com/junjslee/will-you-be-my-valentine",
    category: "Web App",
  },
  {
    title: "Web Application for 2nd Infantry Division, 8th U.S. Army",
    description: "Developed and deployed a web application for my battalion's event management system",
    techStack: ["Python (flask, smtp, pandas)", "HTML, CSS , Javascript", "AWS EC2", "Nginx", "Gunicorn"],
    repoLink: "https://github.com/junjslee/UMTauto",
    category: "Operations",
  },
  {
    title: "Heart Disease Prediction using UCI Medical Data",
    description: "Built ML models to predict heart disease. Learned about non-parametric approaches and its tradeoffs",
    techStack: ["Python", "pandas", "numpy", "matplotlib", "scikit-learn", "Statistical Modeling"],
    repoLink: "https://github.com/junjslee/ml_heart_disease_prediction",
    category: "ML",
  },
  {
    title: "Facial Recognition using PCA",
    description: "Learned how facial recognition system works through Principal Component Analysis in Linear Algebra",
    techStack: ["Dimensionality Reduction", "Linear Algebra", "Statistical Modeling"],
    repoLink: "https://github.com/junjslee/facial_recognition_pca/blob/main/PCA-FacialRecognition.ipynb",
    category: "Project",
  },
  {
    title: "S&P Index Prediction using Macroeconomic Indicators",
    description: "First project to understand statistical modeling to predict S&P Index based on 15 macroeconomic indicators I extracted from TraidingView",
    techStack: ["Time Series Analysis", "Linear Regression", "Augmented Dickey-Fuller Test", "Granger Causality Test"],
    repoLink: "https://github.com/junjslee/Predicting-S-P-500-Market-Trends-using-Macro-Economic-Indicators-with-Python/blob/master/Python-SPX%20Prediction%20using%20Macro-Economic%20Indicators.ipynb",
    category: "Finance",
  },
]

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0])

  return (
    <section className="xp-content xp-projects-section">
      <div className="xp-pane">
        <h1>Projects</h1>
        <p>
          A mix of research, applied ML, and software projects. I like building things that prove a point,
          even if the first version is rough.
        </p>
      </div>
      <div className="xp-explorer-stack">
        <div className="xp-pane xp-project-browser">
          <div className="xp-listview-header">
            <span>Name</span>
          </div>
          <div className="xp-project-list" role="listbox" aria-label="Project list">
            {projects.map((project) => (
              <button
                key={project.title}
                type="button"
                className={`xp-project-row${selectedProject.title === project.title ? ' is-selected' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <strong className="xp-project-row-title">{project.title}</strong>
              </button>
            ))}
          </div>
        </div>

        <article className="xp-pane xp-project-preview">
          <div className="xp-project-preview-header">
            <div className="xp-preview-copy">
              <span className="xp-preview-label">Selected Item</span>
              <h2>{selectedProject.title}</h2>
              <span className="xp-project-chip">{selectedProject.category}</span>
            </div>
          </div>
          <div className="xp-project-details">
            <div className="xp-project-detail-row">
              <span>Type</span>
              <strong>{selectedProject.category}</strong>
            </div>
            <div className="xp-project-detail-row">
              <span>Destination</span>
              <strong>GitHub Repository</strong>
            </div>
          </div>
          <p>{selectedProject.description}</p>
          <div className="xp-project-meta">
            <strong>Tech stack</strong>
            <ul className="xp-list">
              {selectedProject.techStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="xp-project-actions">
            <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer">
              Open on GitHub
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

export default ProjectsSection
