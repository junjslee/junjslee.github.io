import type { NextPage } from 'next'
import Head from 'next/head'
import XPDesktop from '../components/xp/XPDesktop'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Junseong Lee</title>
        <meta
          name="description"
          content="Personal site of Junseong Lee, with research, projects, and writing on medical AI, statistical learning, and software systems."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2454bd" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Junseong Lee" />
        <meta
          property="og:description"
          content="Personal site of Junseong Lee, with research, projects, and writing on medical AI, statistical learning, and software systems."
        />
        <meta property="og:url" content="https://junjslee.github.io/" />
        <meta property="og:image" content="https://junjslee.github.io/images/hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Junseong Lee" />
        <meta
          name="twitter:description"
          content="Personal site of Junseong Lee, with research, projects, and writing on medical AI, statistical learning, and software systems."
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
