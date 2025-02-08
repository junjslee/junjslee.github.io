// src/components/AboutSection.tsx
import React from 'react'

const AboutSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <p className="mb-4">
        Hi, I'm Jun. I am a Junior at the University of Illinois at Urbana Champaign studying Data Science, Finance, and Computer Science.
        </p>
      <p className="mb-4">
        My main interests include deep learning/machine learning, information security, computer networks, cloud architecture, and full stack development.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Currently</h2>
      <li>I am serving in the U.S. Army as a Korean Augmentation(KATUSA).</li>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Skills & Technologies</h2>
      <ul className="list-disc list-inside">
        <li> Python (pandas, numpy, matplotlib, statsmodels), Machine Learning (PyTorch, scikit-learn), Computer Vision (opencv)</li>
        <li>Frontend: CSS/Tailwind CSS, HTML, Javascript, React, Typescript</li>
        <li>Backend:  Flask, Node.js, Next.js</li>
        <li>Linux, Git, AWS</li>
      </ul>
    </div>
  )
}

export default AboutSection
