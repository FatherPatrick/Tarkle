import { useMemo, useState } from 'react'

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/api/contact'

const INITIAL_FORM = {
  name: '',
  email: '',
  category: 'bug-report',
  pageUrl: '',
  message: '',
  website: '',
}

function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = useMemo(() => {
    return form.name.trim().length >= 2 && form.message.trim().length >= 10 && /@/.test(form.email)
  }, [form])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!CONTACT_ENDPOINT) {
      setStatus({
        type: 'error',
        message: 'Contact form is not configured yet. Please try again later.',
      })
      return
    }

    if (!canSubmit) {
      setStatus({
        type: 'error',
        message: 'Please add your name, a valid email, and at least 10 characters in your message.',
      })
      return
    }

    if (form.website) {
      setStatus({ type: 'success', message: 'Thanks. Your message has been submitted.' })
      setForm(INITIAL_FORM)
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          category: form.category,
          pageUrl: form.pageUrl.trim(),
          message: form.message.trim(),
          source: 'tarkle-contact-page',
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('request-failed')
      }

      setStatus({
        type: 'success',
        message: 'Message sent. Thank you for helping improve Tarkle.',
      })
      setForm(INITIAL_FORM)
    } catch {
      setStatus({
        type: 'error',
        message:
          'Submission failed. Please try again in a moment, or use the email address below if the issue persists.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="content-page">
      <h1>Contact</h1>
      <p className="content-updated">Last updated: March 18, 2026</p>

      <p>
        Feedback is welcome for gameplay clarity, data issues, and content improvements. If you spot an
        incorrect stat interpretation, a broken flow, or a page that needs better explanation, please
        share it.
      </p>

      <h2>Best Reasons To Reach Out</h2>
      <ul>
        <li>Possible data mismatch between source and displayed values.</li>
        <li>Guide section that is unclear or outdated after a patch.</li>
        <li>Accessibility issues affecting readability or navigation.</li>
        <li>Suggestions for new reference topics and FAQ additions.</li>
      </ul>

      <h2>Send A Message</h2>
      <p>
        Use the form below to submit feedback directly from this page.
      </p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label className="contact-field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
            minLength={2}
            placeholder="Your name"
          />
        </label>

        <label className="contact-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </label>

        <label className="contact-field">
          <span>Topic</span>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="bug-report">Data or bug report</option>
            <option value="guide-feedback">Guide feedback</option>
            <option value="accessibility">Accessibility issue</option>
            <option value="feature-request">Feature request</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="contact-field">
          <span>Affected Page URL (optional)</span>
          <input
            type="url"
            name="pageUrl"
            value={form.pageUrl}
            onChange={handleChange}
            placeholder="https://tarkovle.vercel.app/reference/..."
          />
        </label>

        <label className="contact-field">
          <span>Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            minLength={10}
            rows={7}
            placeholder="What happened, where it happened, and what you expected instead."
          />
        </label>

        <label className="contact-honeypot" aria-hidden="true">
          <span>Website</span>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <div className="contact-form-actions">
          <button type="submit" className="contact-submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          <p className="contact-fallback">Fallback email: patrickpark208@gmail.com</p>
        </div>

        {status.message ? (
          <p className={`contact-status contact-status--${status.type}`} role="status" aria-live="polite">
            {status.message}
          </p>
        ) : null}
      </form>

      <p>
        If this address changes, this page will be updated first.
      </p>

      <h2>What To Include In A Report</h2>
      <ol>
        <li>The page URL where the issue appears.</li>
        <li>A short description of expected vs actual behavior.</li>
        <li>Screenshots or copied text when relevant.</li>
        <li>Timestamp and region if the issue might be data freshness related.</li>
      </ol>

      <h2>Response Expectations</h2>
      <p>
        Not all reports can receive immediate responses, but high-impact issues (incorrect data mapping,
        broken page access, or misleading guide content) are prioritized for review.
      </p>

      <h2>Community Input Policy</h2>
      <p>
        Suggestions are reviewed for clarity, reproducibility, and player usefulness. The project aims
        to incorporate feedback that measurably improves educational value and usability.
      </p>

      <a className="legal-back" href="/">
        Back Home
      </a>
    </section>
  )
}

export default ContactPage
