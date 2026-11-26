import { Resend } from 'resend'

const CONTACT_TO = process.env.CONTACT_TO || 'shannmichaelagang@gmail.com'
const CONTACT_FROM = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'Email service not configured' })
  }

  let body: any = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ success: false, error: 'Invalid JSON' })
    }
  }

  const name = String(body?.name || '').trim()
  const email = String(body?.email || '').trim()
  const message = String(body?.message || '').trim()

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' })
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Portfolio Contact: ${name}`,
      text: `${message}\n\nFrom: ${name} (${email})`,
    })

    if (error) {
      return res.status(502).json({ success: false, error: error.message })
    }

    return res.status(200).json({ success: true })
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Send failed' })
  }
}