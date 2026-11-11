import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLanguage } from '../i18n/context'
import { validateContact, type ContactErrors, type ContactValues } from '../lib/validate'
import { ArrowUpRightIcon, MailIcon } from './icons'

type Status = 'idle' | 'sending' | 'success' | 'error'

const emptyValues: ContactValues = { name: '', email: '', message: '' }

export function ContactForm() {
  const { content, language } = useLanguage()
  const { ui, profile } = content
  const [values, setValues] = useState<ContactValues>(emptyValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [company, setCompany] = useState('')

  const errorText: Record<string, string> = {
    required: ui.formRequired,
    email: ui.formEmailInvalid,
    message: ui.formMessageShort,
  }

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company, locale: language }),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setStatus('success')
      setValues(emptyValues)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form contact-form--done" role="status">
        <span className="contact-form__check" aria-hidden="true">
          ✓
        </span>
        <p className="contact-form__done-text">{ui.formSuccess}</p>
        <a className="btn btn--ghost btn--sm" href={`mailto:${profile.email}`}>
          <MailIcon />
          {profile.email}
        </a>
      </div>
    )
  }

  const field = (name: keyof ContactValues) =>
    errors[name] ? { 'aria-invalid': true, 'aria-describedby': `field-${name}-error` } : {}

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__row">
        <label className="contact-field">
          <span className="contact-field__label">{ui.formName}</span>
          <input
            className="contact-field__input"
            type="text"
            name="name"
            value={values.name}
            onChange={onChange}
            placeholder={ui.formNamePlaceholder}
            autoComplete="name"
            {...field('name')}
          />
          {errors.name && (
            <span className="contact-field__error" id="field-name-error">
              {errorText[errors.name]}
            </span>
          )}
        </label>

        <label className="contact-field">
          <span className="contact-field__label">{ui.formEmail}</span>
          <input
            className="contact-field__input"
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            placeholder={ui.formEmailPlaceholder}
            autoComplete="email"
            inputMode="email"
            {...field('email')}
          />
          {errors.email && (
            <span className="contact-field__error" id="field-email-error">
              {errorText[errors.email]}
            </span>
          )}
        </label>
      </div>

      <label className="contact-field">
        <span className="contact-field__label">{ui.formMessage}</span>
        <textarea
          className="contact-field__input contact-field__input--area"
          name="message"
          value={values.message}
          onChange={onChange}
          placeholder={ui.formMessagePlaceholder}
          rows={4}
          {...field('message')}
        />
        {errors.message && (
          <span className="contact-field__error" id="field-message-error">
            {errorText[errors.message]}
          </span>
        )}
      </label>

      {/* Ловушка для спам-ботов: люди это поле не видят. */}
      <input
        className="contact-form__honeypot"
        type="text"
        name="company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-form__foot">
        <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? ui.formSending : ui.formSubmit}
          <ArrowUpRightIcon />
        </button>
        <p className="contact-form__privacy">{ui.formPrivacy}</p>
      </div>

      {status === 'error' && (
        <p className="contact-form__error" role="alert">
          {ui.formError}{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      )}
    </form>
  )
}
