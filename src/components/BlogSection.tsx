import { useLanguage } from '../i18n/LanguageContext'
import { blogPosts } from '../data/blogPosts'
import { ArrowRight, Clock } from 'lucide-react'
import type { Language } from '../i18n/translations'

export function BlogSection() {
  const { language, t } = useLanguage()

  return (
    <section id="blog" className="py-24 px-6 bg-primary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            {t.blog.title}
          </h2>
          <p className="mt-4 text-text-secondary">{t.blog.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={`#blog/${post.id}`}
              onClick={(e) => {
                e.preventDefault()
                window.location.hash = `blog/${post.id}`
              }}
              className="group p-6 rounded-xl border border-black/5 bg-surface-light/30 hover:border-accent/30 transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime} min
                </span>
              </div>
              <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug">
                {post.title[language as Language]}
              </h3>
              <p className="mt-3 text-sm text-text-secondary line-clamp-3">
                {post.excerpt[language as Language]}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent font-medium">
                {t.blog.readMore}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
