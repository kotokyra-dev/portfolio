import { useLanguage } from '../i18n/context'
import { socialIcons } from './iconMaps'
import { ArrowUpRightIcon, MailIcon } from './icons'
import { Reveal } from './Reveal'

export function Contact() {
  const { content } = useLanguage()
  const { profile, socials, ui } = content

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal className="contact__panel">
          <span className="eyebrow">{ui.contactEyebrow}</span>
          <h2 className="contact__title">{ui.contactTitle}</h2>
          <p className="contact__lead">{ui.contactLead}</p>

          <div className="contact__actions">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              <MailIcon />
              {profile.email}
            </a>
            <a
              className="btn btn--ghost"
              href={profile.telegram}
              target="_blank"
              rel="noreferrer"
            >
              {ui.telegramCta}
              <ArrowUpRightIcon />
            </a>
          </div>

          <ul className="socials" aria-label={ui.socialsLabel}>
            {socials.map((social) => {
              const Icon = socialIcons[social.icon]
              return (
                <li key={social.label}>
                  <a
                    className="social-link"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon />
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
