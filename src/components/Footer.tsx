// src/components/Footer.tsx
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow py-4">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Junseong Lee. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
