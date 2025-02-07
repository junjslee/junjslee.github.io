// src/components/Layout.tsx
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import DarkModeToggle from './DarkModeToggle'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {/* Add top padding to offset the fixed navbar */}
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <DarkModeToggle />
    </div>
  )
}

export default Layout
