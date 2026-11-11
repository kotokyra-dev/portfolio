import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M11.94 2C6.45 2 2 6.45 2 11.94c0 5.49 4.45 9.94 9.94 9.94 5.49 0 9.94-4.45 9.94-9.94C21.88 6.45 17.43 2 11.94 2Zm4.9 6.83-1.64 7.75c-.12.55-.45.68-.91.42l-2.51-1.85-1.21 1.17c-.13.13-.25.25-.5.25l.18-2.55 4.65-4.2c.2-.18-.04-.28-.31-.1l-5.75 3.62-2.48-.77c-.54-.17-.55-.54.11-.8l9.69-3.74c.45-.16.84.11.68.8Z" />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9Z" />
    </svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden="true" {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3.5 7 7.4 5.2a2 2 0 0 0 2.2 0L20.5 7" />
    </svg>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden="true" {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden="true" {...props}>
      <path d="M12 4v16m0 0 6-6m-6 6-6-6" />
    </svg>
  )
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden="true" {...props}>
      <path d="M12 20V4m0 0 6 6m-6-6-6 6" />
    </svg>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} aria-hidden="true" {...props}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden="true" {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden="true" {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden="true" {...props}>
      <path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function CodeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden="true" {...props}>
      <path d="m9 8-4 4 4 4m6-8 4 4-4 4" />
    </svg>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden="true" {...props}>
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8M18.4 5.6l-2.8 2.8m-7.2 7.2-2.8 2.8" />
    </svg>
  )
}

export function GaugeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden="true" {...props}>
      <path d="M4.6 18a9 9 0 1 1 14.8 0" />
      <path d="m12 14 4-4" />
      <circle cx="12" cy="15" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

