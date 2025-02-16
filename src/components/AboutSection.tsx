import React from 'react';

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

      {/* Additional Info with Icons */}
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {/* Location */}
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.6569 0 3-1.3431 3-3s-1.3431-3-3-3-3 1.3431-3 3 1.3431 3 3 3zm0 0v10" />
          </svg>
          <span><strong>Location:</strong> Seoul, South Korea</span>
        </div>

        {/* Age */}
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span><strong>Age:</strong> 22</span>
        </div>

        {/* Nationality */}
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7V3m0 4l-3 2m3-2l3 2M9 7H5M9 7h4m-4 4l-3 2m3-2l3 2M9 11h4m-4 4l-3 2m3-2l3 2M9 15h4" />
          </svg>
          <span><strong>Ethnicity:</strong> Korean</span>
        </div>

        {/* Interests */}
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span><strong>I love:</strong> Soccer, Basketball, Asian Billiards (4 ball), Poker</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Currently</h2>
      <ul className="list-disc list-inside mb-8">
        <li>Serving in the<span> </span>
          <a href="https://www.2id.korea.army.mil/" target="_blank" rel="noopener noreferrer">
          U.S. Army as Korean Augmentation (KATUSA)
          </a>
        </li>
        <li>
          Researching at<span> </span>
          <a href="https://www.mi2rl.co/" target="_blank" rel="noopener noreferrer">
            Medical Imaging and Intelligence Reality Lab
          </a>
          <span>, </span> 
          <a href="https://eng.amc.seoul.kr/gb/lang/main.do" target="_blank" rel="noopener noreferrer">
            Asan Medical Center
          </a>
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Skills & Technologies</h2>
      <ul className="list-disc list-inside">
        <li><strong>Programming Language:</strong> Python (pandas, numpy, scipy, matplotlib, tqdm), Java, Javascript, Typescript</li>
        <li><strong>Machine Learning:</strong> PyTorch, scikit-learn, MONAI, OpenCV</li>
        <li><strong>Frontend:</strong> CSS/Tailwind CSS, HTML, React</li>
        <li><strong>Backend:</strong> Flask, Node.js, Next.js</li>
        <li><strong>Tools & Technologies:</strong> Git, Linux, AWS</li>
        <li><strong>Language:</strong> English, Korean, Chinese, Japanese</li>
      </ul>
    </div>
  );
};

export default AboutSection;
