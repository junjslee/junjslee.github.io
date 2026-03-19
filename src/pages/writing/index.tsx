import type { NextPage } from 'next'
import Link from 'next/link'
import ContentPageLayout from '../../components/seo/ContentPageLayout'
import { blogPosts } from '../../components/BlogSection'
import { SITE_URL } from '../../lib/site'

const WritingIndexPage: NextPage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Writing by Junseong Lee',
    url: `${SITE_URL}/writing/`,
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      url: `${SITE_URL}/writing/${post.slug}/`,
      description: post.excerpt,
    })),
  }

  return (
    <ContentPageLayout
      title="Writing | Junseong Lee"
      description="Writing by Junseong Lee on growth, research, relationships, and the questions that sit behind the work."
      canonicalPath="/writing/"
      heading="Writing"
      intro="A plain, readable archive of longer reflections and essays."
      jsonLd={jsonLd}
    >
      <div className="seo-entry-list">
        {blogPosts.map((post) => (
          <article key={post.slug} className="seo-entry">
            <div className="seo-entry-header">
              <div>
                <h2>{post.title}</h2>
                <p className="seo-entry-meta">{post.date}</p>
              </div>
              <Link href={`/writing/${post.slug}/`}>Read Entry</Link>
            </div>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </ContentPageLayout>
  )
}

export default WritingIndexPage
