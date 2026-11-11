import { useLanguage } from '../i18n/context'

const techs = [
  'React',
  'TypeScript',
  'Next.js',
  'Vite',
  'Tailwind CSS',
  'Node.js',
  'Figma',
  'Storybook',
  'Accessibility',
  'Performance',
]

function Track() {
  return (
    <ul className="marquee__list">
      {techs.map((tech) => (
        <li className="marquee__item" key={tech}>
          <span className="marquee__star" aria-hidden="true">
            ✦
          </span>
          {tech}
        </li>
      ))}
    </ul>
  )
}

export function TechMarquee() {
  const { content } = useLanguage()

  return (
    <div className="marquee" aria-label={content.ui.marqueeLabel}>
      <div className="marquee__track">
        <Track />
        <div aria-hidden="true" className="marquee__clone">
          <Track />
        </div>
      </div>
    </div>
  )
}
