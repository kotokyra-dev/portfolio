import { useLanguage } from '../i18n/context'
import { buildPath } from '../router'
import { ArrowUpRightIcon } from './icons'
import { Reveal } from './Reveal'

export function BlogPage() {
  const { content, language } = useLanguage()
  const { blog, ui } = content
  const base = buildPath(language, '/blog')

  return (
    <section className="section blog-page">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{ui.blogNav}</span>
          <h1 className="section__title">{blog.title}</h1>
          <p className="section__lead">{blog.lead}</p>
        </Reveal>

        <div className="blog-list">
          {blog.posts.map((post, index) => (
            <Reveal as="article" className="post-card" delay={index * 80} key={post.slug}>
              <div className="post-card__meta">
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span className="post-card__dot" aria-hidden="true" />
                <span>{post.readingTime}</span>
              </div>

              <h2 className="post-card__title">
                <a href={`${base}/${post.slug}`}>{post.title}</a>
              </h2>
              <p className="post-card__excerpt">{post.excerpt}</p>

              <ul className="project__tags">
                {post.tags.map((tag) => (
                  <li className="tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>

              <a className="link" href={`${base}/${post.slug}`}>
                {blog.readMore}
                <ArrowUpRightIcon />
              </a>
            </Reveal>
          ))}
        </div>

        <a className="link blog-page__back" href={buildPath(language, '/')}>
          ← {blog.backHome}
        </a>
      </div>
    </section>
  )
}
