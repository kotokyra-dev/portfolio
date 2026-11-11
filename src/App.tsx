import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { BlogPage } from './components/BlogPage'
import { BlogPostPage } from './components/BlogPostPage'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './components/Home'
import { NotFound } from './components/NotFound'
import { usePageMeta } from './hooks/usePageMeta'
import { useTheme } from './hooks/useTheme'
import { useInternalLinks, useRoute } from './router'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { language, route } = useRoute()

  useInternalLinks()
  usePageMeta(language, route)

  return (
    <div className="page">
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main>
        {route.name === 'home' && <Home />}
        {route.name === 'blog' && <BlogPage />}
        {route.name === 'post' && <BlogPostPage slug={route.slug} />}
        {route.name === 'notFound' && <NotFound />}
      </main>

      <Footer />
      <Analytics />
    </div>
  )
}

export default App
