import React, { useState } from 'react'
import emailjs from 'emailjs-com'

const ContactForm: React.FC = () => {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID
  const isEmailJsConfigured = Boolean(serviceID && templateID && userID)
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

    if (!isEmailJsConfigured) {
      const subject = encodeURIComponent(`[Website] ${formData.inquiry || 'General note'} from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nReason: ${formData.inquiry}\n\n${formData.message}`
      )

      window.location.href = `mailto:junseong.lee652@gmail.com?subject=${subject}&body=${body}`
      setStatus('Opened your email client because EmailJS is not configured in this environment.')
      return
    }

    emailjs
      .send(serviceID!, templateID!, formData, userID!)
      .then(
        () => {
          setStatus('Message sent successfully.')
          setFormData({
            name: '',
            email: '',
            inquiry: '',
            message: '',
          })
        },
        (error) => {
          console.error(error.text)
          setStatus('Failed to send message.')
        }
      )
  }

  return (
    <form onSubmit={handleSubmit} className="xp-contact-form">
      <div className="field-row-stacked">
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
      <div className="field-row-stacked">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="field-row-stacked">
        <label htmlFor="inquiry">Reason</label>
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
      <div className="field-row-stacked">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>
      <div className="xp-form-actions">
        <button type="submit">
          {isEmailJsConfigured ? 'Send Message' : 'Open Email Draft'}
        </button>
        {status ? <span className="xp-form-status">{status}</span> : null}
      </div>
    </form>
  )
}

export default ContactForm
