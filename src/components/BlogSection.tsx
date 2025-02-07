// src/components/BlogSection.tsx
import React from 'react'
import BlogPostCard from './BlogPostCard'

const posts = [
  {
    slug: "post-1",
    title: "The Future of AI in Finance",
    excerpt: "Exploring the impact of AI on financial models and predictions...",
    date: "2025-01-15",
  },
  {
    slug: "post-2",
    title: "A Deep Dive into Machine Learning",
    excerpt: "Understanding the fundamentals and advancements in machine learning...",
    date: "2025-01-10",
  },
]

const BlogSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="space-y-8">
        {posts.map((post, index) => (
          <BlogPostCard key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export default BlogSection
