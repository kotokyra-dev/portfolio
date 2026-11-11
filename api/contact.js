/**
 * Отправка формы связи через Resend.
 *
 * Переменные окружения в Vercel (Project → Settings → Environment Variables):
 *   RESEND_API_KEY      — ключ из resend.com
 *   CONTACT_TO_EMAIL    — куда приходит письмо (по умолчанию kotokyura@gmail.com)
 *   CONTACT_FROM_EMAIL  — отправитель, например "Portfolio <hello@your-domain.com>".
 *                         Без своего домена используйте "Portfolio <onboarding@resend.dev>":
 *                         Resend разрешает такую отправку только на почту владельца аккаунта.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function readBody(body) {
  if (!body) return {}
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return body
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'method_not_allowed' })
  }

  const body = readBody(request.body)
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const honeypot = typeof body.company === 'string' ? body.company.trim() : ''
  const locale = body.locale === 'en' ? 'en' : 'ru'

  // Спам-боты заполняют скрытое поле — отвечаем успехом, но ничего не отправляем.
  if (honeypot) return response.status(200).json({ ok: true })

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return response.status(400).json({ error: 'invalid_input' })
  }

  if (message.length > 5000) {
    return response.status(400).json({ error: 'too_long' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return response.status(503).json({ error: 'not_configured' })
  }

  const to = process.env.CONTACT_TO_EMAIL || 'kotokyura@gmail.com'
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'
  const subject = locale === 'en' ? `Portfolio message from ${name}` : `Сообщение с портфолио от ${name}`

  try {
    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html: `
          <h2>${escapeHtml(subject)}</h2>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Locale:</strong> ${locale}</p>
          <hr />
          <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        `,
      }),
    })

    if (!resend.ok) {
      const detail = await resend.text()
      console.error('Resend error', resend.status, detail)
      return response.status(502).json({ error: 'delivery_failed' })
    }

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact form error', error)
    return response.status(502).json({ error: 'delivery_failed' })
  }
}
