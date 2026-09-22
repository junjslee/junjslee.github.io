import React, { useState } from 'react'

export interface ProjectEntry {
  title: string
  description: string
  techStack: string[]
  category: string
  /** Omitted when the source is not public. */
  repoLink?: string
  liveLink?: string
  liveLabel?: string
  /** Shown next to the live link when it is not openly reachable. */
  liveNote?: string
  image?: string
  imageAlt?: string
}

export const projects: ProjectEntry[] = [
  {
    title: "episteme",
    description: "A cognitive-governance kernel that makes AI agents show their work before they act. Before any high-impact action (git push, deploy, migration), a deterministic hook requires the agent to commit its reasoning to disk — knowns, unknowns, assumptions, and a falsifiable disconfirmation — and refuses to proceed until the artifact is real. Verified lessons become hash-chained, context-scoped protocols that resurface at the next matching decision, so the agent gets sharper on your codebase over time. Ships as a Claude Code plugin and a Python kernel with a vendor-neutral adapter layer.",
    techStack: ["Python", "Claude Code plugin (hooks / skills / agents)", "TypeScript", "Next.js", "Vercel"],
    repoLink: "https://github.com/junjslee/episteme",
    liveLink: "https://www.epistemekernel.com/",
    category: "Agent OS",
  },
  {
    title: "Gaze-VQA: Multi-View Spatial Reasoning Benchmark",
    description: "A benchmark probing how well vision-language models understand human gaze, across four tasks: gaze target recognition, relative orientation reasoning, cross-view visibility estimation, and viewpoint-based accessibility. Built at MONET Lab (UIUC) from the MVGT dataset, with an evaluation harness that combines standard text metrics with an LLM-as-a-judge scorer so semantic correctness counts for more than exact match.",
    techStack: ["Python", "Vision-Language Models", "Benchmark design", "LLM-as-a-Judge"],
    category: "Benchmark",
  },
  {
    title: "Web Application for 2nd Infantry Division, 8th U.S. Army",
    description: "An event-management web application built and deployed for my battalion, processing 800+ participants across 32 events. It cut manual reconciliation by 75% and data-entry errors by 95%, and earned an Army Commendation Medal.",
    techStack: ["Python (Flask, SMTP, pandas)", "HTML, CSS, JavaScript", "OAuth2", "AWS EC2", "Nginx", "Gunicorn"],
    repoLink: "https://github.com/junjslee/UMTauto",
    category: "Operations",
  },
  {
    title: "Heart Disease Prediction using UCI Medical Data",
    description: "Built ML models to predict heart disease. Learned about non-parametric approaches and their tradeoffs.",
    techStack: ["Python", "pandas", "numpy", "matplotlib", "scikit-learn", "Statistical Modeling"],
    repoLink: "https://github.com/junjslee/ml_heart_disease_prediction",
    category: "ML",
  },
  {
    title: "Facial Recognition using PCA",
    description: "Learned how facial recognition systems work through Principal Component Analysis in Linear Algebra.",
    techStack: ["Dimensionality Reduction", "Linear Algebra", "Statistical Modeling"],
    repoLink: "https://github.com/junjslee/facial_recognition_pca/blob/main/PCA-FacialRecognition.ipynb",
    category: "Project",
  },
  {
    title: "S&P Index Prediction using Macroeconomic Indicators",
    description: "First project to understand statistical modeling, predicting the S&P index from 15 macroeconomic indicators extracted from TradingView.",
    techStack: ["Time Series Analysis", "Linear Regression", "Augmented Dickey-Fuller Test", "Granger Causality Test"],
    repoLink: "https://github.com/junjslee/Predicting-S-P-500-Market-Trends-using-Macro-Economic-Indicators-with-Python/blob/master/Python-SPX%20Prediction%20using%20Macro-Economic%20Indicators.ipynb",
    category: "Finance",
  },
  {
    title: "Will You Be My Valentine?",
    description: "Made a website for my partner with Bugcat-Capoo GIFs.",
    techStack: ["HTML, CSS, JavaScript"],
    repoLink: "https://github.com/junjslee/will-you-be-my-valentine",
    category: "Web App",
  },
]

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0])

  return (
    <section className="xp-content xp-projects-section">
      <div className="xp-pane">
        <h1>Projects</h1>
        <p>
          A mix of research infrastructure, applied ML, and software. I like building things that prove a
          point, even if the first version is rough.
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
                <strong className="xp-project-row-title" title={project.title}>
                  {project.title}
                </strong>
                <span className="xp-project-row-kind">{project.category}</span>
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
          {selectedProject.image ? (
            <figure className="xp-preview-figure">
              <a href={selectedProject.image} target="_blank" rel="noopener noreferrer">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt ?? selectedProject.title}
                  loading="lazy"
                />
              </a>
              <figcaption>Click to view full size</figcaption>
            </figure>
          ) : null}
          <p>{selectedProject.description}</p>
          <div className="xp-project-meta">
            <strong>Tech stack</strong>
            <ul className="xp-chip-list">
              {selectedProject.techStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="xp-project-actions">
            {selectedProject.liveLink ? (
              <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer">
                {selectedProject.liveLabel ?? 'Open Live Site'}
              </a>
            ) : null}
            {selectedProject.repoLink ? (
              <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer">
                Open on GitHub
              </a>
            ) : null}
            {selectedProject.liveNote ? (
              <span className="xp-action-note">{selectedProject.liveNote}</span>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  )
}

export default ProjectsSection
