export type ContactValues = {
  name: string
  email: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim())
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}

  if (values.name.trim().length < 2) errors.name = 'required'
  if (!isValidEmail(values.email)) errors.email = 'email'
  if (values.message.trim().length < 10) errors.message = 'message'

  return errors
}
