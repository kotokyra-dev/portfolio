import type { BlogBlock } from '../content'
import { useLanguage } from '../i18n/context'
import { buildPath } from '../router'
import { NotFound } from './NotFound'
import { Reveal } from './Reveal'

function Block({ block }: { block: BlogBlock }) {
  if (block.type === 'heading') return <h2 className="post__heading">{block.text}</h2>

  if (block.type === 'list') {
    return (
      <ul className="post__list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  if (block.type === 'quote') return <blockquote className="post__quote">{block.text}</blockquote>

  return <p className="post__paragraph">{block.text}</p>
}

export function BlogPostPage({ slug }: { slug: string }) {
  const { content, language } = useLanguage()
  const { blog } = content
  const post = blog.posts.find((item) => item.slug === slug)

  if (!post) return <NotFound />

  return (
    <article className="section post">
      <div className="container post__inner">
        <a className="link post__back" href={buildPath(language, '/blog')}>
          ← {blog.backToBlog}
        </a>

        <Reveal as="header" className="post__head">
          <div className="post-card__meta">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span className="post-card__dot" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </div>
          <h1 className="post__title">{post.title}</h1>
          <p className="post__excerpt">{post.excerpt}</p>
          <ul className="project__tags">
            {post.tags.map((tag) => (
              <li className="tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="post__body">
          {post.blocks.map((block, index) => (
            <Block block={block} key={`${block.type}-${index}`} />
          ))}
        </div>

        <footer className="post__foot">
          <a className="btn btn--ghost" href={buildPath(language, '/blog')}>
            ← {blog.backToBlog}
          </a>
          <a className="link" href={buildPath(language, '/')}>
            {blog.backHome}
          </a>
        </footer>
      </div>
    </article>
  )
}
