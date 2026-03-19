import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_URL } from '../../lib/site'

interface ContentPageLayoutProps {
  title: string
  description: string
  canonicalPath: string
  heading: string
  intro: string
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
  children: React.ReactNode
}

const ContentPageLayout: React.FC<ContentPageLayoutProps> = ({
  title,
  description,
  canonicalPath,
  heading,
  intro,
  jsonLd,
  children,
}) => {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const jsonLdEntries = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={SITE_IMAGE} />
        <link rel="canonical" href={canonicalUrl} />
        {jsonLdEntries.map((entry, index) => (
          <script
            key={`${canonicalPath}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
      </Head>

      <main className="seo-page">
        <div className="seo-page-shell">
          <header className="seo-page-header seo-card">
            <div className="seo-page-eyebrow">{SITE_NAME}</div>
            <h1>{heading}</h1>
            <p>{intro}</p>
          </header>

          <nav className="seo-site-nav seo-card" aria-label="Site sections">
            <Link href="/">Home</Link>
            <Link href="/research/">Research</Link>
            <Link href="/projects/">Projects</Link>
            <Link href="/writing/">Writing</Link>
          </nav>

          <section className="seo-card seo-page-body">{children}</section>

          <footer className="seo-card seo-page-footer">
            <p>{SITE_DESCRIPTION}</p>
          </footer>
        </div>
      </main>
    </>
  )
}

export default ContentPageLayout
