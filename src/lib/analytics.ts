import { track } from '@vercel/analytics'

type EventProps = Record<string, string | number | boolean | null | undefined>

/**
 * Отправляет пользовательское событие в Vercel Web Analytics.
 * Аналитика не должна ломать интерфейс, поэтому ошибки глушим.
 */
export function trackEvent(name: string, props?: EventProps) {
  try {
    track(name, props)
  } catch {
    // например, если скрипт аналитики заблокирован браузером
  }
}
