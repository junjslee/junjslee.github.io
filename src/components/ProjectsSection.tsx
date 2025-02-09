// src/components/ProjectsSection.tsx
import React from 'react'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: "Web Application for 2nd Infantry Division, 8th U.S. Army",
    description: "Developed and deployed a web application for the battalion's event management system and automation on AWS",
    techStack: ["Python (flask, smtp, pandas)", "HTML, CSS , Javascript", "AWS EC2", "Nginx", "Gunicorn"],
    repoLink: "https://github.com/junjslee/UMTauto",
    image: "images/projects/2id.jpg",
  },
  {
    title: "Heart Disease Prediction",
    description: "Built an ML model to predict heart disease based on UC Irvine's public medical data",
    techStack: ["Python (pandas, numpy, matplotlib, scikit-learn)", "Statistical Modeling"],
    repoLink: "https://github.com/junjslee/ml_heart_disease_prediction",
    image: "images/projects/heart_disease.jpg",
  },
  {
    title: "Facial Recognition using Principal Component Analysis (PCA)",
    description: "Developed a facial recognition system using PCA",
    techStack: ["Python", "Linear Algebra", "Statistical Modeling"],
    repoLink: "https://github.com/junjslee/facial_recognition_pca/blob/main/PCA-FacialRecognition.ipynb",
    image: "images/projects/pca.jpg",
  },
  {
    title: "S&P Index Prediction using Macroeconomic Indicators",
    description: "Built an ML model to predict S&P Index based on 15 macroeconomic indicators",
    techStack: ["Python", "Machine Learning", "Statistical Modeling"],
    repoLink: "https://github.com/junjslee/https://github.com/junjslee/Predicting-S-P-500-Market-Trends-using-Macro-Economic-Indicators-with-Python/blob/master/Python-SPX%20Prediction%20using%20Macro-Economic%20Indicators.ipynb",
    image: "images/projects/s&p.jpg",
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
