import React from 'react'
import ContactForm from './ContactForm'

const ContactSection: React.FC = () => {
  return (
    <section className="xp-content xp-mail-shell">
      {/* Chrome, not controls. These carried no handlers, so a visitor could
          click "Send" here and get nothing; disabled matches how the IE
          toolbar's back and forward buttons already behave. */}
      <div className="xp-mail-toolbar" aria-hidden="true">
        <button type="button" disabled>
          New
        </button>
        <button type="button" disabled>
          Send
        </button>
        <button type="button" disabled>
          Address Book
        </button>
      </div>

      <div className="xp-pane xp-mail-panel">
        <div className="xp-mail-header-copy">
          <h1>Contact</h1>
          <p>
            Fill this in and it opens a pre-written draft in your own email app — nothing is sent
            from this page. Prefer to skip the form? Write to{' '}
            <a href="mailto:junseong.lee652@gmail.com">junseong.lee652@gmail.com</a> directly.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}

export default ContactSection
