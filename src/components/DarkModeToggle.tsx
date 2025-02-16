import React, { useEffect, useState } from 'react'

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark', !darkMode)
  }

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleDarkMode}
        className="p-2 bg-indigo-600 text-white rounded-full shadow-lg focus:outline-none"
      >
        {darkMode ? 'Light' : 'Dark'}
      </button>
    </div>
  )
}

export default DarkModeToggle
