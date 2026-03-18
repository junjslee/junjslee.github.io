import type { NextPage } from 'next'
import Head from 'next/head'
import XPDesktop from '../components/xp/XPDesktop'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Jun Lee | Windows XP Edition</title>
        <meta
          name="description"
          content="Junseong Lee's personal website rebuilt as a desktop-first Windows XP-inspired portfolio."
        />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <XPDesktop />
    </>
  )
}

export default Home
