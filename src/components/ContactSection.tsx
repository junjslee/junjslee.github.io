import React from 'react'
import ContactForm from './ContactForm'

const ContactSection: React.FC = () => {
  return (
    <section className="xp-content xp-mail-shell">
      <div className="xp-mail-toolbar" aria-label="Mail toolbar">
        <button type="button">New</button>
        <button type="button">Send</button>
        <button type="button">Address Book</button>
      </div>

      <div className="xp-pane xp-mail-panel">
        <div className="xp-mail-header-copy">
          <h1>Contact</h1>
          <p>
            This window is styled like a simple mail composer. Send through EmailJS when configured,
            or fall back to a drafted email in local environments.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}

export default ContactSection
