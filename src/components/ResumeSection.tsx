// src/components/ResumeSection.tsx
import React from 'react'

const ResumeSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Resume</h1>
      <p className="mb-4">Download my resume in PDF format.</p>
      <a href="documents/Resume.pdf" download className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
        Download Resume
      </a>
      {/* Add resume details if I want */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Sergeant (E-5) - 2nd Infantry Division, U.S. Army</h3>
          <h4>Oct 2023 ~ Apr 2025</h4>
          <h3 className="text-xl font-bold">Co-founder - Scroll</h3>
          <h4>Dec 2022 ~ Oct 2023</h4>
          <h3 className="text-xl font-bold">Quantitative Trading Analyst - Quant @ UIUC</h3>
          <h4>Feb 2023 ~ May 2025</h4>
          <h3 className="text-xl font-bold">Senior Equity Analyst - AIM Partners</h3>
          <h4>Jan 2022 ~ May 2023</h4>
          <h3 className="text-xl font-bold">Senior Consultant - FACES Consulting @ UIUC</h3>
          <h4>Aug 2021 ~ Jul 2022</h4>
          <h3 className="text-xl font-bold">Journalist Intern - The Stanford Daily @ Stanford University</h3>
          <h4>May 2020 ~ Aug 2020</h4>
          <h3 className="text-xl font-bold">Contract Journalist - The Trace</h3>
          <h4>Jul 2018 ~ Apr 2019</h4>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold">University of Illinois at Urbana Champaign</h3>
          <h3 className="text-xl font-bold">Saratoga High School</h3>
        </div>
      </div>
    </div>
  )
}

export default ResumeSection
