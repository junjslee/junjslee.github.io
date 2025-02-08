// src/components/ContactForm.tsx
import React, { useState } from 'react'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implement your form submission logic (e.g., send data to an API)
    console.log(formData)
    alert('Form submitted!')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow p-6 rounded">
      <div className="mb-4">
        <label className="block mb-1" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="inquiry">Inquiry Type</label>
        <select
          id="inquiry"
          name="inquiry"
          className="w-full p-2 border rounded"
          value={formData.inquiry}
          onChange={handleChange}
          required
        >
          <option value="">Select an option</option>
          <option value="research">Reaching out</option>
          <option value="recruiting">Recruiting</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="w-full p-2 border rounded"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
        ></textarea>
      </div>
      <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
        Send Message
      </button>
    </form>
  )
}

export default ContactForm
