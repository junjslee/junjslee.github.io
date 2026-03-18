import type { NextPage } from 'next'
import Head from 'next/head'
import XPDesktop from '../components/xp/XPDesktop'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jun Lee</title>
        <meta
          name="description"
          content="AI research engineer, builder, and UIUC student exploring computer vision, product-minded software, and quantitative thinking."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2454bd" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jun Lee" />
        <meta
          property="og:description"
          content="AI research engineer, builder, and UIUC student exploring computer vision, product-minded software, and quantitative thinking."
        />
        <meta property="og:url" content="https://junjslee.github.io/" />
        <meta property="og:image" content="https://junjslee.github.io/images/hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jun Lee" />
        <meta
          name="twitter:description"
          content="AI research engineer, builder, and UIUC student exploring computer vision, product-minded software, and quantitative thinking."
        />
        <meta name="twitter:image" content="https://junjslee.github.io/images/hero.jpg" />
        <link rel="canonical" href="https://junjslee.github.io/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <XPDesktop />
    </>
  )
}

export default Home
