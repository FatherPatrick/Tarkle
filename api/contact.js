import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const RATE_LIMIT_BUCKETS = new Map()
const DEFAULT_TO_EMAIL = 'patrickpark208@gmail.com'

const DEFAULT_RATE_LIMIT_MAX = 3
const DEFAULT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000

function toSingleLine(value) {
  if (!value) return ''
  return String(value).replace(/\s+/g, ' ').trim()
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = req.headers['x-real-ip']
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim()
  }

  return 'unknown'
}

function consumeRateLimit(key, maxRequests, windowMs) {
  const now = Date.now()
  const existing = RATE_LIMIT_BUCKETS.get(key)

  if (!existing || existing.expiresAt <= now) {
    RATE_LIMIT_BUCKETS.set(key, {
      count: 1,
      expiresAt: now + windowMs,
    })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.expiresAt - now) / 1000)),
    }
  }

  existing.count += 1
  RATE_LIMIT_BUCKETS.set(key, existing)
  return { allowed: true, retryAfterSeconds: 0 }
}

function buildHtmlEmail({ name, email, category, pageUrl, message }) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeCategory = escapeHtml(category)
  const safePageUrl = pageUrl ? escapeHtml(pageUrl) : 'N/A'
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

  return `
  <div style="background:#0b1220;padding:24px;font-family:Verdana,Segoe UI,Tahoma,sans-serif;color:#e2e8f0;">
    <div style="max-width:680px;margin:0 auto;border:1px solid #334155;border-radius:12px;overflow:hidden;background:#0f172a;">
      <div style="padding:14px 18px;background:linear-gradient(90deg,#0f766e,#155e75);color:#f0fdfa;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Tarkle</div>
        <div style="font-size:20px;font-weight:700;">New Contact Form Message</div>
      </div>
      <div style="padding:18px;">
        <p style="margin:0 0 8px;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin:0 0 8px;"><strong>Topic:</strong> ${safeCategory}</p>
        <p style="margin:0 0 16px;"><strong>Page URL:</strong> ${safePageUrl}</p>
        <div style="border:1px solid #334155;border-radius:10px;background:#111827;padding:14px;line-height:1.45;">
          ${safeMessage}
        </div>
      </div>
    </div>
  </div>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const maxRequests = Number(process.env.CONTACT_RATE_LIMIT_MAX || DEFAULT_RATE_LIMIT_MAX)
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || DEFAULT_RATE_LIMIT_WINDOW_MS)
  const clientIp = getClientIp(req)
  const limiter = consumeRateLimit(`contact:${clientIp}`, maxRequests, windowMs)

  if (!limiter.allowed) {
    res.setHeader('Retry-After', String(limiter.retryAfterSeconds))
    return res.status(429).json({ error: 'Too many requests, please try again later.' })
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Tarkle Contact <onboarding@resend.dev>'

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Contact form is not configured' })
  }

  let payload = req.body
  if (typeof req.body === 'string') {
    try {
      payload = JSON.parse(req.body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' })
    }
  }

  const name = toSingleLine(payload?.name)
  const email = toSingleLine(payload?.email)
  const category = toSingleLine(payload?.category || 'other')
  const pageUrl = toSingleLine(payload?.pageUrl)
  const message = String(payload?.message || '').trim()
  const honeypot = toSingleLine(payload?.website)

  if (honeypot) {
    return res.status(200).json({ ok: true })
  }

  if (name.length < 2 || !email.includes('@') || message.length < 10) {
    return res.status(400).json({ error: 'Invalid form payload' })
  }

  const subject = `[Tarkle Contact] ${category}`
  const htmlBody = buildHtmlEmail({ name, email, category, pageUrl, message })
  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Topic: ${category}`,
    `Page URL: ${pageUrl || 'N/A'}`,
    '',
    'Message:',
    message,
  ].join('\n')

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      html: htmlBody,
      text: textBody,
    })

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'Email send failed' })
  }
}