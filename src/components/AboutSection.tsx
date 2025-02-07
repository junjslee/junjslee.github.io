// src/components/AboutSection.tsx
import React from 'react'

const AboutSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <p className="mb-4">
        Hi, I'm Jun. I am studying Finance, Data Science, and Computer Science at the University of Illinois.
      </p>
      <p className="mb-4">
        My main interests include deep learning/machine learning, information security, computer networks and cloud architecture, and full stack development.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Skills & Technologies</h2>
      <ul className="list-disc list-inside">
        <li>React, Next.js, TypeScript</li>
        <li>Node.js, Express</li>
        <li>Python, Machine Learning (TensorFlow, PyTorch)</li>
        <li>Tailwind CSS, HTML, CSS</li>
        <li>CI/CD, GitHub Actions</li>
      </ul>
    </div>
  )
}

export default AboutSection
