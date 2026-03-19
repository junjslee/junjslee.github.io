import type { NextPage } from 'next'
import Head from 'next/head'
import XPDesktop from '../components/xp/XPDesktop'
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_URL } from '../lib/site'

const Home: NextPage = () => {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL,
    image: SITE_IMAGE,
    jobTitle: 'AI Research Engineer',
    alumniOf: 'University of Illinois Urbana-Champaign',
    sameAs: [
      'https://github.com/junjslee',
      'https://www.linkedin.com/in/junseong-lee',
    ],
  }

  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2454bd" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={SITE_NAME} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_NAME} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_IMAGE} />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </Head>
      <XPDesktop />
    </>
  )
}

export default Home
