/**
 * Отправка формы связи.
 *
 * Основной канал — email через Resend.
 * Запасной канал — сообщение в Telegram (работает без сторонних сервисов).
 *
 * Переменные окружения в Vercel (Project → Settings → Environment Variables):
 *   RESEND_API_KEY      — ключ resend.com (необязательно, если работает Telegram)
 *   CONTACT_TO_EMAIL    — куда приходит письмо (по умолчанию kotokyura@gmail.com)
 *   CONTACT_FROM_EMAIL  — отправитель: "Portfolio <onboarding@resend.dev>"
 *   BOT_TOKEN           — токен Telegram-бота (для запасного канала)
 *   CONTACT_CHAT_ID     — чат для заявок (по умолчанию 204766689)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const DEFAULT_TO_EMAIL = 'kotokyura@gmail.com'
const DEFAULT_FROM_EMAIL = 'Portfolio <onboarding@resend.dev>'
const DEFAULT_CHAT_ID = '204766689'

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

function buildTelegramText({ name, email, message, locale }) {
  const title = locale === 'en' ? 'New portfolio message' : 'Новое сообщение с портфолио'
  return [
    `📩 <b>${title}</b>`,
    '',
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Язык:</b> ${locale === 'en' ? 'EN' : 'RU'}`,
    '',
    escapeHtml(message),
    '',
    `<a href="mailto:${escapeHtml(email)}">Ответить на почту</a>`,
  ].join('\n')
}

async function sendToTelegram({ name, email, message, locale }) {
  const token = process.env.BOT_TOKEN
  if (!token) return { ok: false, reason: 'no_bot_token' }
  const chatId = process.env.CONTACT_CHAT_ID || DEFAULT_CHAT_ID
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramText({ name, email, message, locale }),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })
  if (!res.ok) {
    const detail = await res.text()
    console.error('Telegram error', res.status, detail)
    return { ok: false, reason: 'telegram_failed' }
  }
  return { ok: true, via: 'telegram' }
}

async function sendToResend({ name, email, message, locale }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, reason: 'no_resend_key' }

  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL
  const subject = locale === 'en' ? `Portfolio message from ${name}` : `Сообщение с портфолио от ${name}`

  const res = await fetch('https://api.resend.com/emails', {
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

  if (!res.ok) {
    const detail = await res.text()
    console.error('Resend error', res.status, detail)
    return { ok: false, reason: 'resend_failed' }
  }
  return { ok: true, via: 'resend' }
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

  const payload = { name, email, message, locale }
  const attempts = []

  // 1) Основной канал — Telegram (заявка приходит сразу в чат владельца)
  const tg = await sendToTelegram(payload)
  attempts.push(tg.reason || tg.via)
  if (tg.ok) return response.status(200).json({ ok: true, via: tg.via })

  // 2) Запасной канал — email (только если задан RESEND_API_KEY)
  if (process.env.RESEND_API_KEY) {
    const r = await sendToResend(payload)
    attempts.push(r.reason || r.via)
    if (r.ok) return response.status(200).json({ ok: true, via: r.via })
  } else {
    attempts.push('no_resend_key')
  }

  console.error('Contact form failed', attempts.join(', '))
  return response.status(502).json({ error: 'delivery_failed' })
}
