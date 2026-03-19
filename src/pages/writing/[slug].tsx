import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import ContentPageLayout from '../../components/seo/ContentPageLayout'
import { blogPosts, type BlogPost } from '../../components/BlogSection'
import { SITE_NAME, SITE_URL } from '../../lib/site'

interface WritingPostPageProps {
  post: BlogPost
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<WritingPostPageProps> = async ({ params }) => {
  const post = blogPosts.find((entry) => entry.slug === params?.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}

const WritingPostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
    },
    mainEntityOfPage: `${SITE_URL}/writing/${post.slug}/`,
  }

  return (
    <ContentPageLayout
      title={`${post.title} | Junseong Lee`}
      description={post.excerpt}
      canonicalPath={`/writing/${post.slug}/`}
      heading={post.title}
      intro={post.date}
      jsonLd={jsonLd}
    >
      <article className="seo-article">
        {post.content
          .trim()
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={`${post.slug}-${index}`}>{paragraph}</p>
          ))}
      </article>
    </ContentPageLayout>
  )
}

export default WritingPostPage
