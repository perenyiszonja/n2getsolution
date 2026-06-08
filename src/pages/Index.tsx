import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { WhatToExpect } from '../components/WhatToExpect'
import { HowWeWork } from '../components/HowWeWork'
import { WhatThisMeans } from '../components/WhatThisMeans'
import { Services } from '../components/Services'
import { Careers } from '../components/Careers'
import { BlogSection } from '../components/BlogSection'
import { BlogPostView } from '../components/BlogPost'
import { ProblemNavigator } from '../components/ProblemNavigator'
import { DiagnosticQuiz } from '../components/DiagnosticQuiz'
import { About } from '../components/About'
import { NetworkBackground } from '../components/NetworkBackground'
import { Footer } from '../components/Footer'

export function Index() {
  const [blogPostId, setBlogPostId] = useState<string | null>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash.startsWith('blog/')) {
        setBlogPostId(hash.replace('blog/', ''))
        window.scrollTo({ top: 0 })
      } else {
        setBlogPostId(null)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  if (blogPostId) {
    return (
      <>
        <Navbar />
        <BlogPostView postId={blogPostId} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <NetworkBackground />
      <Navbar />
      <Hero />
      <ProblemNavigator />
      <WhatToExpect />
      <HowWeWork />
      <WhatThisMeans />
      <Services />
      <DiagnosticQuiz />
      <About />
      <Careers />
      <BlogSection />
      <Footer />
    </>
  )
}
