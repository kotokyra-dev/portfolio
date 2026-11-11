import { describe, expect, it } from 'vitest'
import { isValidEmail, validateContact } from './validate'

describe('isValidEmail', () => {
  it('accepts a normal address', () => {
    expect(isValidEmail('kotokyura@gmail.com')).toBe(true)
  })

  it('trims surrounding spaces', () => {
    expect(isValidEmail('  hello@example.dev  ')).toBe(true)
  })

  it('rejects addresses without a domain or tld', () => {
    expect(isValidEmail('hello@')).toBe(false)
    expect(isValidEmail('hello@example')).toBe(false)
    expect(isValidEmail('hello.example.com')).toBe(false)
  })
})

describe('validateContact', () => {
  const valid = {
    name: 'Юрий',
    email: 'kotokyura@gmail.com',
    message: 'Нужен лендинг на React за две недели.',
  }

  it('returns no errors for valid input', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('requires a name of at least two characters', () => {
    expect(validateContact({ ...valid, name: ' ' })).toEqual({ name: 'required' })
  })

  it('flags an invalid email', () => {
    expect(validateContact({ ...valid, email: 'nope' })).toEqual({ email: 'email' })
  })

  it('requires a message of at least ten characters', () => {
    expect(validateContact({ ...valid, message: 'привет' })).toEqual({ message: 'message' })
  })

  it('collects every error at once', () => {
    expect(validateContact({ name: '', email: '', message: '' })).toEqual({
      name: 'required',
      email: 'email',
      message: 'message',
    })
  })
})
