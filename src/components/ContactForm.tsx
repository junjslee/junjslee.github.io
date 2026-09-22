import React, { useState } from 'react'

const CONTACT_EMAIL = 'junseong.lee652@gmail.com'

/* This form composes a message and hands it to the visitor's own mail client.
   There is no send service behind it: the site is a static export with nowhere
   to keep a secret, and the previous EmailJS wiring had no credentials set, so
   it silently fell through to this same path while telling the visitor it was
   misconfigured. Composing a draft is now the intended behaviour, and the copy
   says so. */
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: '',
    message: '',
  })
  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setStatus(null)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const subject = encodeURIComponent(
      `[Website] ${formData.inquiry || 'General note'} from ${formData.name}`
    )
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nReason: ${formData.inquiry}\n\n${formData.message}`
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setStatus(`Draft opened in your email client, addressed to ${CONTACT_EMAIL}.`)
  }

  return (
    <form onSubmit={handleSubmit} className="xp-mail-compose">
      <div className="xp-mail-fields">
        <div className="xp-mail-row">
          <label htmlFor="to">To</label>
          <input id="to" value={CONTACT_EMAIL} readOnly />
        </div>
        <div className="xp-mail-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="xp-mail-row">
          <label htmlFor="email">From</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="xp-mail-row">
          <label htmlFor="inquiry">Subject</label>
          <select
            id="inquiry"
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="research">General note</option>
            <option value="recruiting">Recruiting</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="xp-mail-editor">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={9}
          required
        />
      </div>

      <div className="xp-mail-footer">
        <div className="xp-mail-links">
          <a href={`mailto:${CONTACT_EMAIL}`}>Email directly instead</a>
        </div>
        <div className="xp-form-actions">
          <button type="submit">Compose in my email app</button>
          {status ? <span className="xp-form-status">{status}</span> : null}
        </div>
      </div>
    </form>
  )
}

export default ContactForm
