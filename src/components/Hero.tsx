// src/components/Hero.tsx
import React from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const Hero: React.FC = () => {
  const [text] = useTypewriter({
    words: ["Building AI solutions", "Optimizing financial models", "Innovating in healthcare"],
    loop: {},
    delaySpeed: 2000,
  })

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <img src="/images/hero.jpg" alt="Jun's photo" className="w-40 h-40 rounded-full mb-4" />
      <h1 className="text-4xl font-bold mb-2">Hi, I'm Jun</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
        Studying Finance, Data Science & Computer Science at University of Illinois.
      </p>
      <h2 className="text-2xl font-semibold text-indigo-600">
        {text}
        <Cursor />
      </h2>
      <div className="mt-6">
        <a href="#projects" className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          Check out my projects
        </a>
      </div>
    </section>
  )
}

export default Hero
