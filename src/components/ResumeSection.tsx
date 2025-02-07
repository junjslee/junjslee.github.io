// src/components/ResumeSection.tsx
import React from 'react'

const ResumeSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Resume</h1>
      <p className="mb-4">Download my resume in PDF format.</p>
      <a href="/resume.pdf" download className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
        Download Resume
      </a>
      {/* Additional resume details can be added here */}
    </div>
  )
}

export default ResumeSection
