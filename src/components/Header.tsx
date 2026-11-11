import { useEffect, useState } from 'react'
import { sectionIds } from '../content'
import { useScrollSpy } from '../hooks/useScrollSpy'
import type { Theme } from '../hooks/useTheme'
import { useLanguage } from '../i18n/context'
import { buildPath, useRoute } from '../router'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './icons'

type HeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const { language, content, setLanguage } = useLanguage()
  const { nav, profile, ui } = content
  const { route } = useRoute()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(sectionIds, 96, route.name)

  const homePath = buildPath(language, '/')
  const blogPath = buildPath(language, '/blog')
  const current =
    route.name === 'home'
      ? active
      : route.name === 'blog' || route.name === 'post'
        ? 'blog'
        : ''

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header__inner">
        <a className="brand" href={homePath} aria-label={profile.name}>
          <span className="brand__mark">{profile.initials}</span>
          <span className="brand__name">{profile.name}</span>
        </a>

        <nav
          id="site-nav"
          className={`nav ${open ? 'is-open' : ''}`}
          aria-label={ui.navLabel}
        >
          <ul className="nav__list">
            {nav.map((link) => {
              const href =
                link.id === 'blog'
                  ? blogPath
                  : link.id === 'home'
                    ? homePath
                    : `${homePath}#${link.id}`

              return (
                <li key={link.id}>
                  <a
                    className={`nav__link ${current === link.id ? 'is-active' : ''}`}
                    href={href}
                    aria-current={current === link.id ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="header__actions">
          <div className="lang-switch" role="group" aria-label={ui.languageLabel}>
            <button
              type="button"
              className={language === 'ru' ? 'is-active' : ''}
              onClick={() => setLanguage('ru')}
              aria-pressed={language === 'ru'}
            >
              RU
            </button>
            <button
              type="button"
              className={language === 'en' ? 'is-active' : ''}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? ui.themeToLight : ui.themeToDark}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a className="btn btn--primary btn--sm header__cta" href={`${homePath}#contact`}>
            {ui.contactCta}
          </a>

          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? ui.menuClose : ui.menuOpen}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
