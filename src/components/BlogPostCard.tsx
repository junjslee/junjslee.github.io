import React from 'react'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
}

interface BlogPostCardProps {
  post: BlogPost
  onOpen?: (post: BlogPost) => void
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onOpen }) => {
  return (
    <article className="xp-blog-post">
      <header className="xp-blog-post-header">
        <h2>{post.title}</h2>
        <time>{post.date}</time>
      </header>
      <div className="xp-blog-post-body">
        <p>{post.excerpt}</p>
      </div>
      <button type="button" onClick={() => onOpen?.(post)}>
        Open Entry
      </button>
    </article>
  )
}

export default BlogPostCard
