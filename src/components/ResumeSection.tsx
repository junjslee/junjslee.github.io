import React from 'react';

const experiences = [
  {
    title: "AI Research Engineer Intern - Medical Imaging and Intelligent Reality Lab (MI2RL)",
    period: "Oct 2023 ~ Apr 2025",
  },
  {
    title: "Sergeant (E-5) / Software Engineer - 2nd Infantry Division, Korean Augmentation to the United States Army",
    period: "Oct 2023 ~ Apr 2025",
  },
  {
    title: "Founding Developer - Scroll",
    period: "Dec 2022 ~ Oct 2023",
  },
  {
    title: "Quantitative Trading Analyst - Quant @ UIUC",
    period: "Feb 2023 ~ May 2025",
  },
  {
    title: "Valuation Analyst - AIM Partners",
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
  "University of Illinois Urbana-Champaign"
];

const ResumeSection: React.FC = () => {
  return (
    <section className="xp-content xp-resume-section">
      <div className="xp-pane">
        <h1>Resume</h1>
        <p>Open the full PDF or skim the highlights below.</p>
        <a href="/documents/Resume.pdf" target="_blank" rel="noopener noreferrer">
          View Resume.pdf
        </a>
      </div>

      <div className="xp-pane">
        <h2>Experience</h2>
        <ol className="xp-timeline">
          {experiences.map((exp, index) => (
            <li key={index}>
              <strong>{exp.title}</strong>
              <span>{exp.period}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="xp-pane">
        <h2>Education</h2>
        <ul className="xp-list">
          {education.map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResumeSection;
