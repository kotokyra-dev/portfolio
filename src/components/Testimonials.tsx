import { useLanguage } from '../i18n/context'
import { Reveal } from './Reveal'

export function Testimonials() {
  const { content } = useLanguage()
  const { testimonials, ui } = content

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{ui.testimonialsEyebrow}</span>
          <h2 className="section__title">{ui.testimonialsTitle}</h2>
          <p className="section__lead">{ui.testimonialsLead}</p>
        </Reveal>

        <div className="testimonials__grid">
          {testimonials.map((item, index) => (
            <Reveal as="article" className="testimonial" delay={index * 90} key={item.name}>
              <span className="testimonial__mark" aria-hidden="true">
                “
              </span>
              <p className="testimonial__text">{item.quote}</p>

              <footer className="testimonial__author">
                <span className="testimonial__avatar" aria-hidden="true">
                  {item.initials}
                </span>
                <div>
                  <p className="testimonial__name">{item.name}</p>
                  <p className="testimonial__role">{item.role}</p>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
