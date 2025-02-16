import React from 'react'
import * as ReactTypewriter from 'react-simple-typewriter'

const { useTypewriter, Cursor } = ReactTypewriter

const Hero: React.FC = () => {
  const [text] = useTypewriter({
    words: [
      "Medical AI Research Intern at MI2RL",
      "Sergeant (E-5) at 2nd Infantry Division, 8th U.S. Army",
      "Experience in deep learning, full-stack dev, cloud & computer networks"
    ],
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <section 
      className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center text-center px-4"
      style={{ backgroundImage: "url('images/hero-background.jpg')" }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0"></div>
      
      <img 
        src="images/hero.jpg" 
        alt="Jun's photo" 
        className="relative w-60 h-60 rounded-full mb-4 shadow-lg" 
      />
      <h1 className="relative text-4xl font-bold mb-3 text-white drop-shadow-lg">Hi, I'm Jun</h1>
      <p className="relative text-xl text-yellow-50 dark:text-gray-300 mb-4 drop-shadow-md">
        B.S. Data Science + Finance, Computer Science @ UIUC
      </p>
      <h2 className="relative text-2xl font-semibold text-indigo-200 drop-shadow-md">
        {text}
        <Cursor />
      </h2>
      <div className="relative mt-6">
        <a 
          href="#about" 
          className="px-6 py-3 bg-indigo-600 text-white rounded dark:text-white hover:bg-indigo-700 transition shadow-md"
        >
          My portfolio ⇩
        </a>
      </div>
    </section>
  )
}

export default Hero
