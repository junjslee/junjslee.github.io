import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-300">
      &copy; 2025 Junseong Lee. All rights reserved. 
        {/* &copy; {new Date().getFullYear()} Junseong Lee. All rights reserved. */}
      </div>
    </footer>
  )
}

export default Footer
