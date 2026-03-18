import React from 'react'
import ContactForm from './ContactForm'

const ContactSection: React.FC = () => {
  return (
    <section className="xp-content xp-contact-section">
      <div className="xp-pane">
        <h1>Contact</h1>
        <p>
          The form below still goes through EmailJS, so it works with the static GitHub Pages deployment.
          If you just need a quick route, use one of the links beside it.
        </p>
      </div>

      <div className="xp-contact-layout">
        <ContactForm />
        <div className="xp-pane xp-contact-links">
          <h2>Quick Links</h2>
          <ul className="xp-list">
            <li>
              <a href="https://www.linkedin.com/in/junseong-lee" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/junjslee" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:junseong.lee652@gmail.com">Email</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
