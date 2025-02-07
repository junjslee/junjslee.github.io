// src/components/BlogPostCard.tsx
import React from 'react'

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{post.excerpt}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{post.date}</p>
      <a href="#blog" className="text-indigo-600 hover:underline">Read More</a>
    </div>
  )
}

export default BlogPostCard
