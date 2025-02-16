import React from 'react';

const experiences = [
  {
    title: "Sergeant (E-5) - 2nd Infantry Division, 8th U.S. Army",
    period: "Oct 2023 ~ Apr 2025",
  },
  {
    title: "Co-founder - Scroll",
    period: "Dec 2022 ~ Oct 2023",
  },
  {
    title: "Quantitative Trading Analyst - Quant @ UIUC",
    period: "Feb 2023 ~ May 2025",
  },
  {
    title: "Senior Equity Analyst - AIM Partners",
    period: "Jan 2022 ~ May 2023",
  },
  {
    title: "Senior Consultant - FACES Consulting @ UIUC",
    period: "Aug 2021 ~ Jul 2022",
  },
  {
    title: "Journalist Intern - The Stanford Daily @ Stanford University",
    period: "May 2020 ~ Aug 2020",
  },
  {
    title: "Contract Journalist - The Trace",
    period: "Jul 2018 ~ Apr 2019",
  },
];

const education = [
  "University of Illinois at Urbana Champaign"
];

const ResumeSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Resume</h1>
      <p className="mb-4">Download my resume in PDF format.</p>
      <a
        href="documents/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        View Resume
      </a>

      {/* Experience Timeline */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        <ul className="relative border-l border-gray-200 dark:border-gray-700">
          {experiences.map((exp, index) => (
            <li key={index} className="mb-5 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 ring-skyblue dark:ring-gray-900">
                {/* Simple dot icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-blue">
                  <circle cx="12" cy="12" r="6" />
                </svg>
              </span>
              <h3 className="text-xl font text-gray-900 dark:text-white">{exp.title}</h3>
              <time className="block mb-2 text-sm font-normal text-gray-400 dark:text-gray-500">
                {exp.period}
              </time>
            </li>
          ))}
        </ul>
      </div>

      {/* Education Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <ul className="list-disc list-inside">
          {education.map((edu, index) => (
            <li key={index} className="text-xl font font-serif">{edu}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeSection;
