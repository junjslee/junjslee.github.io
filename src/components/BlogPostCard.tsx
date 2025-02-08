// src/components/BlogPostCard.tsx
import React, { useState } from 'react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
}

interface BlogPostCardProps {
  post: BlogPost
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(prev => !prev)
  }

  // Helper: split the text into paragraphs by double newlines.
  const renderParagraphs = (text: string) => {
    return text.split(/\n\s*\n/).map((para, index) => (
      <p key={index} className="mb-4">
        {para}
      </p>
    ))
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{post.date}</p>
      <div className="text-gray-700 dark:text-gray-300 mb-4">
      {expanded ? renderParagraphs(post.content) : renderParagraphs(post.excerpt)}
      </div>
      <button
        onClick={toggleExpand}
        className="text-indigo-600 hover:underline focus:outline-none"
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  )
}

export default BlogPostCard
