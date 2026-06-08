import { useLanguage } from '../i18n/LanguageContext'
import { blogPosts } from '../data/blogPosts'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import type { Language } from '../i18n/translations'

interface BlogPostProps {
  postId: string
}

export function BlogPostView({ postId }: BlogPostProps) {
  const { language, t } = useLanguage()
  const post = blogPosts.find((p) => p.id === postId)

  if (!post) return null

  const content = post.content[language as Language]

  return (
    <article className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => { window.location.hash = '' }}
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          {t.blog.backToAll}
        </button>

        <div className="flex items-center gap-3 text-sm text-text-muted mb-4">
          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime} min
          </span>
          <span>{post.date}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
          {post.title[language as Language]}
        </h1>

        <p className="mt-4 text-lg text-text-secondary">
          {post.excerpt[language as Language]}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-xs text-text-muted bg-surface-light px-2 py-1 rounded">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-12 prose-custom">
          {content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold text-text-primary mt-10 mb-4">{line.replace('## ', '')}</h2>
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-semibold text-text-primary mt-8 mb-3">{line.replace('### ', '')}</h3>
            }
            if (line.startsWith('- **')) {
              const match = line.match(/- \*\*(.+?)\*\*(.*)/)
              if (match) {
                return (
                  <p key={i} className="text-text-secondary my-2 pl-4 border-l-2 border-accent/30">
                    <strong className="text-text-primary">{match[1]}</strong>{match[2]}
                  </p>
                )
              }
            }
            if (line.startsWith('- ')) {
              return (
                <p key={i} className="text-text-secondary my-1 pl-4 flex items-start gap-2">
                  <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                  {renderBold(line.replace('- ', ''))}
                </p>
              )
            }
            if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={i} className="text-text-primary font-semibold mt-6 mb-2">{line.replace(/\*\*/g, '')}</p>
            }
            if (line.trim() === '') return <div key={i} className="h-4" />
            return <p key={i} className="text-text-secondary leading-relaxed my-2">{renderBold(line)}</p>
          })}
        </div>
      </div>
    </article>
  )
}

function renderBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-text-primary">{part}</strong>
      : <span key={i}>{part}</span>
  )
}
