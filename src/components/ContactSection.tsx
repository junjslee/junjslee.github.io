// src/components/ContactSection.tsx
import React from 'react'
import ContactForm from './ContactForm'

const ContactSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <ContactForm />
      <div className="mt-8">
        <p className="text-xl mb-3 flex space-x-4 items-center justify-center text-center">You can reach me at:</p>
        <div className="flex space-x-4 items-center justify-center text-center px-4">
          <a href="https://www.linkedin.com/in/junseong-lee" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            LinkedIn
          </a>
          <a href="https://github.com/junjslee" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            GitHub
          </a>
          <a href="mailto:junseong.lee652@gmail.com" className="text-indigo-600 hover:underline">
            Email
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
