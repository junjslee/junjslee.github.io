import type { NextPage } from 'next'
import Head from 'next/head'
import XPDesktop from '../components/xp/XPDesktop'
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, SITE_PORTRAIT, SITE_SAME_AS, SITE_URL } from '../lib/site'

const Home: NextPage = () => {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    givenName: 'Junseong',
    familyName: 'Lee',
    url: SITE_URL,
    image: SITE_PORTRAIT,
    jobTitle: 'AI Researcher',
    description: SITE_DESCRIPTION,
    email: 'mailto:junseong.lee652@gmail.com',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Illinois Urbana-Champaign',
      url: 'https://illinois.edu/',
    },
    affiliation: [
      {
        '@type': 'Organization',
        name: 'Laboratory of Medical Imaging and Computation, Massachusetts General Hospital',
        url: 'https://lmic.mgh.harvard.edu/',
      },
      { '@type': 'Organization', name: 'Harvard Medical School', url: 'https://hms.harvard.edu/' },
    ],
    knowsAbout: [
      'Medical AI',
      'Human-AI interaction',
      'Biomedical knowledge graphs',
      'Automation bias',
      'Vision-language models',
      'Statistical learning',
    ],
    sameAs: SITE_SAME_AS,
  }

  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#person` },
  }

  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${SITE_NAME} — AI Researcher`,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
    hasPart: [
      { '@type': 'WebPage', name: 'Research', url: `${SITE_URL}/research/` },
      { '@type': 'WebPage', name: 'Projects', url: `${SITE_URL}/projects/` },
    ],
  }

  return (
    <>
      <Head>
        <title>Junseong Lee — AI Researcher (Medical AI, Knowledge Graphs)</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2454bd" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content="Junseong Lee — AI Researcher" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="The Junseong Lee portfolio, presented as a Windows XP desktop." />
        <meta property="og:locale" content="en_US" />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Junseong Lee — AI Researcher" />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_IMAGE} />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />
      </Head>
      <XPDesktop />
    </>
  )
}

export default Home
