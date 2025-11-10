import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow fixed w-full top-0 z-50">
      {/* Header Row */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <a href="#hero" className="text-xl font-bold text-indigo-600">
          Junseong Lee (Jun)
        </a>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-indigo-600 focus:outline-none">
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center">
          <a href="#hero" className="ml-6 hover:text-indigo-600">Home</a>
          <a href="#about" className="ml-6 hover:text-indigo-600">About</a>
          <a href="#projects" className="ml-6 hover:text-indigo-600">Projects</a>
          <a href="#resume" className="ml-6 hover:text-indigo-600">Resume</a>
          {/* <a href="#blog" className="ml-6 hover:text-indigo-600">Blog</a> */}
          <a href="#contact" className="ml-6 hover:text-indigo-600">Contact</a>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6 py-4">
            <a
              href="#hero"
              onClick={() => setIsOpen(false)}
              className="block mt-2 hover:text-indigo-600"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="block mt-2 hover:text-indigo-600"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={() => setIsOpen(false)}
              className="block mt-2 hover:text-indigo-600"
            >
              Projects
            </a>
            <a
              href="#resume"
              onClick={() => setIsOpen(false)}
              className="block mt-2 hover:text-indigo-600"
            >
              Resume
            </a>
            {/* <a
              href="#blog"
              onClick={() => setIsOpen(false)}
              className="block mt-2 hover:text-indigo-600"
            >
              Blog
            </a> */}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-2 hover:text-indigo-600"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
