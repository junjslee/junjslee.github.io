// src/components/Navbar.tsx
import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="text-xl font-bold text-indigo-600">Junseong Lee (Jun)</a>
        <div className="space-x-4">
          <a href="#hero" className="hover:text-indigo-600">Home</a>
          <a href="#about" className="hover:text-indigo-600">About</a>
          <a href="#projects" className="hover:text-indigo-600">Projects</a>
          <a href="#resume" className="hover:text-indigo-600">Resume</a>
          <a href="#blog" className="hover:text-indigo-600">Blog</a>
          <a href="#contact" className="hover:text-indigo-600">Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
