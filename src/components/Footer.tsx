import { useLanguage } from '../i18n/context'
import { ArrowUpIcon } from './icons'

const year = new Date().getFullYear()

export function Footer() {
  const { content } = useLanguage()
  const { profile, ui } = content

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {profile.name}
        </p>
        <p className="footer__note">{ui.footerMadeWith}</p>
        <a className="footer__top" href="#home">
          {ui.backToTop}
          <ArrowUpIcon />
        </a>
      </div>
    </footer>
  )
}
