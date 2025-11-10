import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import ProjectsSection from '../components/ProjectsSection'
import ResumeSection from '../components/ResumeSection'
// import BlogSection from '../components/BlogSection'
import ContactSection from '../components/ContactSection'

const Home: NextPage = () => {
  const faviconHref =
    process.env.NODE_ENV === 'production'
      ? 'favicon.ico' // junlee.io/
      : 'favicon.ico';

  return (
    <Layout>
      <Head>
        <title>Jun's Portfolio</title>
        <meta name="description" content="Jun's portfolio" />
        <link rel="icon" href={faviconHref} />
      </Head>
      <div>
        <section id="hero">
          <Hero />
        </section>
        <section id="about" className="py-12">
          <AboutSection />
        </section>
        <section id="projects" className="py-12">
          <ProjectsSection />
        </section>
        <section id="resume" className="py-12">
          <ResumeSection />
        </section>
        {/* <section id="blog" className="py-12">
          <BlogSection />
        </section> */}
        <section id="contact" className="py-12">
          <ContactSection />
        </section>
      </div>
    </Layout>
  )
}

export default Home
