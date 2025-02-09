// src/components/Hero.tsx
import React from 'react'
import * as ReactTypewriter from 'react-simple-typewriter'

const { useTypewriter, Cursor } = ReactTypewriter

const Hero: React.FC = () => {
  const [text] = useTypewriter({
    words: ["AI Research Intern at MI2RL", "Sergeant at 2nd Infantry Division, 8th U.S. Army", "Junior at Univ. of Illinois @ Urbana-Champaign"],
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-center px-4"
    style={{ backgroundImage: "url('images/hero-background.jpg')" }}
    >
      <img src="images/hero.jpg" alt="Jun's photo" className="w-60 h-60 rounded-full mb-4" />
      <h1 className="text-4xl font-bold mb-3">Hi, I'm Jun</h1>
      <p className="text-xl text-yellow-100 dark:text-gray-300 mb-4">
        B.S. Data Science + Finance, Computer Science <br></br>
        I love playing soccer, basketball, and Asian Billiards (4 ball)
      </p>
      <h2 className="text-2xl font-semibold text-indigo-300">
        {text}
        <Cursor />
      </h2>
      <div className="mt-6">
        <a href="#resume" className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          Check out my experiences!
        </a>
      </div>
    </section>
  )
}

export default Hero
