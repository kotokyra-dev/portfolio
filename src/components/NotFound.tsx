import { useLanguage } from '../i18n/context'
import { buildPath } from '../router'

export function NotFound() {
  const { content, language } = useLanguage()
  const { ui } = content

  return (
    <section className="section notfound">
      <div className="container notfound__inner">
        <span className="notfound__code" aria-hidden="true">
          404
        </span>
        <h1 className="notfound__title">{ui.notFoundTitle}</h1>
        <p className="notfound__text">{ui.notFoundText}</p>
        <a className="btn btn--primary" href={buildPath(language, '/')}>
          {ui.notFoundCta}
        </a>
      </div>
    </section>
  )
}
